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
    <section className="bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {featuredFacilities.sectionTitle}
          </h2>
          <p className="mt-2 text-gray-600">{featuredFacilities.sectionSubtitle}</p>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredFacilities.items.map((item, index) => {
            const Icon = iconMap[item.id as keyof typeof iconMap] ?? Wifi;
            return (
              <motion.div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-accent bg-white px-4 py-4 shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <Icon size={22} />
                </div>
                <p className="font-heading text-sm font-semibold text-primary">
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

