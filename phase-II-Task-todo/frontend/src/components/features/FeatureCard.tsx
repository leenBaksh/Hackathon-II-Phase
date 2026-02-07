// frontend/src/components/features/FeatureCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animations';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  color?: string;
  comingSoon?: boolean;
}

export default function FeatureCard({ 
  icon, 
  title, 
  description, 
  benefits, 
  color = 'from-blue-500 to-purple-600',
  comingSoon = false
}: FeatureCardProps) {
  return (
    <AnimatedSection className="group relative">
      <motion.div 
        className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 overflow-hidden transition-all duration-300 ${
          comingSoon ? 'opacity-60' : 'hover:scale-105 hover:border-white/30 hover:shadow-xl hover:shadow-white/20'
        }`}
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Background gradient effect */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-500`}
          animate={comingSoon ? { opacity: 0.1 } : { opacity: 0.8 }}
          style={{ 
            backgroundSize: '200% 200%',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Icon */}
        <motion.div 
          className="relative z-10 mb-6"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
        >
          <div className={`w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center ${color}`}>
            {icon}
          </div>
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10">
          <motion.h3 
            className="text-2xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-300 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {description}
          </motion.p>
          
          {/* Coming Soon Badge */}
          {comingSoon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-4 right-4"
            >
              <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full text-xs font-bold">
                Coming Soon
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Benefits List */}
        {benefits.length > 0 && (
          <motion.ul 
            className="space-y-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, staggerChildren: 0.1 }}
          >
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m0 0l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <span className="text-white font-medium text-sm">{benefit}</span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
        
        {/* Interactive Elements */}
        <motion.div 
          className="mt-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button
            className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium transition-all duration-200 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {comingSoon ? 'Learn More' : 'Get Started'}
          </motion.button>
          
          <motion.button
            className="p-3 rounded-full border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l7 7m-7 7h-14" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}