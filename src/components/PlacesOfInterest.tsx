'use client';

import Image from 'next/image';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';

const { placesOfInterest } = siteContent;

export function PlacesOfInterest() {
  return (
    <section className="bg-accent py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {placesOfInterest.sectionTitle}
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            {placesOfInterest.sectionSubtitle}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {placesOfInterest.places.map((place, index) => {
            const isExternal = place.image.startsWith('http');
            return (
              <motion.article
                key={place.id}
                className="flex flex-col overflow-hidden rounded-xl border border-accent bg-secondary shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className="relative h-40">
                  {isExternal ? (
                    <Image
                      src={place.image}
                      alt={place.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized={place.image.startsWith('https://images.unsplash.com')}
                    />
                  ) : (
                    <Image
                      src={place.image}
                      alt={place.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-heading text-sm font-semibold text-primary">
                    {place.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary/70">
                    {place.distance}
                  </p>
                  <p className="mt-2 text-xs text-gray-600">{place.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


