'use client';

import Link from 'next/link';
import { siteContent } from '@/config/site-content';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const { siteName, nav, CLOUDBEDS_URL } = siteContent;

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-secondary border-b border-accent">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-heading text-xl font-bold text-primary">
          {siteName}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.roomsLabel && (
            <a href="#rooms" className="text-gray-600 hover:text-primary transition-colors">
              {nav.roomsLabel}
            </a>
          )}
          {nav.adventuresLabel && (
            <a href="#adventures" className="text-gray-600 hover:text-primary transition-colors">
              {nav.adventuresLabel}
            </a>
          )}
          {nav.galleryLabel && (
            <a href="#gallery" className="text-gray-600 hover:text-primary transition-colors">
              {nav.galleryLabel}
            </a>
          )}
          {nav.teamLabel && (
            <a href="#team" className="text-gray-600 hover:text-primary transition-colors">
              {nav.teamLabel}
            </a>
          )}
          {nav.contactLabel && (
            <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">
              {nav.contactLabel}
            </a>
          )}
          <a
            href={CLOUDBEDS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-5 py-2.5 font-heading font-semibold text-secondary shadow-md hover:bg-primary/90 transition-colors"
          >
            {nav.bookNowLabel}
          </a>
        </nav>

        <button
          type="button"
          className="flex p-2 text-primary md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-accent bg-secondary px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {nav.roomsLabel && (
              <a href="#rooms" className="text-gray-600 hover:text-primary" onClick={() => setOpen(false)}>
                {nav.roomsLabel}
              </a>
            )}
            {nav.adventuresLabel && (
              <a href="#adventures" className="text-gray-600 hover:text-primary" onClick={() => setOpen(false)}>
                {nav.adventuresLabel}
              </a>
            )}
            {nav.galleryLabel && (
              <a href="#gallery" className="text-gray-600 hover:text-primary" onClick={() => setOpen(false)}>
                {nav.galleryLabel}
              </a>
            )}
            {nav.teamLabel && (
              <a href="#team" className="text-gray-600 hover:text-primary" onClick={() => setOpen(false)}>
                {nav.teamLabel}
              </a>
            )}
            {nav.contactLabel && (
              <a href="#contact" className="text-gray-600 hover:text-primary" onClick={() => setOpen(false)}>
                {nav.contactLabel}
              </a>
            )}
            <a
              href={CLOUDBEDS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary px-5 py-3 font-heading font-semibold text-secondary text-center"
            >
              {nav.bookNowLabel}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
