'use client';

import { useState } from 'react';
import ModernLogo from '@/components/ModernLogo';

export default function LogoTransitionDemo() {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          TaskFlow → AuraFlow Logo Transition Demo
        </h1>
        
        {/* Logo Preview Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Interactive Logo Preview
          </h2>
          
          <div className="flex justify-center mb-8">
            <div 
              className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-600"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ModernLogo 
                size="xl" 
                showText={true} 
                isHovered={isHovered}
                isScrolled={isScrolled}
              />
            </div>
          </div>
          
          <p className="text-center text-gray-600 dark:text-gray-400">
            Hover over the logo to see the TaskFlow → AuraFlow transition
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Manual Controls
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hover State
              </label>
              <button
                onClick={() => setIsHovered(!isHovered)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isHovered 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isHovered ? 'AuraFlow' : 'TaskFlow'}
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Scroll State
              </label>
              <button
                onClick={() => setIsScrolled(!isScrolled)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isScrolled 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isScrolled ? 'Scrolled' : 'Top'}
              </button>
            </div>
          </div>
        </div>

        {/* Size Variations */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Size Variations
          </h2>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="mb-2">
                <ModernLogo size="sm" showText={true} isHovered={isHovered} isScrolled={isScrolled} />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Small</span>
            </div>
            
            <div className="text-center">
              <div className="mb-2">
                <ModernLogo size="md" showText={true} isHovered={isHovered} isScrolled={isScrolled} />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Medium</span>
            </div>
            
            <div className="text-center">
              <div className="mb-2">
                <ModernLogo size="lg" showText={true} isHovered={isHovered} isScrolled={isScrolled} />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Large</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}