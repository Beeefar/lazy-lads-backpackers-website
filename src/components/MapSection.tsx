'use client';

import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';

const { map } = siteContent;

export function MapSection() {
  return (
    <section id="contact" className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {map.sectionTitle}
          </h2>
          <p className="mt-2 text-gray-600">{map.sectionSubtitle}</p>
          {map.address && (
            <p className="mt-4 font-medium text-primary">
              {map.address}
            </p>
          )}
        </motion.div>

        <motion.div
          className="mt-10 overflow-hidden rounded-xl border border-accent shadow-md"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative aspect-video w-full">
            <iframe
              src={map.embedUrl}
              title="Lazy Lads Backpackers Hostel location"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {map.googleMapsLink && (
          <p className="mt-4 text-center">
            <a
              href={map.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium underline hover:no-underline"
            >
              Open in Google Maps
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
