'use client';

import Image from 'next/image';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';

const { adventures } = siteContent;

export function Adventures() {
  return (
    <section id="adventures" className="bg-accent py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
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

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {adventures.items.map((item, index) => {
            const isExternal = item.image.startsWith('http');
            return (
              <motion.article
                key={item.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-accent bg-secondary shadow-sm"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="relative h-52">
                  {isExternal ? (
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={item.image.startsWith('https://images.unsplash.com')}
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-xl font-bold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 flex-1">
                    {item.description}
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wide text-primary/80">
                    Book directly with our travel desk once you arrive.
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

