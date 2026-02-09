'use client';

import { useState, useEffect } from 'react';
import { authClient, signOut } from '@/lib/auth-client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ModernLogo from '@/components/ModernLogo';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { data: session, isPending } = authClient.useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      
      setIsScrolled(scrollY > 10);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigation = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Community', href: '/community' },
    { name: 'Docs', href: '/docs' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/leenBaksh',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sandaleen-waseem-a51200266/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm' 
        : 'bg-white dark:bg-slate-900 border-transparent'
    }`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-gray-400 hover:text-gray-500"
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
            
            <Link 
              href="/" 
              className="group flex items-center ml-2 md:ml-0"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <ModernLogo 
                size="md" 
                showText={true} 
                isHovered={isLogoHovered}
                isScrolled={isScrolled}
                className="group-hover:scale-105 transition-all duration-300 transform" 
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="group relative hover:bg-blue-50/50 dark:hover:bg-slate-800/50 px-4 py-2 rounded-full font-medium text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-300 text-sm transition-all duration-300"
                >
                  {item.name}
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
                  <span className="bottom-0 left-1/2 absolute bg-gradient-to-r from-blue-500 to-cyan-500 w-0 group-hover:w-6 h-0.5 transition-all -translate-x-1/2 duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side - User Actions */}
          <div className="flex items-center space-x-4">
            {/* Social Links */}
            <div className="flex items-center space-x-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center bg-gray-100 hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-blue-600 rounded-full w-9 h-9 text-gray-500 hover:text-white dark:text-gray-400 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {session ? (
              /* Authenticated User */
              <div className="relative">
                 <motion.button
                   onClick={() => setShowUserMenu(!showUserMenu)}
                   className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 p-2 rounded-lg transition-all duration-200"
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                 >
                  <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-600 shadow-sm rounded-full w-8 h-8">
                    <span className="font-medium text-white text-sm">
                      {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <svg className="hidden sm:block w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="right-0 z-50 absolute bg-white/95 dark:bg-slate-900/95 shadow-xl backdrop-blur-sm mt-2 py-1 border border-gray-200/50 dark:border-gray-700/50 rounded-lg w-48"
                    >
                    <div className="px-4 py-2 border-gray-200 dark:border-gray-700 border-b">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {session?.user?.name || 'User'}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                        {session?.user?.email || 'user@example.com'}
                      </p>
                    </div>
                    
                    <Link href="/dashboard" className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300 text-sm">
                      Dashboard
                    </Link>
                    <Link href="/tasks" className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300 text-sm">
                      Tasks
                    </Link>
                    <Link href="/settings" className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300 text-sm">
                      Settings
                    </Link>
                    
                    <div className="border-gray-200 dark:border-gray-700 border-t">
                      <button
                        onClick={handleSignOut}
                        className="block hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 w-full text-red-600 dark:text-red-400 text-sm text-left"
                      >
                        Sign Out
                      </button>
                     </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Guest User */
              <div className="flex items-center space-x-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/auth/login">
                      <button className="hidden sm:block hover:bg-blue-50 dark:hover:bg-slate-800 px-4 py-2 rounded-full font-medium text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-300 text-sm transition-all duration-300">
                        Sign In
                      </button>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/auth/register">
                      <button className="bg-gradient-to-r from-blue-500 hover:from-blue-600 via-cyan-500 hover:via-cyan-600 to-blue-600 hover:to-blue-700 shadow-blue-500/25 shadow-lg hover:shadow-blue-500/30 hover:shadow-xl px-5 py-2 rounded-full font-medium text-white text-sm transition-all duration-300">
                        Get Started
                      </button>
                    </Link>
                  </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-800 border-t overflow-hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block hover:bg-blue-50 dark:hover:bg-slate-800/50 px-3 py-2 rounded-lg font-medium text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-300 text-base transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile User Actions */}
              <div className="pt-3 border-gray-200 dark:border-gray-700 border-t">
                {session ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: navigation.length * 0.05 }}
                    className="space-y-1"
                  >
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:bg-blue-50 dark:hover:bg-slate-800/50 px-3 py-2 rounded-lg font-medium text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-300 text-base transition-all duration-200"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block hover:bg-blue-50 dark:hover:bg-slate-800/50 px-3 py-2 rounded-lg font-medium text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-300 text-base transition-all duration-200"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg w-full font-medium text-red-600 dark:text-red-400 text-base text-left transition-all duration-200"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: navigation.length * 0.05 }}
                    className="space-y-2"
                  >
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 font-medium text-gray-700 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-300 text-base text-center transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block bg-gradient-to-r from-blue-500 hover:from-blue-600 to-cyan-600 hover:to-cyan-700 px-4 py-2 rounded-lg font-medium text-white text-base text-center transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
