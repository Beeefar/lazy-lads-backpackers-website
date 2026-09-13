'use client';

import Image from 'next/image';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';

const { team } = siteContent;

export function TeamSection() {
  return (
    <section id="team" className="bg-sand py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary text-balance sm:text-4xl">
            {team.sectionTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            {team.sectionSubtitle}
          </p>
          <span className="mx-auto mt-5 block h-0.5 w-14 rounded-full bg-gold/70" />
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {team.members.map((member, index) => {
            const isExternal = member.image.startsWith('http');
            return (
              <motion.article
                key={member.id}
                className="flex flex-col items-center rounded-2xl border border-accent bg-white p-7 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full bg-accent ring-2 ring-gold/30 ring-offset-2 ring-offset-white">
                  {isExternal ? (
                    <Image
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      className="object-cover"
                      sizes="112px"
                      unoptimized={member.image.startsWith('https://images.unsplash.com')}
                    />
                  ) : (
                    <Image
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  )}
                </div>
                <h3 className="font-heading text-lg font-bold text-primary">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{member.bio}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
