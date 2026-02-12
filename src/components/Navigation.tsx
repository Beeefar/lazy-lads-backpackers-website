'use client';

import Link from 'next/link';
import { siteContent } from '@/config/site-content';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const { siteName, nav, CLOUDBEDS_URL, adventures } = siteContent;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [adventuresOpen, setAdventuresOpen] = useState(false);

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
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                onClick={() => setAdventuresOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={adventuresOpen}
              >
                <span>{nav.adventuresLabel}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${adventuresOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {adventuresOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-accent bg-secondary py-2 shadow-lg"
                  >
                    {adventures.items.map((item) => (
                      <Link
                        key={item.id}
                        href={`/adventures/${item.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-primary"
                        onClick={() => setAdventuresOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
              <div className="space-y-1">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-gray-600 hover:text-primary"
                  onClick={() => setAdventuresOpen((prev) => !prev)}
                  aria-expanded={adventuresOpen}
                >
                  <span>{nav.adventuresLabel}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${adventuresOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {adventuresOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="ml-3 flex flex-col border-l border-accent pl-3 text-sm"
                    >
                      {adventures.items.map((item) => (
                        <Link
                          key={item.id}
                          href={`/adventures/${item.slug}`}
                          className="py-1 text-gray-600 hover:text-primary"
                          onClick={() => {
                            setOpen(false);
                            setAdventuresOpen(false);
                          }}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
