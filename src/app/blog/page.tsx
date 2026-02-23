'use client';

import Link from 'next/link';
import { siteContent } from '@/config/site-content';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

const { blog } = siteContent;

// Auto-derive categories from data — adding a new post category here is enough
const ALL_CATEGORIES = [
  'All',
  ...Array.from(new Set(blog.posts.map((p) => p.category))).sort(),
];

const categoryStyles: Record<string, { badge: string; activePill: string }> = {
  'Hostel Life':   { badge: 'bg-blue-100 text-blue-800',   activePill: 'bg-blue-700 text-white'    },
  'Travel Guide':  { badge: 'bg-emerald-100 text-emerald-800', activePill: 'bg-emerald-700 text-white' },
  Adventure:       { badge: 'bg-orange-100 text-orange-800',  activePill: 'bg-orange-600 text-white'  },
  'Digital Nomad': { badge: 'bg-violet-100 text-violet-800',  activePill: 'bg-violet-700 text-white'  },
};

function getBadgeCls(cat: string) {
  return categoryStyles[cat]?.badge ?? 'bg-gray-100 text-gray-700';
}
function getActivePillCls(cat: string) {
  return categoryStyles[cat]?.activePill ?? 'bg-primary text-white';
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide ${getBadgeCls(category)}`}>
      {category}
    </span>
  );
}

export default function BlogArchivePage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    const sorted = [...blog.posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return activeCategory === 'All'
      ? sorted
      : sorted.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="bg-secondary pb-20 pt-10 sm:pb-28 sm:pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-medium text-gray-500">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-primary">Blog</li>
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
            Explore Our Stories
          </h1>
          <p className="mt-3 text-lg text-gray-500 max-w-xl mx-auto">
            {blog.sectionSubtitle}
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
            const activeClass = cat === 'All' ? 'bg-primary text-white' : getActivePillCls(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? `${activeClass} border-transparent shadow-sm`
                    : 'border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Post count */}
        <motion.p
          key={activeCategory}
          className="mt-5 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {filteredPosts.length === 0
            ? 'No posts in this category yet.'
            : `${filteredPosts.length} ${filteredPosts.length === 1 ? 'post' : 'posts'}`}
        </motion.p>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => {
              const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });
              return (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.28, delay: index * 0.04 }}
                  className="flex flex-col rounded-2xl border border-accent bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CategoryBadge category={post.category} />
                    <p className="text-xs text-gray-400">{formattedDate}</p>
                  </div>
                  <h2 className="mt-3 font-heading text-lg font-bold text-primary leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 flex-1 line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4 hover:no-underline"
                  >
                    Read full story →
                  </Link>
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
