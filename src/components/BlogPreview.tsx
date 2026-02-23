'use client';

import Link from 'next/link';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';

const { blog } = siteContent;

const categoryStyles: Record<string, string> = {
  'Hostel Life':   'bg-blue-100 text-blue-800',
  'Travel Guide':  'bg-emerald-100 text-emerald-800',
  Adventure:       'bg-orange-100 text-orange-800',
  'Digital Nomad': 'bg-violet-100 text-violet-800',
};

function CategoryBadge({ category }: { category: string }) {
  const cls = categoryStyles[category] ?? 'bg-gray-100 text-gray-700';
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide ${cls}`}>
      {category}
    </span>
  );
}

/** 3 most recent posts — computed once at module load */
const latestPosts = [...blog.posts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export function BlogPreview() {
  return (
    <section id="blog" className="bg-accent py-16 sm:py-24">
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
            {blog.sectionTitle}
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{blog.sectionSubtitle}</p>
        </motion.div>

        {/* 3 most recent post cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latestPosts.map((post, index) => {
            const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
            return (
              <motion.article
                key={post.id}
                className="flex flex-col rounded-2xl border border-accent bg-secondary p-5 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CategoryBadge category={post.category} />
                  <p className="text-xs text-gray-400">{formattedDate}</p>
                </div>
                <h3 className="mt-3 font-heading text-lg font-bold text-primary leading-snug">
                  {post.title}
                </h3>
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
        </div>

        {/* "View All Stories" CTA → /blog */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 font-heading font-semibold text-secondary shadow-md hover:bg-primary/90 transition-colors"
          >
            View All Stories
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
