'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BedDouble } from 'lucide-react';
import { RoomFilters, type RoomFilterValues } from '@/components/rooms/RoomFilters';
import { RoomCard } from '@/components/rooms/RoomCard';
import { RoomSkeleton } from '@/components/rooms/RoomSkeleton';
import { useRoomAvailability } from '@/hooks/useRoomAvailability';

// ─── URL ↔ filter state sync ─────────────────────────────────────────────────

function useFilterState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<RoomFilterValues>(() => ({
    checkIn: searchParams.get('checkIn') ?? '',
    checkOut: searchParams.get('checkOut') ?? '',
    minPrice: Number(searchParams.get('minPrice') ?? 0),
    maxPrice: Number(searchParams.get('maxPrice') ?? 999_999),
  }));

  const updateFilters = useCallback(
    (next: Partial<RoomFilterValues>) => {
      setFilters((prev) => {
        const updated = { ...prev, ...next };

        // Sync to URL
        const params = new URLSearchParams();
        if (updated.checkIn) params.set('checkIn', updated.checkIn);
        if (updated.checkOut) params.set('checkOut', updated.checkOut);
        if (updated.minPrice > 0) params.set('minPrice', String(updated.minPrice));
        if (updated.maxPrice < 999_999) params.set('maxPrice', String(updated.maxPrice));

        const qs = params.toString();
        router.replace(qs ? `/rooms?${qs}` : '/rooms', { scroll: false });

        return updated;
      });
    },
    [router]
  );

  const clearFilters = useCallback(() => {
    setFilters({ checkIn: '', checkOut: '', minPrice: 0, maxPrice: 999_999 });
    router.replace('/rooms', { scroll: false });
  }, [router]);

  return { filters, updateFilters, clearFilters };
}

// ─── Main component ───────────────────────────────────────────────────────────

export function RoomsPageContent() {
  const { filters, updateFilters, clearFilters } = useFilterState();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasDateFilter = filters.checkIn !== '' && filters.checkOut !== '';

  const { rooms, status, currency } = useRoomAvailability({
    checkIn: hasDateFilter ? filters.checkIn : undefined,
    checkOut: hasDateFilter ? filters.checkOut : undefined,
  });

  // Compute actual price range from loaded rooms
  const { priceFloor, priceCeiling } = useMemo(() => {
    const prices = rooms
      .map((r) => r.price)
      .filter((p): p is number => p !== null);
    if (prices.length === 0) return { priceFloor: 0, priceCeiling: 100 };
    return {
      priceFloor: Math.floor(Math.min(...prices)),
      priceCeiling: Math.ceil(Math.max(...prices)),
    };
  }, [rooms]);

  // Initialise price range to full span once rooms load
  useEffect(() => {
    if (status === 'live' && filters.minPrice === 0 && filters.maxPrice === 999_999) {
      updateFilters({ minPrice: priceFloor, maxPrice: priceCeiling });
    }
  }, [status, priceFloor, priceCeiling]); // eslint-disable-line react-hooks/exhaustive-deps

  // Client-side price filtering (date filtering is handled server-side via hook)
  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      if (r.price === null) return true; // always show unavailable so user knows they exist
      return r.price >= filters.minPrice && r.price <= filters.maxPrice;
    });
  }, [rooms, filters.minPrice, filters.maxPrice]);

  const availableCount = filteredRooms.filter((r) => r.availableForRange).length;

  return (
    <div className="min-h-screen bg-secondary">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="bg-primary py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <BedDouble size={20} className="text-secondary/70" />
              <span className="text-secondary/70 text-sm font-medium uppercase tracking-widest">
                Browse & Book
              </span>
            </div>
            <h1 className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
              All Rooms
            </h1>
            <p className="mt-2 text-secondary/70">
              Filter by dates and budget to find your perfect stay.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        {/* Mobile: filter toggle button */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <div className="text-sm text-gray-500">
            {status === 'live' && (
              <span>
                <span className="font-semibold text-primary">{availableCount}</span> room{availableCount !== 1 ? 's' : ''} available
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg border border-accent bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-colors hover:border-primary"
          >
            Filters
            {filtersOpen ? ' ↑' : ' ↓'}
          </button>
        </div>

        <div className="flex gap-8 items-start">
          {/* ── Sidebar filters (desktop) / collapsed panel (mobile) ─────── */}
          <aside
            className={`
              w-full lg:w-72 shrink-0
              ${filtersOpen ? 'block' : 'hidden'} lg:block
              mb-6 lg:mb-0
            `}
          >
            <div className="lg:sticky lg:top-24">
              <RoomFilters
                values={filters}
                priceFloor={priceFloor}
                priceCeiling={priceCeiling}
                currency={currency}
                onChange={updateFilters}
                onClear={clearFilters}
              />

              {/* Live availability indicator */}
              <div className="mt-3 flex items-center gap-1.5 px-1 text-xs">
                {status === 'loading' && (
                  <span className="text-gray-400 animate-pulse">Fetching live prices…</span>
                )}
                {status === 'live' && (
                  <>
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-medium text-green-600">Live availability</span>
                  </>
                )}
                {status === 'error' && (
                  <span className="text-amber-600">Could not load live data</span>
                )}
              </div>
            </div>
          </aside>

          {/* ── Room grid ───────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Desktop result count */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {status === 'live' && (
                  <>
                    <span className="font-semibold text-primary">{availableCount}</span>
                    {' of '}
                    <span className="font-semibold text-primary">{filteredRooms.length}</span>
                    {' rooms available'}
                    {hasDateFilter && ' for selected dates'}
                  </>
                )}
              </p>
              {hasDateFilter && (
                <p className="text-xs text-green-600 font-medium">
                  Showing availability for your stay
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {status === 'loading'
                ? Array.from({ length: 6 }).map((_, i) => (
                    <RoomSkeleton key={i} index={i} />
                  ))
                : filteredRooms.map((room, i) => (
                    <RoomCard key={room.id} room={room} index={i} />
                  ))}
            </div>

            {status === 'live' && filteredRooms.length === 0 && (
              <motion.div
                className="flex flex-col items-center justify-center py-24 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <BedDouble size={40} className="text-gray-300 mb-4" />
                <p className="font-heading text-lg font-semibold text-primary">No rooms match your filters</p>
                <p className="mt-1 text-sm text-gray-500">Try adjusting dates or widening your price range.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-secondary hover:bg-primary/90 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
