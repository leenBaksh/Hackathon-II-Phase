// frontend/src/components/ui/Skeleton.tsx
'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function SkeletonCard({ className = '', count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden ${className}`}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.2,
            }}
          />
          
          {/* Skeleton content */}
          <div className="space-y-4 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 rounded bg-white/10" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-3/4 rounded bg-white/10" />
                <div className="h-4 w-full rounded bg-white/10" />
                <div className="h-4 w-2/3 rounded bg-white/10" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-20 rounded-full bg-white/10" />
              <div className="h-6 w-16 rounded-full bg-white/10" />
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

export function SkeletonStats({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ${className}`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.2,
            }}
          />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10" />
            <div className="space-y-2">
              <div className="h-6 w-12 rounded bg-white/10" />
              <div className="h-3 w-16 rounded bg-white/10" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function SkeletonWelcome({ className = '' }: { className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 mb-8 ${className}`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className="relative z-10 space-y-4">
        <div className="h-10 w-2/3 rounded bg-white/10" />
        <div className="h-4 w-1/3 rounded bg-white/10" />
        <div className="h-20 w-full rounded-xl bg-white/5" />
      </div>
    </motion.div>
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative h-4 rounded bg-white/10 overflow-hidden"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.2,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
