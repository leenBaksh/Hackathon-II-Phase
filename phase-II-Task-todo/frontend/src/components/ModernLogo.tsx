'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  isHovered?: boolean;
  isScrolled?: boolean;
}

export default function ModernLogo({ 
  size = 'md', 
  showText = true, 
  className = '', 
  isHovered = false, 
  isScrolled = false
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  return (
    <motion.div
      className={`inline-flex items-center gap-3 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* AuraFlow Logo Icon */}
      <motion.div
        className={`${sizeClasses[size]} relative`}
        whileHover={{
          rotate: 5,
          transition: { duration: 0.3 }
        }}
      >
        {/* Background gradient */}
        <motion.div 
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, #c084fc, #ec4899)'
          }}
        ></motion.div>
        
        {/* AuraFlow Icon */}
        <svg
          className="absolute inset-1 w-full h-full"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Central hub */}
            <circle cx="20" cy="20" r="3" fill="white" opacity="0.9" />
            
            {/* Connected nodes */}
            <circle cx="10" cy="15" r="2" fill="white" opacity="0.7" />
            <circle cx="30" cy="15" r="2" fill="white" opacity="0.7" />
            <circle cx="10" cy="25" r="2" fill="white" opacity="0.7" />
            <circle cx="30" cy="25" r="2" fill="white" opacity="0.7" />
            
            {/* Connection lines */}
            <line x1="20" y1="20" x2="10" y2="15" stroke="white" strokeWidth="1.5" opacity="0.5" />
            <line x1="20" y1="20" x2="30" y2="15" stroke="white" strokeWidth="1.5" opacity="0.5" />
            <line x1="20" y1="20" x2="10" y2="25" stroke="white" strokeWidth="1.5" opacity="0.5" />
            <line x1="20" y1="20" x2="30" y2="25" stroke="white" strokeWidth="1.5" opacity="0.5" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Brand Name */}
      {showText && (
        <div className="flex flex-col">
          <motion.span 
            className={`font-bold ${textSizeClasses[size]} leading-tight tracking-wide`}
            style={{
              background: 'linear-gradient(to right, #c084fc, #ec4899, #8b5cf6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            AuraFlow
          </motion.span>
          <motion.span 
            className={`text-[10px] tracking-[0.2em] uppercase ${textSizeClasses[size]}`}
            animate={{ 
              color: '#9ca3af',
              opacity: [1, 0.3, 1]
            }}
            transition={{ duration: 0.4 }}
          >
            Flow Through Tasks
          </motion.span>
        </div>
      )}
    </motion.div>
  );
}
