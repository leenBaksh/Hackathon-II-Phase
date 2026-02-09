'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SkeletonCard, SkeletonStats, SkeletonWelcome, SkeletonText } from '@/components/ui/Skeleton';

interface LoadingStateProps {
  children: React.ReactNode;
  isLoading?: boolean;
  delay?: number;
  type?: 'card' | 'stats' | 'welcome' | 'text';
  count?: number;
}

export default function LoadingState({ 
  children, 
  isLoading = false, 
  delay = 200,
  type = 'card',
  count = 1
}: LoadingStateProps) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowLoading(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [isLoading, delay]);

  if (!isLoading || !showLoading) {
    return <>{children}</>;
  }

  const renderSkeleton = () => {
    switch (type) {
      case 'stats':
        return <SkeletonStats />;
      case 'welcome':
        return <SkeletonWelcome />;
      case 'text':
        return <SkeletonText lines={count} />;
      default:
        return <SkeletonCard count={count} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {renderSkeleton()}
    </motion.div>
  );
}

// Re-export SkeletonText for convenience
export { SkeletonText } from '@/components/ui/Skeleton';