import { Suspense } from 'react';
import type { Metadata } from 'next';
import { RoomsPageContent } from '@/components/rooms/RoomsPageContent';
import { RoomSkeleton } from '@/components/rooms/RoomSkeleton';

export const metadata: Metadata = {
  title: 'Rooms',
  description:
    'Browse all rooms at Lazy Lads Backpackers — mixed dorms, female-only dorms, and private rooms in Lakeside Pokhara. Filter by dates and budget.',
};

function RoomsPageSkeleton() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Header skeleton */}
      <div className="bg-primary py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="h-8 w-32 animate-pulse rounded bg-white/20 mb-3" />
          <div className="h-10 w-48 animate-pulse rounded bg-white/20" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex gap-8">
          <div className="hidden lg:block w-72 shrink-0">
            <div className="h-64 animate-pulse rounded-xl bg-gray-100" />
          </div>
          <div className="flex-1 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <RoomSkeleton key={i} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoomsPage() {
  return (
    // useSearchParams() inside RoomsPageContent requires Suspense
    <Suspense fallback={<RoomsPageSkeleton />}>
      <RoomsPageContent />
    </Suspense>
  );
}
