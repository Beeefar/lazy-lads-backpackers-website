'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Wifi, Snowflake, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookingModal } from '@/components/BookingModal';
import { siteContent } from '@/config/site-content';
import type { RoomToDisplay } from '@/types/rooms';

const staticRooms = siteContent.rooms.list;

const iconMap = {
  'Wi-Fi': Wifi,
  AC: Snowflake,
  Locker: Lock,
  'Private Bath': Lock,
} as const;

export function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
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

interface RoomCardProps {
  room: RoomToDisplay;
  index: number;
  /** When true, wraps the card in a motion.article entrance animation */
  animate?: boolean;
}

export function RoomCard({ room, index, animate = true }: RoomCardProps) {
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

  const firstWord = room.name.split(' ')[0].toLowerCase();
  const matchedStatic = staticRooms.find(
    (s) =>
      s.name.toLowerCase().includes(firstWord) ||
      firstWord.includes(s.name.toLowerCase().split(' ')[0])
  );
  const features = matchedStatic?.features ?? (['Wi-Fi'] as const);

  const cardContent = (
    <article className="h-full overflow-hidden rounded-xl border border-accent bg-white shadow-sm transition-shadow hover:shadow-md flex flex-col">
      {/* Image */}
      <div className="relative h-52 shrink-0 bg-gray-100">
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

        {room.availableForRange && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-green-700 shadow backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Available
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading text-xl font-bold text-primary">{room.name}</h3>

        {room.description ? (
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{room.description}</p>
        ) : (
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

        {/* Price — pushed to the bottom */}
        <div className="mt-auto pt-4">
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

          <div className="mt-4">
            <BookingModal
              label="Book Now"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-secondary hover:bg-primary/90 transition-colors"
            />
          </div>
        </div>
      </div>
    </article>
  );

  if (!animate) return cardContent;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
    >
      {cardContent}
    </motion.div>
  );
}
