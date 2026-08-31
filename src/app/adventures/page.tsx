'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteContent } from '@/config/site-content';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Mountain, Clock, Zap } from 'lucide-react';

const { adventures } = siteContent;

type AdventureCategory = 'Multi-Day' | 'Half-Day' | 'Adrenaline';

// Auto-derive filter categories from data — no manual updates needed when you add adventures
const ALL_CATEGORIES = [
  'All',
  ...Array.from(new Set(adventures.items.map((a) => a.category))).sort(),
] as const;

const CATEGORY_CONFIG: Record<AdventureCategory, {
  Icon: React.ElementType;
  badgeCls: string;
  activePillCls: string;
}> = {
  'Multi-Day':  { Icon: Mountain, badgeCls: 'bg-blue-50 text-blue-900 border border-blue-200',    activePillCls: 'bg-blue-700 text-white'   },
  'Half-Day':   { Icon: Clock,    badgeCls: 'bg-sky-50 text-sky-900 border border-sky-200',       activePillCls: 'bg-sky-700 text-white'    },
  Adrenaline:   { Icon: Zap,      badgeCls: 'bg-amber-50 text-amber-900 border border-amber-200', activePillCls: 'bg-amber-600 text-white'  },
};

function CategoryBadge({ category }: { category: AdventureCategory }) {
  const config = CATEGORY_CONFIG[category];
  if (!config) return null;
  const { Icon, badgeCls } = config;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide ${badgeCls}`}>
      <Icon size={12} strokeWidth={2.5} />
      {category}
    </span>
  );
}

export default function AdventureArchivePage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return adventures.items;
    return adventures.items.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="bg-secondary pb-20 pt-10 sm:pb-28 sm:pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-medium text-gray-500">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-primary">Adventures</li>
          </ol>
        </nav>

        {/* Hero header */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl font-bold text-primary sm:text-5xl">
            Adventures in Pokhara from Lazy Lads
          </h1>
          <p className="mt-3 text-lg text-gray-500 max-w-xl mx-auto">
            {adventures.sectionSubtitle}
          </p>
        </motion.div>

        {/* Category filter pills */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {ALL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const activeCls =
              cat === 'All'
                ? 'bg-primary text-white border-transparent'
                : `${CATEGORY_CONFIG[cat as AdventureCategory]?.activePillCls ?? 'bg-primary text-white'} border-transparent`;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? `${activeCls} shadow-sm`
                    : 'border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {cat !== 'All' && (() => {
                  const conf = CATEGORY_CONFIG[cat as AdventureCategory];
                  if (!conf) return null;
                  const { Icon } = conf;
                  return <Icon size={13} strokeWidth={2.5} />;
                })()}
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Item count */}
        <motion.p
          key={activeCategory}
          className="mt-5 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {filteredItems.length === 0
            ? 'No adventures in this category yet.'
            : `${filteredItems.length} ${filteredItems.length === 1 ? 'adventure' : 'adventures'}`}
        </motion.p>

        {/* Grid */}
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isExternal = item.image.startsWith('http');
              // Safe alt text fallback — prevents build errors if imageAlt is ever missing
              const altText = (item as { imageAlt?: string }).imageAlt || item.title;
              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col overflow-hidden rounded-2xl border border-accent bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image with floating badge */}
                  <div className="relative h-52">
                    {isExternal ? (
                      <Image
                        src={item.image}
                        alt={altText}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={item.image.startsWith('https://images.unsplash.com')}
                      />
                    ) : (
                      <Image
                        src={item.image}
                        alt={altText}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute top-3 left-3">
                      <CategoryBadge category={item.category as AdventureCategory} />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-heading text-xl font-bold text-primary">{item.title}</h2>
                    <p className="mt-2 text-sm text-gray-600 flex-1">{item.description}</p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wide text-primary/70">
                      Book with our travel desk on arrival.
                    </p>
                    <Link
                      href={`/adventures/${item.slug}`}
                      className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4 hover:no-underline"
                    >
                      Learn more →
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-accent px-5 py-2.5 text-sm text-gray-600 hover:bg-accent transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}