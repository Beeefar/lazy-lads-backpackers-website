'use client';

import { siteContent } from '@/config/site-content';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const { contact } = siteContent;

function buildWhatsAppUrl(message: string) {
  if (!contact.whatsAppNumber) return null;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${contact.whatsAppNumber}?text=${encoded}`;
}

export function WhatsAppFloating() {
  const href = buildWhatsAppUrl(contact.whatsAppMessageMain);

  if (!href) return null;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Lazy Lads on WhatsApp"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: [1, 1.06, 1],
      }}
      transition={{
        opacity: { duration: 0.3 },
        y: { duration: 0.3 },
        scale: { duration: 1.8, repeat: Infinity, repeatDelay: 1.5 },
      }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
    >
      <div className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
          <MessageCircle size={18} />
        </span>
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </div>
    </motion.a>
  );
}

