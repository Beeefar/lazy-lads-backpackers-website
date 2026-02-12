'use client';

import { siteContent } from '@/config/site-content';

const { siteName, footer, CLOUDBEDS_URL } = siteContent;

export function Footer() {
  const year = new Date().getFullYear();
  const copyright = footer.copyright.replace('%year%', String(year));

  return (
    <footer className="border-t border-accent bg-primary py-12 text-secondary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-heading text-lg font-bold">{siteName}</p>
            <p className="mt-1 text-sm text-white/90">{footer.tagline}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {footer.email && (
              <a href={`mailto:${footer.email}`} className="text-white/90 hover:text-white">
                {footer.email}
              </a>
            )}
            {footer.phone && (
              <a href={`tel:${footer.phone.replace(/\s/g, '')}`} className="text-white/90 hover:text-white">
                {footer.phone}
              </a>
            )}
            <a
              href={CLOUDBEDS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded bg-white px-4 py-2 font-heading font-semibold text-primary hover:bg-white/95"
            >
              {footer.bookNowLabel}
            </a>
          </div>
        </div>
        <p className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/80">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
