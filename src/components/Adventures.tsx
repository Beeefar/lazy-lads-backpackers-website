'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';
import { Mountain, Clock, Zap } from 'lucide-react';

const { adventures } = siteContent;

type AdventureCategory = 'Multi-Day' | 'Half-Day' | 'Adrenaline';

// ─── Category config ─────────────────────────────────────────────────────────
// Add a new category to this map and badges update everywhere automatically.
const CATEGORY_CONFIG: Record<
  AdventureCategory,
  { Icon: React.ElementType; className: string }
> = {
  'Multi-Day': {
    Icon: Mountain,
    className: 'bg-blue-50 text-blue-900 border border-blue-200',
  },
  'Half-Day': {
    Icon: Clock,
    className: 'bg-sky-50 text-sky-900 border border-sky-200',
  },
  Adrenaline: {
    Icon: Zap,
    className: 'bg-amber-50 text-amber-900 border border-amber-200',
  },
};

/**
 * Reusable adventure category badge.
 * Exported so /adventures/[slug]/page.tsx can reuse it without duplication.
 */
export function AdventureCategoryBadge({ category }: { category: AdventureCategory }) {
  const config = CATEGORY_CONFIG[category];
  if (!config) return null;
  const { Icon, className } = config;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide ${className}`}
    >
      <Icon size={12} strokeWidth={2.5} />
      {category}
    </span>
  );
}

// Show only first 4 adventures on homepage — the rest live at /adventures
const HOMEPAGE_LIMIT = 4;
const previewItems = adventures.items.slice(0, HOMEPAGE_LIMIT);

export function Adventures() {
  return (
    <section id="adventures" className="bg-accent py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {adventures.sectionTitle}
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            {adventures.sectionSubtitle}
          </p>
        </motion.div>

        {/*
          ── Cards ──────────────────────────────────────────────────────────
          Mobile: horizontal scroll carousel (no wrapping, finger-swipeable)
          Tablet+: 2-col grid
          Desktop: 4-col grid (matches HOMEPAGE_LIMIT)
        */}
        <div
          className="
            mt-10
            flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory
            sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:snap-none
            lg:grid-cols-4
          "
          style={{ scrollbarWidth: 'none' }}
        >
          {previewItems.map((item, index) => {
            const isExternal = item.image.startsWith('http');
            const altText = (item as { imageAlt?: string }).imageAlt || item.title;
            return (
              <motion.article
                key={item.id}
                className="
                  flex-shrink-0 w-72 snap-start
                  flex flex-col overflow-hidden rounded-2xl border border-accent bg-secondary shadow-sm hover:shadow-md transition-shadow
                  sm:w-auto sm:flex-shrink
                "
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                {/* Image */}
                <div className="relative h-48 flex-shrink-0">
                  {isExternal ? (
                    <Image
                      src={item.image}
                      alt={altText}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 288px, (max-width: 1024px) 50vw, 25vw"
                      unoptimized={item.image.startsWith('https://images.unsplash.com')}
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={altText}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 288px, (max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                  {/* Floating category badge */}
                  <div className="absolute top-3 left-3">
                    <AdventureCategoryBadge category={item.category as AdventureCategory} />
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-heading text-base font-bold text-primary">{item.title}</h3>
                  <p className="mt-1.5 text-xs text-gray-600 flex-1 line-clamp-3">
                    {item.description}
                  </p>
                  <Link
                    href={`/adventures/${item.slug}`}
                    className="mt-3 inline-block text-xs font-semibold text-primary underline underline-offset-4 hover:no-underline"
                  >
                    Learn more →
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Scroll hint on mobile */}
        <p className="mt-3 text-center text-xs text-gray-400 sm:hidden">
          ← Swipe to see more →
        </p>

        {/* "View All Adventures" CTA */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link
            href="/adventures"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 font-heading font-semibold text-secondary shadow-md hover:bg-primary/90 transition-colors"
          >
            View All {adventures.items.length} Adventures
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
