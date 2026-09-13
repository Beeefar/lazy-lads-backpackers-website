'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { siteContent } from '@/config/site-content';
import { BookingModal } from '@/components/BookingModal';
import { motion } from 'framer-motion';

const { hero, hotel } = siteContent;

export function Hero() {
  const isExternalImage = hero.image.startsWith('http');

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-primary sm:items-center">
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
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-primary/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-16 pt-28 sm:px-6 sm:py-24 sm:text-center">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 backdrop-blur-md"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Star size={14} className="fill-gold text-gold" />
          <span className="text-sm font-semibold text-white">{hotel.ratingValue}</span>
          <span className="text-sm text-white/70">· {hotel.reviewCount} reviews · Pokhara</span>
        </motion.div>

        <motion.h1
          className="mt-5 font-heading text-[2rem] font-bold leading-[1.08] text-white text-balance drop-shadow-sm sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:mx-auto sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <BookingModal
            label="Book Now"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-8 py-4 font-heading text-base font-semibold text-primary shadow-xl transition-all hover:-translate-y-0.5 hover:bg-white/95"
          />
          <Link
            href="/rooms"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/40 bg-white/5 px-8 py-4 font-heading text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/15"
          >
            Explore Rooms
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
