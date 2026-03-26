'use client';

import { siteContent } from '@/config/site-content';
import { BookingModal } from '@/components/BookingModal';

const { siteName, footer } = siteContent;

export function Footer() {
  const year = new Date().getFullYear();
  const copyright = footer.copyright.replace('%year%', String(year));

  return (
    <footer className="border-t border-accent bg-primary py-12 text-secondary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">

          <div>
            <p className="font-heading text-2xl font-bold">{siteName}</p>
            <p className="mt-2 text-base text-white/90">{footer.tagline}</p>
          </div>

          <div className="flex flex-col items-center gap-2 text-base font-medium sm:items-end">
            {footer.email && (
              <a href={`mailto:${footer.email}`} className="text-white/90 transition-colors hover:text-white">
                {footer.email}
              </a>
            )}
            {footer.phone && (
              <a href={`tel:${footer.phone.replace(/\s/g, '')}`} className="text-white/90 transition-colors hover:text-white">
                {footer.phone}
              </a>
            )}
            <div className="pt-2">
              <BookingModal
                label={footer.bookNowLabel}
                className="inline-block rounded-lg bg-white px-6 py-3 font-heading font-bold text-primary shadow-lg transition-all hover:bg-white/90 active:scale-95"
              />
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/70">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
