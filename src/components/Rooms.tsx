'use client';

import Image from 'next/image';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';
import { Wifi, Snowflake, Lock } from 'lucide-react';

const { rooms, CLOUDBEDS_URL } = siteContent;

const iconMap = {
  'Wi-Fi': Wifi,
  AC: Snowflake,
  Locker: Lock,
  'Private Bath': Lock,
} as const;

export function Rooms() {
  return (
    <section id="rooms" className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {rooms.sectionTitle}
          </h2>
          <p className="mt-2 text-gray-600">{rooms.sectionSubtitle}</p>
        </motion.div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.list.map((room, i) => {
            const isExternal = room.image.startsWith('http');
            return (
              <motion.article
                key={room.id}
                className="overflow-hidden rounded-xl border border-accent bg-white shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="relative h-52">
                  {isExternal ? (
                    <Image
                      src={room.image}
                      alt={room.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized={room.image.startsWith('https://images.unsplash.com')}
                    />
                  ) : (
                    <Image
                      src={room.image}
                      alt={room.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-xl font-bold text-primary">{room.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{room.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {room.features.map((f) => {
                      const Icon = iconMap[f as keyof typeof iconMap] ?? Wifi;
                      return (
                        <span
                          key={f}
                          className="inline-flex items-center gap-1 rounded bg-accent px-2 py-1 text-xs text-gray-700"
                        >
                          <Icon size={14} /> {f}
                        </span>
                      );
                    })}
                  </div>
                  <p className="mt-4 font-heading font-semibold text-primary">
                    Starting from {room.currency} {room.priceFrom}
                  </p>
                  <a
                    href={CLOUDBEDS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-secondary hover:bg-primary/90 transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
