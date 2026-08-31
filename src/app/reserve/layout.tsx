import type { Metadata } from 'next';
import { siteContent } from '@/config/site-content';

const { seo, siteName } = siteContent;
const siteUrl = seo.siteUrl;

export const metadata: Metadata = {
  title: 'Book Your Stay',
  description:
    'Check live availability and book your dorm or private room at Lazy Lads Backpackers Hostel in Lakeside Pokhara, Nepal. Instant confirmation, pay on arrival.',
  alternates: { canonical: `${siteUrl}/reserve` },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Book Your Stay | ${siteName}`,
    description: 'Live availability and instant booking for dorms and private rooms in Lakeside Pokhara.',
    type: 'website',
    url: `${siteUrl}/reserve`,
    siteName,
    locale: 'en_US',
    images: [{ url: `${siteUrl}${seo.defaultImage}`, width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Book Your Stay | ${siteName}`,
    description: 'Live availability and instant booking in Lakeside Pokhara.',
    images: [`${siteUrl}${seo.defaultImage}`],
  },
};

export default function ReserveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
