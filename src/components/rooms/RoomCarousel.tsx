'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RoomCard } from '@/components/rooms/RoomCard';
import { RoomSkeleton } from '@/components/rooms/RoomSkeleton';
import type { RoomToDisplay } from '@/types/rooms';

interface RoomCarouselProps {
  rooms: RoomToDisplay[];
  isLoading: boolean;
  skeletonCount?: number;
}

export function RoomCarousel({
  rooms,
  isLoading,
  skeletonCount = 3,
}: RoomCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // ── Compute which slide is active based on scroll position ─────────────────
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>('[data-carousel-item]');
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 32; // 32 = gap-8
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(idx);
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  // Initialise scroll state
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll, rooms]);

  const scrollByCard = (direction: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>('[data-carousel-item]');
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 32;
    el.scrollBy({ left: direction === 'next' ? cardWidth : -cardWidth, behavior: 'smooth' });
  };

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>('[data-carousel-item]');
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 32;
    el.scrollTo({ left: cardWidth * idx, behavior: 'smooth' });
  };

  const totalDots = isLoading ? skeletonCount : rooms.length;

  return (
    <div className="relative">
      {/* ── Scroll container ─────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scroll-smooth pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {/* Hide scrollbar cross-browser */}
        <style>{`
          [data-carousel-scroll]::-webkit-scrollbar { display: none; }
        `}</style>

        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <div
                key={i}
                data-carousel-item
                className="shrink-0 w-[85vw] sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <RoomSkeleton index={i} />
              </div>
            ))
          : rooms.map((room, i) => (
              <div
                key={room.id}
                data-carousel-item
                className="shrink-0 w-[85vw] sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <RoomCard room={room} index={i} animate={false} />
              </div>
            ))}
      </div>

      {/* ── Arrow buttons ─────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => scrollByCard('prev')}
        disabled={!canScrollPrev}
        aria-label="Previous room"
        className={`
          absolute -left-4 top-1/2 -translate-y-1/2 z-10
          hidden sm:flex items-center justify-center
          h-10 w-10 rounded-full bg-white border border-accent shadow-md
          text-primary transition-all
          hover:bg-primary hover:text-secondary hover:border-primary
          disabled:opacity-30 disabled:pointer-events-none
        `}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        onClick={() => scrollByCard('next')}
        disabled={!canScrollNext}
        aria-label="Next room"
        className={`
          absolute -right-4 top-1/2 -translate-y-1/2 z-10
          hidden sm:flex items-center justify-center
          h-10 w-10 rounded-full bg-white border border-accent shadow-md
          text-primary transition-all
          hover:bg-primary hover:text-secondary hover:border-primary
          disabled:opacity-30 disabled:pointer-events-none
        `}
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Dot indicators ───────────────────────────────────────────────── */}
      <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Rooms carousel">
        {Array.from({ length: totalDots }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to room ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${i === activeIndex
                ? 'w-6 bg-primary'
                : 'w-2 bg-primary/25 hover:bg-primary/50'}
            `}
          />
        ))}
      </div>
    </div>
  );
}
