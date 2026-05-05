'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Users, ChevronRight, CheckCircle, Loader2, AlertCircle, X } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type DatePrice = { date: string; price: number | false };

type AvailableRoom = {
  room_id: string;
  room_name: string;
  room_description: string;
  date: DatePrice[];
  image_fullpath: string[];
};

type AvailabilityResponse = {
  days: AvailableRoom[];
  name: string;
  payment_gateway: { status: boolean; currency: string };
};

type Step = 'dates' | 'rooms' | 'guest' | 'confirm' | 'done';

type GuestForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_code: string;
  notes: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(d: Date) {
  return d.toISOString().split('T')[0];
}

function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function getDatesInRange(start: string, end: string): string[] {
  const dates: string[] = [];
  let cur = new Date(start);
  const last = new Date(end);
  while (cur < last) {
    dates.push(formatDate(cur));
    cur = addDays(cur, 1);
  }
  return dates;
}

function nightLabel(n: number) {
  return `${n} night${n !== 1 ? 's' : ''}`;
}

function currencySymbol(code: string) {
  return new Intl.NumberFormat('en', { style: 'currency', currency: code || 'USD', minimumFractionDigits: 0 })
    .format(0)
    .replace(/\d/g, '')
    .trim();
}

function formatPrice(amount: number, currency: string) {
  // HostelMate uses minor units (cents/fils) — divide by 100
  return new Intl.NumberFormat('en', { style: 'currency', currency: currency || 'USD' }).format(amount / 100);
}

// ─── Step indicator ──────────────────────────────────────────────────────────

const STEPS: { id: Step; label: string }[] = [
  { id: 'dates', label: 'Dates' },
  { id: 'rooms', label: 'Room' },
  { id: 'guest', label: 'Your Info' },
  { id: 'confirm', label: 'Confirm' },
];

function StepBar({ current }: { current: Step }) {
  const idx = STEPS.findIndex((s) => s.id === current);
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  done
                    ? 'bg-green-500 text-white'
                    : active
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {done ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${active ? 'text-primary' : done ? 'text-green-600' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`mb-4 h-0.5 w-8 sm:w-12 mx-1 transition-colors ${done ? 'bg-green-400' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function ReservePage() {
  const today = formatDate(new Date());
  const tomorrow = formatDate(addDays(new Date(), 1));

  const [step, setStep] = useState<Step>('dates');
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);

  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoom | null>(null);

  const [guest, setGuest] = useState<GuestForm>({
    first_name: '', last_name: '', email: '', phone: '', country_code: '', notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ bookingId: string; total: number; currency: string } | null>(null);

  // Derived
  const nights = getDatesInRange(checkIn, checkOut);
  const currency = availability?.payment_gateway?.currency || 'usd';

  const roomTotal = selectedRoom
    ? selectedRoom.date.reduce((sum, d) => sum + (typeof d.price === 'number' ? d.price : 0), 0)
    : 0;

  // ── Step 1: check availability ─────────────────────────────────────────────
  const handleCheckAvailability = useCallback(async () => {
    if (checkIn >= checkOut) {
      setError('Check-out must be after check-in.');
      return;
    }
    setError(null);
    setLoading(true);
    setAvailability(null);
    setSelectedRoom(null);

    try {
      const res = await fetch('/api/hostelmate/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dates: nights }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not fetch availability.');

      // Only keep rooms where ALL selected nights have a valid price
      const available = (data.days as AvailableRoom[]).filter((room) =>
        room.date.every((d) => typeof d.price === 'number' && d.price > 0)
      );

      setAvailability({ ...data, days: available });
      setStep('rooms');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [checkIn, checkOut, nights]);

  // ── Step 3: submit booking ─────────────────────────────────────────────────
  const handleBook = useCallback(async () => {
    if (!selectedRoom) return;
    setError(null);
    setLoading(true);

    try {
      const bookingDates = selectedRoom.date.map((d) => ({
        date: d.date,
        amount: typeof d.price === 'number' ? d.price : 0,
      }));

      const res = await fetch('/api/hostelmate/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: selectedRoom.room_id,
          dates: bookingDates,
          guest: {
            first_name: guest.first_name,
            last_name: guest.last_name,
            email: guest.email,
            ...(guest.phone ? { phone: guest.phone } : {}),
            ...(guest.country_code ? { country_code: guest.country_code.toUpperCase() } : {}),
          },
          ...(guest.notes ? { notes: guest.notes } : {}),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const msg =
          data.code === 'availability_conflict'
            ? 'Sorry, this room was just taken. Please go back and choose another.'
            : data.error || 'Booking failed. Please try again.';
        throw new Error(msg);
      }

      setConfirmation({ bookingId: data.bookingId, total: data.total, currency });
      setStep('done');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [selectedRoom, guest, currency]);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-accent pb-20 pt-10 sm:pt-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* Breadcrumb */}
        <nav className="text-xs font-medium text-gray-500">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-primary">Reserve</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mt-6 text-center">
          <h1 className="font-heading text-3xl font-bold text-primary sm:text-4xl">Book Your Stay</h1>
          <p className="mt-2 text-gray-500">Live availability · Instant confirmation</p>
        </div>

        {/* Step bar */}
        {step !== 'done' && (
          <div className="mt-8 flex justify-center">
            <StepBar current={step} />
          </div>
        )}

        {/* Error banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span className="flex-1">{error}</span>
              <button onClick={() => setError(null)}><X size={16} /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── STEP: DATES ─────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {step === 'dates' && (
            <motion.div
              key="dates"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-8 rounded-2xl border border-white bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="font-heading text-lg font-bold text-primary">When are you arriving?</h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Check-in</span>
                  <div className="relative">
                    <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (e.target.value >= checkOut) setCheckOut(formatDate(addDays(new Date(e.target.value), 1)));
                      }}
                      className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Check-out</span>
                  <div className="relative">
                    <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      min={formatDate(addDays(new Date(checkIn), 1))}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </label>
              </div>

              {nights.length > 0 && (
                <p className="mt-3 text-sm text-gray-500">
                  <span className="font-semibold text-primary">{nightLabel(nights.length)}</span> selected
                </p>
              )}

              <button
                onClick={handleCheckAvailability}
                disabled={loading || nights.length === 0}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading font-semibold text-white shadow-md hover:bg-primary/90 disabled:opacity-60 transition-colors"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Users size={18} />}
                {loading ? 'Checking availability…' : 'Check Availability'}
              </button>
            </motion.div>
          )}

          {/* ── STEP: ROOMS ───────────────────────────────────────────────── */}
          {step === 'rooms' && availability && (
            <motion.div
              key="rooms"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-8 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-bold text-primary">
                  {availability.days.length === 0
                    ? 'No rooms available'
                    : `${availability.days.length} room${availability.days.length !== 1 ? 's' : ''} available`}
                </h2>
                <button
                  onClick={() => { setStep('dates'); setAvailability(null); }}
                  className="text-xs text-gray-500 underline hover:text-primary"
                >
                  ← Change dates
                </button>
              </div>

              {availability.days.length === 0 && (
                <div className="rounded-xl border border-accent bg-white p-6 text-center text-gray-500">
                  Sorry, no rooms are available for those dates. Try different dates.
                </div>
              )}

              {availability.days.map((room) => {
                const total = room.date.reduce((s, d) => s + (typeof d.price === 'number' ? d.price : 0), 0);
                const perNight = Math.round(total / nights.length);
                const image = room.image_fullpath[0];
                const isSelected = selectedRoom?.room_id === room.room_id;

                return (
                  <motion.div
                    key={room.room_id}
                    layout
                    className={`cursor-pointer overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition-all ${
                      isSelected ? 'border-primary' : 'border-transparent hover:border-gray-200'
                    }`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {image && (
                        <div className="relative h-44 sm:h-auto sm:w-48 shrink-0">
                          <Image src={image} alt={room.room_name} fill className="object-cover" sizes="192px" unoptimized />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-heading text-lg font-bold text-primary">{room.room_name}</h3>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-white">
                                <CheckCircle size={12} /> Selected
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{room.room_description}</p>
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-400">Per night</p>
                            <p className="font-heading text-xl font-bold text-primary">
                              {formatPrice(perNight, currency)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">{nightLabel(nights.length)} total</p>
                            <p className="text-sm font-semibold text-gray-700">{formatPrice(total, currency)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {selectedRoom && (
                <button
                  onClick={() => setStep('guest')}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading font-semibold text-white shadow-md hover:bg-primary/90 transition-colors"
                >
                  Continue with {selectedRoom.room_name} <ChevronRight size={18} />
                </button>
              )}
            </motion.div>
          )}

          {/* ── STEP: GUEST DETAILS ───────────────────────────────────────── */}
          {step === 'guest' && (
            <motion.div
              key="guest"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-8 rounded-2xl border border-white bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-bold text-primary">Your details</h2>
                <button onClick={() => setStep('rooms')} className="text-xs text-gray-500 underline hover:text-primary">
                  ← Back
                </button>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { key: 'first_name', label: 'First name', required: true, placeholder: 'John' },
                  { key: 'last_name', label: 'Last name', required: true, placeholder: 'Doe' },
                ].map(({ key, label, required, placeholder }) => (
                  <label key={key} className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {label} {required && <span className="text-red-400">*</span>}
                    </span>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={guest[key as keyof GuestForm]}
                      onChange={(e) => setGuest((g) => ({ ...g, [key]: e.target.value }))}
                      className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </label>
                ))}

                <label className="flex flex-col gap-1.5 sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Email <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={guest.email}
                    onChange={(e) => setGuest((g) => ({ ...g, email: e.target.value }))}
                    className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Phone</span>
                  <input
                    type="tel"
                    placeholder="+977 9800000000"
                    value={guest.phone}
                    onChange={(e) => setGuest((g) => ({ ...g, phone: e.target.value }))}
                    className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Country code</span>
                  <input
                    type="text"
                    maxLength={2}
                    placeholder="NP"
                    value={guest.country_code}
                    onChange={(e) => setGuest((g) => ({ ...g, country_code: e.target.value.toUpperCase() }))}
                    className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm uppercase focus:border-primary focus:outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1.5 sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Notes / special requests</span>
                  <textarea
                    rows={3}
                    placeholder="Late arrival, dietary preferences, celebrating something…"
                    value={guest.notes}
                    onChange={(e) => setGuest((g) => ({ ...g, notes: e.target.value }))}
                    className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:outline-none resize-none"
                  />
                </label>
              </div>

              <button
                onClick={() => {
                  if (!guest.first_name || !guest.last_name || !guest.email) {
                    setError('Please fill in your first name, last name, and email.');
                    return;
                  }
                  setError(null);
                  setStep('confirm');
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading font-semibold text-white shadow-md hover:bg-primary/90 transition-colors"
              >
                Review booking <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {/* ── STEP: CONFIRM ─────────────────────────────────────────────── */}
          {step === 'confirm' && selectedRoom && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-8 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-bold text-primary">Review your booking</h2>
                <button onClick={() => setStep('guest')} className="text-xs text-gray-500 underline hover:text-primary">
                  ← Edit details
                </button>
              </div>

              {/* Summary card */}
              <div className="rounded-2xl border border-accent bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-3 border-b border-accent pb-4">
                  {selectedRoom.image_fullpath[0] && (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={selectedRoom.image_fullpath[0]} alt={selectedRoom.room_name} fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <div>
                    <p className="font-heading font-bold text-primary">{selectedRoom.room_name}</p>
                    <p className="text-xs text-gray-500">Lazy Lads Backpackers Hostel, Pokhara</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Check-in</p>
                    <p className="font-semibold text-primary">{checkIn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Check-out</p>
                    <p className="font-semibold text-primary">{checkOut}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Duration</p>
                    <p className="font-semibold text-primary">{nightLabel(nights.length)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Guest</p>
                    <p className="font-semibold text-primary">{guest.first_name} {guest.last_name}</p>
                  </div>
                </div>

                {/* Nightly breakdown */}
                <div className="border-t border-accent pt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Nightly breakdown</p>
                  {selectedRoom.date.map((d) => (
                    <div key={d.date} className="flex justify-between py-0.5 text-sm">
                      <span className="text-gray-600">{d.date}</span>
                      <span className="font-medium text-primary">
                        {typeof d.price === 'number' ? formatPrice(d.price, currency) : '—'}
                      </span>
                    </div>
                  ))}
                  <div className="mt-3 flex justify-between border-t border-accent pt-3 text-sm font-bold text-primary">
                    <span>Total</span>
                    <span className="text-lg">{formatPrice(roomTotal, currency)}</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-gray-400">
                Payment is collected on arrival. Cancellation policy applies.
              </p>

              <button
                onClick={handleBook}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading font-semibold text-white shadow-md hover:bg-primary/90 disabled:opacity-60 transition-colors"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                {loading ? 'Confirming booking…' : 'Confirm Booking'}
              </button>
            </motion.div>
          )}

          {/* ── STEP: DONE ────────────────────────────────────────────────── */}
          {step === 'done' && confirmation && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm"
            >
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <CheckCircle size={36} className="text-green-500" />
                </div>
              </div>
              <h2 className="mt-4 font-heading text-2xl font-bold text-primary">Booking Confirmed!</h2>
              <p className="mt-2 text-gray-500">
                Thank you, {guest.first_name}. Your reservation is confirmed. We will send details to{' '}
                <span className="font-semibold text-primary">{guest.email}</span>.
              </p>

              <div className="mt-6 rounded-xl bg-accent p-4 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Booking ID</span>
                  <span className="font-mono font-semibold text-primary text-xs">{confirmation.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Room</span>
                  <span className="font-semibold text-primary">{selectedRoom?.room_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-in</span>
                  <span className="font-semibold text-primary">{checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-out</span>
                  <span className="font-semibold text-primary">{checkOut}</span>
                </div>
                <div className="flex justify-between border-t border-accent pt-2">
                  <span className="font-semibold text-gray-700">Total</span>
                  <span className="font-bold text-primary">{formatPrice(confirmation.total, confirmation.currency)}</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Show this page or your email confirmation at check-in. Check-in starts at 2:00 PM.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/" className="rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-accent transition-colors">
                  Back to home
                </Link>
                <Link href="/#adventures" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
                  Browse adventures
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
