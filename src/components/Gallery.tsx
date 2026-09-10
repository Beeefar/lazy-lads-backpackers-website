'use client';

import Image from 'next/image';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';

const { gallery } = siteContent;

export function Gallery() {
  return (
    <section id="gallery" className="bg-sand py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary text-balance sm:text-4xl">
            {gallery.sectionTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-gray-600">{gallery.sectionSubtitle}</p>
          <span className="mx-auto mt-5 block h-0.5 w-14 rounded-full bg-gold/70" />
        </motion.div>

        <div className="mt-12 columns-2 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
          {gallery.images.map((img, i) => {
            const isExternal = img.src.startsWith('http');
            return (
              <motion.div
                key={img.id}
                className="group mb-3 break-inside-avoid sm:mb-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.08 }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-soft">
                  <div className="relative aspect-[4/3]">
                    {isExternal ? (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={img.src.startsWith('https://images.unsplash.com')}
                      />
                    ) : (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/10" />
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
