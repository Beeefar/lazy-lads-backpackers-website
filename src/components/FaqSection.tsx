'use client';

import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const { faqs } = siteContent;

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs.items[0]?.id ?? null);

  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary text-balance sm:text-4xl">
            {faqs.sectionTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-gray-600">{faqs.sectionSubtitle}</p>
          <span className="mx-auto mt-5 block h-0.5 w-14 rounded-full bg-gold/70" />
        </motion.div>

        <div className="mt-10 space-y-3">
          {faqs.items.map((item, index) => {
            const isOpen = openId === item.id;
            const contentId = `faq-content-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                  isOpen ? 'border-gold/40 shadow-soft' : 'border-accent'
                }`}
              >
                <button
                  id={buttonId}
                  aria-controls={contentId}
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  type="button"
                >
                  <span className="font-heading text-sm font-semibold text-primary sm:text-base">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                      isOpen ? 'rotate-45 bg-gold text-white' : 'bg-accent text-primary'
                    }`}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </span>
                </button>
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`overflow-hidden px-5 transition-[max-height,opacity] duration-200 ${
                    isOpen ? 'max-h-48 py-2 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="pb-4 text-sm leading-relaxed text-gray-600">{item.answer}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
