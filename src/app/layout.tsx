import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WhatsAppFloating } from '@/components/WhatsAppFloating';
import { siteContent } from '@/config/site-content';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const { seo, siteName } = siteContent;

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${siteName}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: 'website',
    url: seo.siteUrl,
    siteName,
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
    site: `@${seo.twitterHandle}`,
    title: seo.title,
    description: seo.description,
    images: [seo.defaultImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-secondary">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
