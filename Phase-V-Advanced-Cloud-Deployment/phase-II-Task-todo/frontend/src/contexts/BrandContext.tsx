'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BrandContextType {
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function useBrand() {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
}

interface BrandProviderProps {
  children: ReactNode;
}

export function BrandProvider({ children }: BrandProviderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll-based tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const value = {
    scrollProgress,
    setScrollProgress
  };

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
}