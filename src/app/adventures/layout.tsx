import type { Metadata } from 'next';
import { siteContent } from '@/config/site-content';

const { seo, siteName } = siteContent;
const siteUrl = seo.siteUrl;

export const metadata: Metadata = {
  title: 'Adventures — Lazy Lads Backpackers Hostel',
  description:
    'Trekking, paragliding, rafting, zip-lining, caving, and the Mardi Himal Trek — book adventures from Lazy Lads Backpackers Hostel in Pokhara, Nepal.',
  alternates: { canonical: `${siteUrl}/adventures` },
  openGraph: {
    title: `Adventures | ${siteName}`,
    description: 'Trekking, paragliding, rafting, zip-lining, caving, and more from Pokhara, Nepal.',
    type: 'website',
    url: `${siteUrl}/adventures`,
    siteName,
    locale: 'en_US',
    images: [{ url: `${siteUrl}${seo.defaultImage}`, width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Adventures | ${siteName}`,
    description: 'Trekking, paragliding, rafting, zip-lining, caving, and more from Pokhara, Nepal.',
    images: [`${siteUrl}${seo.defaultImage}`],
  },
};

export default function AdventuresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
