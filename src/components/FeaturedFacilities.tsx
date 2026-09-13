'use client';

import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';
import { Wifi, ShieldCheck, Wine, MapPin, Sparkles, Coffee, Dumbbell, Plane } from 'lucide-react';

const { featuredFacilities } = siteContent;

const iconMap = {
  wifi: Wifi,
  security: ShieldCheck,
  bar: Wine,
  'travel-desk': MapPin,
  housekeeping: Sparkles,
  breakfast: Coffee,
  exercise: Dumbbell,
  airport: Plane,
} as const;

export function FeaturedFacilities() {
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
            {featuredFacilities.sectionTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-gray-600">{featuredFacilities.sectionSubtitle}</p>
          <span className="mx-auto mt-5 block h-0.5 w-14 rounded-full bg-gold/70" />
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {featuredFacilities.items.map((item, index) => {
            const Icon = iconMap[item.id as keyof typeof iconMap] ?? Wifi;
            return (
              <motion.div
                key={item.id}
                className="flex items-center gap-3 rounded-2xl border border-accent bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Icon size={22} />
                </div>
                <p className="font-heading text-sm font-semibold leading-snug text-primary">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
