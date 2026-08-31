import { Suspense } from 'react';
import type { Metadata } from 'next';
import { RoomsPageContent } from '@/components/rooms/RoomsPageContent';
import { RoomSkeleton } from '@/components/rooms/RoomSkeleton';
import { JsonLd } from '@/components/JsonLd';
import { siteContent } from '@/config/site-content';

const { seo, siteName, rooms } = siteContent;
const siteUrl = seo.siteUrl;

export const metadata: Metadata = {
  title: 'Rooms & Dorms in Pokhara — Lazy Lads Backpackers Hostel',
  description:
    'Browse rooms and dorms at Lazy Lads Backpackers Hostel — mixed dorms, female-only dorms, and private rooms in Lakeside Pokhara. Filter by dates and budget and book direct.',
  alternates: { canonical: `${siteUrl}/rooms` },
  keywords:
    'lazy lads backpackers hostel rooms, hostel rooms pokhara, dorm beds pokhara, private room pokhara, mixed dorm hostel, female dorm hostel, budget room lakeside pokhara',
  openGraph: {
    title: `Rooms & Dorms | ${siteName}`,
    description:
      'Mixed dorms, female-only dorms, and private rooms in Lakeside Pokhara. Filter by dates and budget.',
    type: 'website',
    url: `${siteUrl}/rooms`,
    siteName,
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}${seo.defaultImage}`,
        width: 1200,
        height: 630,
        alt: `Rooms at ${siteName} Pokhara`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Rooms & Dorms | ${siteName}`,
    description: 'Mixed dorms, female-only dorms, and private rooms in Lakeside Pokhara.',
    images: [`${siteUrl}${seo.defaultImage}`],
  },
};

const roomsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Rooms at ${siteName}`,
  url: `${siteUrl}/rooms`,
  itemListElement: rooms.list.map((room, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'HotelRoom',
      name: room.name,
      description: room.description,
      url: `${siteUrl}/rooms#${room.id}`,
      image: `${siteUrl}${room.image}`,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: room.priceFrom,
        availability: 'https://schema.org/InStock',
      },
    },
  })),
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
    <>
      <JsonLd data={roomsJsonLd} />
      <Suspense fallback={<RoomsPageSkeleton />}>
        <RoomsPageContent />
      </Suspense>
    </>
  );
}
