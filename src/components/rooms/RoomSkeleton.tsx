'use client';

import { motion } from 'framer-motion';

interface RoomSkeletonProps {
  index?: number;
}

export function RoomSkeleton({ index = 0 }: RoomSkeletonProps) {
  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-accent bg-white shadow-sm"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="h-52 animate-pulse bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />
        <div className="mt-2 flex gap-2">
          {[12, 10, 14].map((w) => (
            <div key={w} className="h-6 w-16 animate-pulse rounded bg-gray-100" />
          ))}
        </div>
        <div className="mt-3 h-6 w-1/3 animate-pulse rounded bg-gray-100" />
        <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-100" />
      </div>
    </motion.div>
  );
}
