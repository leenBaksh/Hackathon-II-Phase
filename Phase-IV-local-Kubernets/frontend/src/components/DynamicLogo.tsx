'use client';

import ModernLogo from '@/components/ModernLogo';

interface DynamicLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  hoverEnabled?: boolean;
}

export default function DynamicLogo({ 
  size = 'md', 
  showText = true, 
  className = '',
  hoverEnabled = true
}: DynamicLogoProps) {
  return (
    <ModernLogo 
      size={size} 
      showText={showText} 
      className={className}
    />
  );
}