'use client';

import Image from 'next/image';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const { placesOfInterest } = siteContent;

export function PlacesOfInterest() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary text-balance sm:text-4xl">
            {placesOfInterest.sectionTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            {placesOfInterest.sectionSubtitle}
          </p>
          <span className="mx-auto mt-5 block h-0.5 w-14 rounded-full bg-gold/70" />
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {placesOfInterest.places.map((place, index) => {
            const isExternal = place.image.startsWith('http');
            return (
              <motion.article
                key={place.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-accent bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <div className="relative h-44 overflow-hidden">
                  {isExternal ? (
                    <Image
                      src={place.image}
                      alt={place.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized={place.image.startsWith('https://images.unsplash.com')}
                    />
                  ) : (
                    <Image
                      src={place.image}
                      alt={place.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm backdrop-blur">
                    <MapPin size={11} strokeWidth={2.5} className="text-gold" />
                    {place.distance}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-heading text-base font-bold text-primary">
                    {place.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{place.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
