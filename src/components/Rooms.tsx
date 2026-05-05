'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { siteContent } from '@/config/site-content';
import { useRoomAvailability } from '@/hooks/useRoomAvailability';
import { RoomCarousel } from '@/components/rooms/RoomCarousel';

export function Rooms() {
  // Limit to 8 rooms on the homepage — available-first sorting is handled in the hook
  const { rooms, status } = useRoomAvailability({ limit: 10 });

  return (
    <section id="rooms" className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              {siteContent.rooms.sectionTitle}
            </h2>
            <p className="mt-2 text-gray-600">{siteContent.rooms.sectionSubtitle}</p>

            <div className="mt-2 flex items-center gap-1.5 text-xs h-4">
              {status === 'loading' && (
                <span className="text-gray-400 animate-pulse">Fetching live availability…</span>
              )}
              {status === 'live' && (
                <>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-medium text-green-600">Live availability · next 14 days</span>
                </>
              )}
              {status === 'error' && (
                <span className="text-amber-600">Could not load live data</span>
              )}
            </div>
          </div>

          {/* View all rooms CTA */}
          <Link
            href="/rooms"
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-secondary shrink-0"
          >
            View all rooms
            <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* ── Carousel ────────────────────────────────────────────────────── */}
        <div className="mt-10">
          <RoomCarousel
            rooms={rooms}
            isLoading={status === 'loading'}
            skeletonCount={3}
          />
        </div>
      </div>
    </section>
  );
}
