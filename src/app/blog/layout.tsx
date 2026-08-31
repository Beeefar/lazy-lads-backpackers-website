import type { Metadata } from 'next';
import { siteContent } from '@/config/site-content';

const { seo, siteName } = siteContent;
const siteUrl = seo.siteUrl;

export const metadata: Metadata = {
  title: 'Blog — Lazy Lads Backpackers Hostel',
  description:
    'Travel guides, hostel life, trekking tips, and digital nomad advice from Lazy Lads Backpackers Hostel in Pokhara, Nepal.',
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: `Blog | ${siteName}`,
    description: 'Travel guides, hostel life, trekking tips, and digital nomad advice from Pokhara, Nepal.',
    type: 'website',
    url: `${siteUrl}/blog`,
    siteName,
    locale: 'en_US',
    images: [{ url: `${siteUrl}${seo.defaultImage}`, width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | ${siteName}`,
    description: 'Travel guides, hostel life, trekking tips, and digital nomad advice from Pokhara, Nepal.',
    images: [`${siteUrl}${seo.defaultImage}`],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
