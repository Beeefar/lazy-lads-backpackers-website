'use client';

import { siteContent } from '@/config/site-content';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Mail } from 'lucide-react';

const { map, contact, footer } = siteContent;

const whatsAppHref = contact.whatsAppNumber
  ? `https://wa.me/${contact.whatsAppNumber}?text=${encodeURIComponent(contact.whatsAppMessageMain)}`
  : null;

const contactCards = [
  {
    id: 'phone',
    label: 'Call Us',
    value: footer.phone,
    href: footer.phone ? `tel:${footer.phone.replace(/\s/g, '')}` : null,
    Icon: Phone,
    iconBg: 'bg-primary',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: 'Chat with us',
    href: whatsAppHref,
    Icon: MessageSquare,
    iconBg: 'bg-[#25D366]',
  },
  {
    id: 'email',
    label: 'Email',
    value: footer.email,
    href: footer.email ? `mailto:${footer.email}` : null,
    Icon: Mail,
    iconBg: 'bg-primary',
  },
] as const;

export function MapSection() {
  return (
    <section id="contact" className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {map.sectionTitle}
          </h2>
          <p className="mt-2 text-gray-600">{map.sectionSubtitle}</p>
          {map.address && (
            <p className="mt-3 text-sm font-medium text-primary/80">{map.address}</p>
          )}
        </motion.div>

        {/* Contact cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {contactCards.map(({ id, label, value, href, Icon, iconBg }, index) => {
            if (!value || !href) return null;
            return (
              <motion.a
                key={id}
                href={href}
                target={id === 'whatsapp' ? '_blank' : undefined}
                rel={id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-xl border border-accent bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white ${iconBg}`}
                >
                  <Icon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {label}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-primary group-hover:underline">
                    {value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Map embed */}
        <motion.div
          className="mt-8 overflow-hidden rounded-xl border border-accent shadow-md"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="relative aspect-video w-full">
            <iframe
              src={map.embedUrl}
              title="Lazy Lads Backpackers Hostel location"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {map.googleMapsLink && (
          <p className="mt-4 text-center">
            <a
              href={map.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary underline hover:no-underline"
            >
              Open in Google Maps ↗
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
