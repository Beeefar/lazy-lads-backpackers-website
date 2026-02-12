'use client';

import Image from 'next/image';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';

const { hero, CLOUDBEDS_URL } = siteContent;

export function Hero() {
  const isExternalImage = hero.image.startsWith('http');

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-accent">
      <div className="absolute inset-0">
        {isExternalImage ? (
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized={hero.image.startsWith('https://images.unsplash.com')}
          />
        ) : (
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center">
        <motion.h1
          className="font-heading text-4xl font-bold text-secondary drop-shadow-md sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-white/95 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {hero.subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href={CLOUDBEDS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-lg bg-secondary px-8 py-4 font-heading text-lg font-semibold text-primary shadow-lg hover:bg-white/95 transition-colors"
          >
            Book Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
