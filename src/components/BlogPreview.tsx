'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
    <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide shadow-sm ${cls}`}>
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
    <section id="blog" className="bg-sand py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary text-balance sm:text-4xl">
            {blog.sectionTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-gray-600">{blog.sectionSubtitle}</p>
          <span className="mx-auto mt-5 block h-0.5 w-14 rounded-full bg-gold/70" />
        </motion.div>

        {/* 3 most recent post cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latestPosts.map((post, index) => {
            const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
            const isExternal = post.image.startsWith('http');
            return (
              <motion.article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-accent bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className="relative h-44 overflow-hidden">
                  {isExternal ? (
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={post.image.startsWith('https://images.unsplash.com')}
                    />
                  ) : (
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute left-3 top-3 z-10">
                    <CategoryBadge category={post.category} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-gray-400">{formattedDate}</p>
                  <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-gold"
                  >
                    Read full story
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
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
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-7 py-3 font-heading font-semibold text-secondary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            View All Stories
            <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
