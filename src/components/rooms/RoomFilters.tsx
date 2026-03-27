'use client';

import { useCallback } from 'react';
import { Calendar, SlidersHorizontal, X } from 'lucide-react';

export interface RoomFilterValues {
  checkIn: string;
  checkOut: string;
  minPrice: number;
  maxPrice: number;
}

interface RoomFiltersProps {
  values: RoomFilterValues;
  priceFloor: number;
  priceCeiling: number;
  currency: string;
  onChange: (next: Partial<RoomFilterValues>) => void;
  onClear: () => void;
}

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Dual range slider ────────────────────────────────────────────────────────

interface DualRangeSliderProps {
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  currency: string;
  onChange: (min: number, max: number) => void;
}

function DualRangeSlider({ min, max, minVal, maxVal, currency, onChange }: DualRangeSliderProps) {
  const range = max - min || 1;
  const minPercent = ((minVal - min) / range) * 100;
  const maxPercent = ((maxVal - min) / range) * 100;

  return (
    <div>
      {/* Labels */}
      <div className="flex justify-between text-xs font-medium text-primary mb-3">
        <span>{formatPrice(minVal, currency)}</span>
        <span>{formatPrice(maxVal, currency)}</span>
      </div>

      {/* Track */}
      <div className="relative h-2">
        {/* Background track */}
        <div className="absolute inset-y-0 w-full rounded-full bg-gray-200" />

        {/* Selected range highlight */}
        <div
          className="absolute inset-y-0 rounded-full bg-primary"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />

        {/* Min thumb input */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), maxVal - 1);
            onChange(v, maxVal);
          }}
          className="dual-range-input absolute inset-0 w-full"
          style={{ zIndex: minVal > max - (range * 0.1) ? 5 : 3 }}
          aria-label="Minimum price"
        />

        {/* Max thumb input */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) => {
            const v = Math.max(Number(e.target.value), minVal + 1);
            onChange(minVal, v);
          }}
          className="dual-range-input absolute inset-0 w-full"
          style={{ zIndex: 4 }}
          aria-label="Maximum price"
        />
      </div>

      {/* Range labels */}
      <div className="flex justify-between text-[11px] text-gray-400 mt-2">
        <span>{formatPrice(min, currency)}</span>
        <span>{formatPrice(max, currency)}</span>
      </div>

      {/* Styles scoped to this component */}
      <style>{`
        .dual-range-input {
          appearance: none;
          -webkit-appearance: none;
          background: transparent;
          cursor: pointer;
          height: 100%;
          pointer-events: none;
        }
        .dual-range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: var(--color-primary, #1a1a1a);
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          pointer-events: all;
          cursor: pointer;
          transition: transform 0.15s;
        }
        .dual-range-input::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .dual-range-input::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: var(--color-primary, #1a1a1a);
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          pointer-events: all;
          cursor: pointer;
        }
        .dual-range-input::-webkit-slider-runnable-track,
        .dual-range-input::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}

// ─── Main filters component ───────────────────────────────────────────────────

export function RoomFilters({
  values,
  priceFloor,
  priceCeiling,
  currency,
  onChange,
  onClear,
}: RoomFiltersProps) {
  // Clamp stored price values to actual floor/ceiling once rooms load
  const effectiveMin = Math.max(values.minPrice, priceFloor);
  const effectiveMax = Math.min(values.maxPrice, priceCeiling);

  const hasActiveFilters =
    values.checkIn !== '' ||
    values.checkOut !== '' ||
    values.minPrice > priceFloor ||
    values.maxPrice < priceCeiling;

  // Ensure check-out is never before check-in
  const handleCheckInChange = useCallback(
    (date: string) => {
      onChange({ checkIn: date });
      if (values.checkOut && date >= values.checkOut) {
        // Push check-out 1 day ahead
        const next = new Date(date);
        next.setDate(next.getDate() + 1);
        onChange({ checkIn: date, checkOut: next.toISOString().split('T')[0] });
      }
    },
    [values.checkOut, onChange]
  );

  const today = new Date().toISOString().split('T')[0];
  const minCheckOut = values.checkIn
    ? (() => {
        const d = new Date(values.checkIn);
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
      })()
    : today;

  return (
    <div className="rounded-xl border border-accent bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <SlidersHorizontal size={16} className="text-primary" />
        <h2 className="font-heading text-sm font-bold text-primary uppercase tracking-wide">
          Filter Rooms
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors"
          >
            <X size={12} />
            Clear all
          </button>
        )}
      </div>

      {/* ── Date range ──────────────────────────────────────────────────── */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-1.5 mb-2">
          <Calendar size={14} className="text-gray-500" />
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Dates</p>
        </div>

        <div>
          <label htmlFor="filter-checkin" className="block text-xs text-gray-500 mb-1">
            Check-in
          </label>
          <input
            id="filter-checkin"
            type="date"
            min={today}
            value={values.checkIn}
            onChange={(e) => handleCheckInChange(e.target.value)}
            className="w-full rounded-lg border border-accent px-3 py-2 text-sm text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="filter-checkout" className="block text-xs text-gray-500 mb-1">
            Check-out
          </label>
          <input
            id="filter-checkout"
            type="date"
            min={minCheckOut}
            value={values.checkOut}
            onChange={(e) => onChange({ checkOut: e.target.value })}
            className="w-full rounded-lg border border-accent px-3 py-2 text-sm text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {values.checkIn && values.checkOut && (
          <p className="text-xs text-green-600 font-medium">
            {(() => {
              const nights = Math.round(
                (new Date(values.checkOut).getTime() - new Date(values.checkIn).getTime()) /
                  86_400_000
              );
              return `${nights} night${nights !== 1 ? 's' : ''}`;
            })()}
          </p>
        )}
      </div>

      {/* ── Price range ─────────────────────────────────────────────────── */}
      {priceCeiling > priceFloor && (
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">
            Price per night
          </p>
          <DualRangeSlider
            min={priceFloor}
            max={priceCeiling}
            minVal={effectiveMin}
            maxVal={effectiveMax}
            currency={currency}
            onChange={(min, max) => onChange({ minPrice: min, maxPrice: max })}
          />
        </div>
      )}
    </div>
  );
}
