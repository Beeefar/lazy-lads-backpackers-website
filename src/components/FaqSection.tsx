'use client';

import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {faqs.sectionTitle}
          </h2>
          <p className="mt-2 text-gray-600">{faqs.sectionSubtitle}</p>
        </motion.div>

        <div className="mt-8 space-y-3">
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
                className="rounded-xl border border-accent bg-white"
              >
                <button
                  id={buttonId}
                  aria-controls={contentId}
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                  type="button"
                >
                  <span className="font-heading text-sm font-semibold text-primary">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-primary transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`overflow-hidden px-4 transition-[max-height,opacity] duration-200 ${
                    isOpen ? 'max-h-40 py-2 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="pb-3 text-sm text-gray-600">{item.answer}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

