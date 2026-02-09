// frontend/src/components/ui/Progress.tsx
import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'blue' | 'green' | 'orange' | 'purple';
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'blue',
  showPercentage = true,
  size = 'md',
  className = '',
  animated = true
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Define color classes
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      glow: 'shadow-blue-500/50',
      text: 'text-blue-400'
    },
    green: {
      bg: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      glow: 'shadow-green-500/50',
      text: 'text-green-400'
    },
    orange: {
      bg: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600',
      glow: 'shadow-orange-500/50',
      text: 'text-orange-400'
    },
    purple: {
      bg: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      glow: 'shadow-purple-500/50',
      text: 'text-purple-400'
    }
  };

  // Define size classes
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const selectedColor = colorClasses[color];
  const selectedSize = sizeClasses[size];

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Progress bar container */}
      <div className={`relative ${selectedSize} w-full bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/10`}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-700/20"></div>
        
        {/* Progress fill */}
        <div
          className={`relative h-full bg-gradient-to-r ${selectedColor.gradient} rounded-full transition-all duration-500 ease-out ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ width: `${percentage}%` }}
        >
          {/* Inner glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${selectedColor.gradient} opacity-50 blur-sm`}></div>
          
          {/* Shimmer effect */}
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
          )}
        </div>
        
        {/* End cap glow */}
        {percentage > 0 && (
          <div 
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 ${selectedColor.bg} rounded-full shadow-lg ${selectedColor.glow} animate-pulse`}
          ></div>
        )}
      </div>
      
      {/* Percentage display */}
      {showPercentage && (
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium ${selectedColor.text}`}>
            {Math.round(percentage)}% Complete
          </span>
          <span className="text-sm text-gray-400">
            {value} / {max}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;