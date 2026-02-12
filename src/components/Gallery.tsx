'use client';

import Image from 'next/image';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';

const { gallery } = siteContent;

export function Gallery() {
  return (
    <section id="gallery" className="bg-accent py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {gallery.sectionTitle}
          </h2>
          <p className="mt-2 text-gray-600">{gallery.sectionSubtitle}</p>
        </motion.div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.images.map((img, i) => {
            const isExternal = img.src.startsWith('http');
            return (
              <motion.div
                key={img.id}
                className="mb-4 break-inside-avoid"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.08 }}
              >
                <div className="relative overflow-hidden rounded-lg bg-white shadow-sm">
                  <div className="relative aspect-[4/3]">
                    {isExternal ? (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={img.src.startsWith('https://images.unsplash.com')}
                      />
                    ) : (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
