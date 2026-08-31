import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WhatsAppFloating } from '@/components/WhatsAppFloating';
import { JsonLd } from '@/components/JsonLd';
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

const { seo, siteName, hotel } = siteContent;
const siteUrl = seo.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${siteName}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification meta content here, e.g.
    // google: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
    site: `@${seo.twitterHandle}`,
    creator: `@${seo.twitterHandle}`,
    title: seo.title,
    description: seo.description,
    images: [seo.defaultImage],
  },
  category: 'travel',
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: hotel.legalName,
  alternateName: hotel.alternateName,
  url: siteUrl,
  logo: `${siteUrl}/images/icons/logo.png`,
  sameAs: hotel.sameAs,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+977-9856057003',
    contactType: 'customer service',
    areaServed: 'NP',
    availableLanguage: ['en'],
  },
};

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  description: seo.description,
  publisher: { '@id': `${siteUrl}/#organization` },
  inLanguage: 'en',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd} />
      </head>
      <body className="min-h-screen bg-secondary">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
