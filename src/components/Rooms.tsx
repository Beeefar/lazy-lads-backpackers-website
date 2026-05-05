'use client';

import Image from 'next/image';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';
import { Wifi, Snowflake, Lock } from 'lucide-react';
import { BookingModal } from '@/components/BookingModal';
import { useEffect, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type LiveRoom = {
  room_id: string;
  room_name: string;
  room_description: string;
  date: { date: string; price: number | false; available_beds: number }[];
  image_fullpath: string[];
};

type RoomToDisplay = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  imageIsExternal: boolean;
  /** The first available price found across all fetched dates — in whole units (e.g. 12 = $12) */
  price: number | null;
  /** The date that price applies to, e.g. "2025-04-05" */
  priceDate: string | null;
  currency: string;
};

// ─── Static data ──────────────────────────────────────────────────────────────

const staticRooms = siteContent.rooms.list;

const iconMap = {
  'Wi-Fi': Wifi,
  AC: Snowflake,
  Locker: Lock,
  'Private Bath': Lock,
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

/**
 * Scan all dates on a room and return the first one with a real price > 0.
 * This is the key fix — instead of assuming date[0] has a price,
 * we walk through all dates until we find an available one.
 */
function getFirstAvailablePrice(dates: LiveRoom['date']): { price: number; date: string } | null {
  for (const d of dates) {
    if (typeof d.price === 'number' && d.price > 0 && d.available_beds > 0) {
      return { price: d.price, date: d.date };
    }
  }
  return null;
}

function getLocalFallbackImage(roomName: string): string | null {
  const firstWord = roomName.split(' ')[0].toLowerCase();
  const match = staticRooms.find(
    (s) =>
      s.name.toLowerCase().includes(firstWord) ||
      firstWord.includes(s.name.toLowerCase().split(' ')[0])
  );
  return match?.image ?? staticRooms[0]?.image ?? null;
}

// ─── Skeleton card ────────────────────────────────────────────────────────────

function RoomSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-accent bg-white shadow-sm"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="h-52 animate-pulse bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />
        <div className="mt-2 flex gap-2">
          {[12, 10, 14].map((w) => (
            <div key={w} className={`h-6 w-${w} animate-pulse rounded bg-gray-100`} />
          ))}
        </div>
        <div className="mt-3 h-6 w-1/3 animate-pulse rounded bg-gray-100" />
        <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-100" />
      </div>
    </motion.div>
  );
}

// ─── Room card ────────────────────────────────────────────────────────────────

function RoomCard({ room, index }: { room: RoomToDisplay; index: number }) {
  const [imgSrc, setImgSrc] = useState<string | null>(room.image);
  const [imgExternal, setImgExternal] = useState(room.imageIsExternal);

  function handleImageError() {
    const fallback = getLocalFallbackImage(room.name);
    if (fallback && fallback !== imgSrc) {
      setImgSrc(fallback);
      setImgExternal(fallback.startsWith('http'));
    } else {
      setImgSrc(null);
    }
  }

  // Match feature badges from static data
  const firstWord = room.name.split(' ')[0].toLowerCase();
  const matchedStatic = staticRooms.find(
    (s) =>
      s.name.toLowerCase().includes(firstWord) ||
      firstWord.includes(s.name.toLowerCase().split(' ')[0])
  );
  const features = matchedStatic?.features ?? (['Wi-Fi'] as const);

  return (
    <motion.article
      className="overflow-hidden rounded-xl border border-accent bg-white shadow-sm transition-shadow hover:shadow-md"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Image */}
      <div className="relative h-52 bg-gray-100">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={room.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={imgExternal}
            onError={handleImageError}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-accent">
            <p className="text-sm text-gray-400">No image available</p>
          </div>
        )}

        {/* Available badge */}
        {room.price !== null && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-green-700 shadow backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Available
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-heading text-xl font-bold text-primary">{room.name}</h3>

        {room.description ? (
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{room.description}</p>
        ) : (
          // HostelMate rooms often have empty descriptions — use a smart fallback
          <p className="mt-2 text-sm text-gray-500 italic">
            {matchedStatic?.description ?? 'Contact us for more details about this room.'}
          </p>
        )}

        {/* Feature badges */}
        <div className="mt-3 flex flex-wrap gap-2">
          {features.map((f) => {
            const Icon = iconMap[f as keyof typeof iconMap] ?? Wifi;
            return (
              <span
                key={f}
                className="inline-flex items-center gap-1 rounded bg-accent px-2 py-1 text-xs text-gray-700"
              >
                <Icon size={14} /> {f}
              </span>
            );
          })}
        </div>

        {/* Price */}
        <div className="mt-4">
          {room.price !== null ? (
            <div>
              <p className="font-heading text-xl font-bold text-primary">
                {formatPrice(room.price, room.currency)}
                <span className="ml-1 text-sm font-normal text-gray-500">/ night</span>
              </p>
              {room.priceDate && (
                <p className="mt-0.5 text-xs text-green-600 font-medium">
                  Next available: {formatDateShort(room.priceDate)}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm font-medium text-amber-600">
              Fully booked · check other dates
            </p>
          )}
        </div>

        <div className="mt-4">
          <BookingModal
            label="Book Now"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-secondary hover:bg-primary/90 transition-colors"
          />
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function Rooms() {
  const [rooms, setRooms] = useState<RoomToDisplay[]>([]);
  const [status, setStatus] = useState<'loading' | 'live'>('loading');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/hostelmate/availability');
        if (!res.ok) throw new Error('API error');

        const data = await res.json();
        const currency: string = data.payment_gateway?.currency || 'USD';
        const liveRooms: LiveRoom[] = data.days ?? [];
        if (liveRooms.length === 0) throw new Error('No rooms');

        const mapped: RoomToDisplay[] = liveRooms.map((r) => {
          // THE KEY FIX: scan all 14 dates, not just date[0]
          const firstAvailable = getFirstAvailablePrice(r.date);

          const hostelMateImage = r.image_fullpath?.[0] ?? null;
          const localFallback = getLocalFallbackImage(r.room_name);
          const image = hostelMateImage ?? localFallback;

          return {
            id: r.room_id,
            name: r.room_name,
            description: r.room_description,
            image,
            imageIsExternal: (image ?? '').startsWith('http'),
            price: firstAvailable?.price ?? null,
            priceDate: firstAvailable?.date ?? null,
            currency,
          };
        });

        setRooms(mapped);
        setStatus('live');
      } catch {
        console.error('[Rooms] Could not load live availability');
        // Keep skeletons — don't fall back to stale data
      }
    }

    load();
  }, []);

  return (
    <section id="rooms" className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {siteContent.rooms.sectionTitle}
          </h2>
          <p className="mt-2 text-gray-600">{siteContent.rooms.sectionSubtitle}</p>

          <div className="mt-2 flex items-center justify-center gap-1.5 text-xs h-4">
            {status === 'loading' && (
              <span className="text-gray-400 animate-pulse">Fetching live availability…</span>
            )}
            {status === 'live' && (
              <>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium text-green-600">Live availability · next 14 days</span>
              </>
            )}
          </div>
        </motion.div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {status === 'loading'
            ? Array.from({ length: 3 }).map((_, i) => <RoomSkeleton key={i} index={i} />)
            : rooms.map((room, i) => <RoomCard key={room.id} room={room} index={i} />)}
        </div>
      </div>
    </section>
  );
}
