'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useState } from 'react';

export default function UserAuthStatus() {
  const { data: session, isPending } = authClient.useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isPending) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
        <div className="w-16 h-4 bg-white/20 rounded animate-pulse"></div>
      </div>
    );
  }

  if (session) {
    const userInitial = session.user?.email?.[0]?.toUpperCase() || session.user?.name?.[0]?.toUpperCase() || 'U';
    
    return (
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center space-x-3 group"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm text-gray-300">Welcome</p>
            <p className="text-sm font-medium text-white">
              {session.user?.name || session.user?.email}
            </p>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
              <span className="text-white font-semibold">{userInitial}</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50">
            <div className="p-3 border-b border-white/10">
              <p className="text-sm font-medium text-white truncate">
                {session.user?.name || session.user?.email}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {session.user?.email}
              </p>
            </div>
            <div className="p-1">
              <Link
                href="/tasks"
                className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My Tasks
              </Link>
              <Link
                href="/profile"
                className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile Settings
              </Link>
              <button
                onClick={() => {
                  authClient.signOut();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <Link
        href="/auth/login"
        className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="/auth/register"
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
      >
        Get started
      </Link>
    </div>
  );
}
