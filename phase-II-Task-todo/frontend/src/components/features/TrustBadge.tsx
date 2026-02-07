// frontend/src/components/features/TrustBadge.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animations';

interface TrustBadgeProps {
  children: React.ReactNode;
  type?: 'ssl' | 'gdpr' | 'compliance' | 'award';
  label?: string;
  variant?: 'default' | 'pulse';
}

const TRUST_CONFIGS = {
  ssl: {
    icon: '🔒',
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-500/10 to-green-600/20',
    label: 'SSL Secured',
  },
  gdpr: {
    icon: '🛡️',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-500/10 to-blue-600/20',
    label: 'GDPR Compliant',
  },
  compliance: {
    icon: '✓',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-500/10 to-purple-600/20',
    label: 'SOC 2 Compliant',
  },
  award: {
    icon: '🏆️',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'from-yellow-500/10 to-yellow-600/20',
    label: 'Award Winning',
  },
};

export default function TrustBadge({ 
  children, 
  type = 'ssl',
  label,
  variant = 'default' 
}: TrustBadgeProps) {
  const config = TRUST_CONFIGS[type];
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <AnimatedSection>
      <motion.div
        className={`relative inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bgColor} border border-white/20 transition-all duration-300 ${
          variant === 'pulse' ? 'animate-pulse' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`w-5 h-5 rounded-full ${config.color} transition-all duration-300`}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0],
          }}
          transition={{ duration: 1, repeat: variant === 'pulse' ? 2 : 0, ease: 'easeInOut' }}
        >
          {config.icon}
        </motion.div>
        <div className="relative">
          {children}
          {label && (
            <span className="text-xs text-white font-medium ml-2">
              {label}
            </span>
          )}
        </div>
      </motion.div>
    </AnimatedSection>
  );
}