'use client';

import { useEffect, useState } from 'react';
import { siteContent } from '@/config/site-content';
import type { LiveRoom, RoomToDisplay } from '@/types/rooms';

const staticRooms = siteContent.rooms.list;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Generates all ISO date strings from checkIn up to and including checkOut. */
export function getDatesInRange(checkIn: string, checkOut: string): string[] {
  const dates: string[] = [];
  const current = new Date(checkIn);
  const end = new Date(checkOut);
  while (current <= end) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

/**
 * Walks all dates on a live room to find the first night with a real price.
 * Used on the homepage where no specific date range is requested.
 */
function getFirstAvailablePrice(
  dates: LiveRoom['date']
): { price: number; date: string } | null {
  for (const d of dates) {
    if (typeof d.price === 'number' && d.price > 0 && d.available_beds > 0) {
      return { price: d.price, date: d.date };
    }
  }
  return null;
}

/**
 * Returns true only when the room has available beds on EVERY night of the
 * requested stay. `dates` should include checkIn..checkOut inclusive;
 * we exclude the checkOut date because guests don't sleep that night.
 */
function isAvailableForRange(room: LiveRoom, dates: string[]): boolean {
  const nights = dates.slice(0, -1); // remove checkOut
  return nights.every((dateStr) => {
    const day = room.date.find((d) => d.date === dateStr);
    return (
      day != null &&
      typeof day.price === 'number' &&
      day.price > 0 &&
      day.available_beds > 0
    );
  });
}

/** Returns the price on the check-in night, or null if unavailable. */
function getPriceOnCheckIn(
  room: LiveRoom,
  checkIn: string
): { price: number; date: string } | null {
  const day = room.date.find((d) => d.date === checkIn);
  if (!day || typeof day.price !== 'number' || day.price <= 0) return null;
  return { price: day.price, date: day.date };
}

/**
 * Falls back to a local static image by matching the first word of the
 * live room name against static room names.
 */
function getLocalFallbackImage(roomName: string): string | null {
  const firstWord = roomName.split(' ')[0].toLowerCase();
  const match = staticRooms.find(
    (s) =>
      s.name.toLowerCase().includes(firstWord) ||
      firstWord.includes(s.name.toLowerCase().split(' ')[0])
  );
  return match?.image ?? staticRooms[0]?.image ?? null;
}

/** Maps a raw LiveRoom to the display shape used in UI components. */
function mapRoom(
  r: LiveRoom,
  currency: string,
  checkIn?: string,
  checkOut?: string,
  rangeDates?: string[]
): RoomToDisplay {
  const hostelMateImage = r.image_fullpath?.[0] ?? null;
  const localFallback = getLocalFallbackImage(r.room_name);
  const image = hostelMateImage ?? localFallback;

  let price: number | null = null;
  let priceDate: string | null = null;
  let availableForRange = false;

  if (checkIn && checkOut && rangeDates) {
    availableForRange = isAvailableForRange(r, rangeDates);
    if (availableForRange) {
      const p = getPriceOnCheckIn(r, checkIn);
      price = p?.price ?? null;
      priceDate = p?.date ?? null;
    }
  } else {
    const first = getFirstAvailablePrice(r.date);
    price = first?.price ?? null;
    priceDate = first?.date ?? null;
    availableForRange = price !== null;
  }

  return {
    id: r.room_id,
    name: r.room_name,
    description: r.room_description,
    image,
    imageIsExternal: (image ?? '').startsWith('http'),
    price,
    priceDate,
    currency,
    availableForRange,
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export type RoomAvailabilityStatus = 'loading' | 'live' | 'error';

interface UseRoomAvailabilityOptions {
  checkIn?: string;
  checkOut?: string;
  /** Max rooms to return (useful for homepage carousel). Undefined = all. */
  limit?: number;
}

export function useRoomAvailability({
  checkIn,
  checkOut,
  limit,
}: UseRoomAvailabilityOptions = {}) {
  const [rooms, setRooms] = useState<RoomToDisplay[]>([]);
  const [status, setStatus] = useState<RoomAvailabilityStatus>('loading');
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    setStatus('loading');

    async function load() {
      try {
        let data: Record<string, unknown>;

        if (checkIn && checkOut) {
          // Specific date range → POST
          const rangeDates = getDatesInRange(checkIn, checkOut);
          const res = await fetch('/api/hostelmate/availability', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dates: rangeDates }),
          });
          if (!res.ok) throw new Error('API error');
          data = await res.json();
        } else {
          // Default 14-day window → GET
          const res = await fetch('/api/hostelmate/availability');
          if (!res.ok) throw new Error('API error');
          data = await res.json();
        }

        const curr = (data.payment_gateway as { currency?: string })?.currency ?? 'USD';
        setCurrency(curr);

        const liveRooms = (data.days as LiveRoom[]) ?? [];
        if (liveRooms.length === 0) throw new Error('No rooms returned');

        const rangeDates =
          checkIn && checkOut ? getDatesInRange(checkIn, checkOut) : undefined;

        let mapped: RoomToDisplay[] = liveRooms.map((r) =>
          mapRoom(r, curr, checkIn, checkOut, rangeDates)
        );

        // Sort: available rooms first
        mapped.sort((a, b) => {
          if (a.availableForRange && !b.availableForRange) return -1;
          if (!a.availableForRange && b.availableForRange) return 1;
          return 0;
        });

        if (limit !== undefined) {
          mapped = mapped.slice(0, limit);
        }

        setRooms(mapped);
        setStatus('live');
      } catch (err) {
        console.error('[useRoomAvailability]', err);
        setStatus('error');
      }
    }

    load();
  }, [checkIn, checkOut, limit]);

  return { rooms, status, currency };
}
