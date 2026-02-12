'use client';

import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';
import { MapPin, Navigation, BusFront } from 'lucide-react';

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

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {placesOfInterest.places.map((place, index) => (
            <motion.div
              key={place.id}
              className="flex items-start gap-4 rounded-xl border border-accent bg-secondary p-5 shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
            >
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary">
                {place.id.includes('lake') ? (
                  <Navigation size={20} />
                ) : place.id.includes('bus') ? (
                  <BusFront size={20} />
                ) : (
                  <MapPin size={20} />
                )}
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-primary">
                  {place.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">
                  {place.distance}
                </p>
                <p className="mt-2 text-sm text-gray-600">{place.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

