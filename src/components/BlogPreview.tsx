'use client';

import Link from 'next/link';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';

const { blog } = siteContent;

export function BlogPreview() {
  return (
    <section id="blog" className="bg-accent py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            {blog.sectionSubtitle}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {blog.posts.map((post, index) => {
            const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });

            return (
              <motion.article
                key={post.id}
                className="flex flex-col rounded-2xl border border-accent bg-secondary p-5 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                  {formattedDate}
                </p>
                <h3 className="mt-2 font-heading text-lg font-bold text-primary">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 flex-1">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4 hover:no-underline"
                >
                  Read full story
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


