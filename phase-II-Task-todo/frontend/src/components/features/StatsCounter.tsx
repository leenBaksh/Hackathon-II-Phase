// frontend/src/components/features/StatsCounter.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { AnimatedSection } from '@/components/animations';

interface StatsCounterProps {
  endValue: number;
  startValue?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function StatsCounter({ 
  endValue, 
  startValue = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  label = '',
  size = 'md',
  color = 'from-blue-500 to-purple-600'
}: StatsCounterProps) {
  const [displayValue, setDisplayValue] = useState(startValue);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Spring animation for smooth counting
  const counterSpring = useSpring({
    from: startValue,
    to: endValue,
    config: {
      duration: duration,
    tension: 80,
      friction: 30,
    precision: 0.1,
    clamp: true,
      mass: 0.1,
      velocity: 5
    },
  });

  useEffect(() => {
    setDisplayValue(counterSpring.value);
  }, [counterSpring]);

  useEffect(() => {
    if (displayValue >= endValue * 0.9 && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [displayValue, endValue, hasAnimated]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

  const sizeClasses = {
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <AnimatedSection>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Counter Display */}
        <div className={`text-center mb-2 ${label ? 'mb-4' : ''}`}>
          <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]} font-bold text-white ${color} tabular-nums`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-6xl font-bold text-white tabular-nums"
                initial={{ width: '0%', overflow: 'hidden' }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ duration: duration, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {Math.floor(displayValue)}
              </motion.div>
            </div>
            
            {/* Background glow effect */}
            <motion.div
              className={`absolute inset-0 ${color} opacity-20 blur-3xl rounded-full`}
              animate={{
                opacity: hasAnimated ? [0, 0.3, 0] : [0.2, 0, 0.2],
              scale: hasAnimated ? [1.1, 0.9] : [1, 0.9],
              duration: 1,
                repeat: hasAnimated ? 0 : 1,
              },
            }}
            />
          </div>
          <span className="relative z-10">
            {prefix}{Math.floor(displayValue)}{suffix}
          </span>
        </div>
        
        {/* Animated particles */}
        {isVisible && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{ 
                  scale: 0, 
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                opacity: 0,
                }}
                animate={{
                  scale: [0, 1, 1, 0],
                  opacity: [0, 1, 0, 0],
                  x: [
                    Math.random() * 100 + '%',
                    Math.random() * 100 + '%',
                    Math.random() * 100 + '%',
                    Math.random() * 100 + '%'
                  ],
                  transition: {
                    duration: 3,
                    repeat: 1,
                  },
                }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        )}
      </div>
      
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-gray-400 text-sm"
        >
          {label}
        </motion.p>
      )}
    </motion.div>
  );
}