'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';
import { Mountain, Clock, Zap, ArrowRight } from 'lucide-react';

const { adventures } = siteContent;

type AdventureCategory = 'Multi-Day' | 'Half-Day' | 'Adrenaline';

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

export function AdventureCategoryBadge({ category }: { category: AdventureCategory }) {
  const config = CATEGORY_CONFIG[category];
  if (!config) return null;
  const { Icon, className } = config;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide shadow-sm backdrop-blur ${className}`}>
      <Icon size={12} strokeWidth={2.5} />
      {category}
    </span>
  );
}

const HOMEPAGE_LIMIT = 4;
const previewItems = adventures.items.slice(0, HOMEPAGE_LIMIT);

export function Adventures() {
  return (
    <section id="adventures" className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary text-balance sm:text-4xl">
            {adventures.sectionTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            {adventures.sectionSubtitle}
          </p>
          <span className="mx-auto mt-5 block h-0.5 w-14 rounded-full bg-gold/70" />
        </motion.div>

        <div
          className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:snap-none lg:grid-cols-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {previewItems.map((item, index) => {
            const isExternal = item.image.startsWith('http');
            const altText = (item as { imageAlt?: string }).imageAlt || item.title;
            return (
              <motion.article
                key={item.id}
                className="group flex w-72 flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-accent bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:w-auto sm:flex-shrink"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <div className="relative h-52 flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={altText}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 288px, (max-width: 1024px) 50vw, 25vw"
                    unoptimized={isExternal && item.image.startsWith('https://images.unsplash.com')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <div className="absolute left-3 top-3 z-10">
                    <AdventureCategoryBadge category={item.category as AdventureCategory} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-heading text-base font-bold text-primary">{item.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
                  <Link
                    href={`/adventures/${item.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-gold"
                  >
                    Learn more
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-3 text-center text-xs text-gray-400 sm:hidden">
          ← Swipe to see more →
        </p>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link
            href="/adventures"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-7 py-3 font-heading font-semibold text-secondary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            View All {adventures.items.length} Adventures
            <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
