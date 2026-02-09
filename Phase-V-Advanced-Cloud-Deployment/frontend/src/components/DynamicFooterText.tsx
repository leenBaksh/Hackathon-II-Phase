'use client';

import { motion } from 'framer-motion';

export default function DynamicFooterText() {
  return (
    <motion.p 
      className="text-gray-400 mb-6 max-w-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      AuraFlow: The modern way to achieve flow state, reduce stress, and maximize your potential. Built for teams that care about wellbeing.
    </motion.p>
  );
}