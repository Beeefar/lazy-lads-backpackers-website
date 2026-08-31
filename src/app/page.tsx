import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { FeaturedFacilities } from '@/components/FeaturedFacilities';
import { Rooms } from '@/components/Rooms';
import { Adventures } from '@/components/Adventures';
import { Gallery } from '@/components/Gallery';
import { PlacesOfInterest } from '@/components/PlacesOfInterest';
import { TeamSection } from '@/components/TeamSection';
import { FaqSection } from '@/components/FaqSection';
import { BlogPreview } from '../components/BlogPreview';
import { MapSection } from '@/components/MapSection';
import { JsonLd } from '@/components/JsonLd';
import { siteContent } from '@/config/site-content';

const { seo, siteName, hotel, faqs, map, footer } = siteContent;
const siteUrl = seo.siteUrl;

export const metadata: Metadata = {
  title: 'Lazy Lads Backpackers Hostel | Best Hostel in Pokhara',
  description: seo.description,
  alternates: { canonical: siteUrl },
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: 'website',
    url: siteUrl,
    siteName,
    locale: 'en_US',
    images: [
      {
        url: seo.defaultImage,
        width: 1200,
        height: 630,
        alt: `${siteName} — Best Hostel in Pokhara`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.defaultImage],
  },
};

const hotelJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  '@id': `${siteUrl}/#hotel`,
  name: hotel.legalName,
  alternateName: hotel.alternateName,
  url: siteUrl,
  image: `${siteUrl}${seo.defaultImage}`,
  description: seo.description,
  telephone: footer.phone,
  email: footer.email,
  priceRange: hotel.priceRange,
  currenciesAccepted: hotel.currenciesAccepted,
  checkinTime: hotel.checkinTime,
  checkoutTime: hotel.checkoutTime,
  address: {
    '@type': 'PostalAddress',
    streetAddress: map.address,
    addressLocality: 'Pokhara',
    addressRegion: 'Gandaki',
    postalCode: '33700',
    addressCountry: 'NP',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: hotel.latitude,
    longitude: hotel.longitude,
  },
  hasMap: map.googleMapsLink,
  sameAs: hotel.sameAs,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: hotel.ratingValue,
    reviewCount: hotel.reviewCount,
    bestRating: 5,
  },
  amenityFeature: siteContent.featuredFacilities.items.map((item) => ({
    '@type': 'LocationFeatureSpecification',
    name: item.label,
    value: true,
  })),
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={hotelJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Hero />
      <FeaturedFacilities />
      <Rooms />
      <Adventures />
      <Gallery />
      <PlacesOfInterest />
      <TeamSection />
      <FaqSection />
      <BlogPreview />
      <MapSection />
    </>
  );
}
