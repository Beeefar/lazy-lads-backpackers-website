'use client';

import Image from 'next/image';
import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';

const { team } = siteContent;

export function TeamSection() {
  return (
    <section id="team" className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {team.sectionTitle}
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            {team.sectionSubtitle}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {team.members.map((member, index) => {
            const isExternal = member.image.startsWith('http');
            return (
              <motion.article
                key={member.id}
                className="flex flex-col items-center rounded-2xl border border-accent bg-white p-6 text-center shadow-sm"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full bg-accent">
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
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary/80">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-gray-600">{member.bio}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

