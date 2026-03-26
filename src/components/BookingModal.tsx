'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

// ─── Config ──────────────────────────────────────────────────────────────────
const PROPERTY_ID = process.env.NEXT_PUBLIC_HOSTELMATE_PROPERTY_ID ?? 'YOUR_PROPERTY_ID';

function buildBookingUrl(checkIn?: string, checkOut?: string) {
  const base = `https://book.hostelmate.co/?pid=${PROPERTY_ID}`;
  const params = new URLSearchParams();
  if (checkIn)  params.set('CheckIn',  checkIn);
  if (checkOut) params.set('CheckOut', checkOut);
  const qs = params.toString();
  return qs ? `${base}&${qs}` : base;
}

interface BookingModalProps {
  checkIn?: string;
  checkOut?: string;
  label?: string;
  className?: string;
}

export function BookingModal({ checkIn, checkOut, label = 'Book Now', className }: BookingModalProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const src = buildBookingUrl(checkIn, checkOut);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setLoaded(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          'rounded-lg bg-primary px-5 py-2.5 font-heading font-semibold text-secondary shadow-md hover:bg-primary/90 transition-colors'
        }
      >
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/*
              Backdrop
              Mobile:  full screen
              Desktop: starts at sm:top-[65px] so the sticky navbar remains
                       visible and fully clickable above the overlay
            */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm sm:top-[65px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/*
              Panel
              Mobile:  bottom sheet — rounded top corners, header with close button
              Desktop: sm:top-[65px] docks it flush under the navbar
                       sm:rounded-none removes the mobile rounding
                       The iframe fills 100% of the remaining viewport height
            */}
            <motion.div
              key="modal"
              className="fixed inset-x-0 bottom-0 top-16 z-[70] flex flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:top-[65px] sm:rounded-none"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              aria-label="Book your stay"
            >
              {/* Mobile-only header (hidden on desktop) */}
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3 sm:hidden">
                <div>
                  <p className="font-heading text-sm font-bold text-primary">Book Your Stay</p>
                  <p className="text-xs text-gray-400">Lazy Lads Backpackers · Pokhara</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  aria-label="Close booking"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Desktop-only floating close button (top-right corner of the iframe) */}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-3 z-10 hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md text-gray-600 hover:bg-white hover:text-primary transition-colors"
                aria-label="Close booking"
              >
                <X size={18} />
              </button>

              {/* Loading spinner */}
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <Loader2 size={32} className="animate-spin text-primary" />
                    <p className="text-sm">Loading booking engine…</p>
                  </div>
                </div>
              )}

              {/* The iframe — expands to fill all remaining panel height */}
              <iframe
                ref={iframeRef}
                src={src}
                title="Lazy Lads Booking Engine"
                className={`w-full flex-1 border-0 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
                allow="payment"
                loading="eager"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
