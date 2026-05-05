'use client';

import { siteContent } from '@/config/site-content';
import { BookingModal } from '@/components/BookingModal';

const { siteName, footer } = siteContent;

// ─── Inline SVG icons (no extra dep, pixel-perfect brand shapes) ──────────────

function IconInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function IconTikTok({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/>
    </svg>
  );
}

function IconFacebook({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function IconGoogle({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
    </svg>
  );
}

// ─── Social link item ──────────────────────────────────────────────────────────

interface SocialLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function SocialLink({ href, label, children }: SocialLinkProps) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-all hover:bg-white/20 hover:text-white hover:scale-110"
    >
      {children}
    </a>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();
  const copyright = footer.copyright.replace('%year%', String(year));
  const { social } = footer;

  return (
    <footer className="border-t border-accent bg-primary py-12 text-secondary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ── Top row ────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

          {/* Left — brand + tagline + social */}
          <div>
            <p className="font-heading text-2xl font-bold">{siteName}</p>
            <p className="mt-1 text-white/75">{footer.tagline}</p>

            {/* Social icons */}
            <div className="mt-4 flex items-center gap-2">
              <SocialLink href={social.instagram} label="Instagram">
                <IconInstagram size={18} />
              </SocialLink>
              <SocialLink href={social.tiktok} label="TikTok">
                <IconTikTok size={18} />
              </SocialLink>
              <SocialLink href={social.facebook} label="Facebook">
                <IconFacebook size={18} />
              </SocialLink>
              <SocialLink href={social.googleReview} label="Leave a Google Review">
                <IconGoogle size={18} />
              </SocialLink>
            </div>
          </div>

          {/* Right — contact + Book Now */}
          <div className="flex flex-col gap-2 sm:items-end text-sm font-medium">
            {footer.email && (
              <a
                href={`mailto:${footer.email}`}
                className="text-white/80 transition-colors hover:text-white"
              >
                {footer.email}
              </a>
            )}

            {/* Primary phone */}
            {footer.phone && (
              <a
                href={`tel:${footer.phone.replace(/[\s-]/g, '')}`}
                className="text-white/80 transition-colors hover:text-white"
              >
                {footer.phone}
              </a>
            )}

            {/* Second / alternative phone */}
            {footer.phone2 && (
              <a
                href={`tel:${footer.phone2.replace(/[\s-]/g, '')}`}
                className="text-white/80 transition-colors hover:text-white"
              >
                {footer.phone2}
                <span className="ml-1.5 text-xs font-normal text-white/50">(alt)</span>
              </a>
            )}

            <div className="pt-3">
              <BookingModal
                label={footer.bookNowLabel}
                className="inline-block rounded-lg bg-white px-6 py-3 font-heading font-bold text-primary shadow-lg transition-all hover:bg-white/90 active:scale-95"
              />
            </div>
          </div>
        </div>

        {/* ── Divider + copyright ────────────────────────────────────────── */}
        <p className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/50">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
