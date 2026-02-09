'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';

export default function AppAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
