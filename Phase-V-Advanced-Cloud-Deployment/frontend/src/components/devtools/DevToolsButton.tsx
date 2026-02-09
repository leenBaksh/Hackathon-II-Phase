'use client';

import { ReactNode, useEffect, useState } from 'react';
import PerformanceMonitor from './PerformanceMonitor';
import ComponentTree from './ComponentTree';

interface DevToolsButtonProps {
  children: ReactNode;
}

export default function DevToolsButton({ children }: DevToolsButtonProps) {
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    // Check if DevTools is available
    const checkDevTools = () => {
      const devToolsAvailable = !!(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
      setIsDevMode(devToolsAvailable);
    };

    checkDevTools();
    const interval = setInterval(checkDevTools, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      {isDevMode && (
        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg">
          DevTools Active
        </div>
      )}
      
      <div className="flex items-center gap-2">
        {/* Hotkey hints */}
        <div className="bg-slate-800/80 backdrop-blur-sm border border-white/10 text-xs px-3 py-2 rounded-lg text-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Hotkeys:</span>
            <kbd className="bg-slate-700 px-1 rounded text-white">Alt+C</kbd>
            <span className="text-gray-400">Clear</span>
            <kbd className="bg-slate-700 px-1 rounded text-white">Alt+I</kbd>
            <span className="text-gray-400">Inspect</span>
          </div>
        </div>
        
        {/* Performance monitor */}
        <PerformanceMonitor />

        {/* Component Tree Toggle */}
        <button
          onClick={() => {
            const treePanel = document.getElementById('component-tree');
            if (treePanel) {
              treePanel.style.display = treePanel.style.display === 'none' ? 'block' : 'none';
            }
          }}
          className="bg-slate-800/80 backdrop-blur-sm border border-white/10 text-xs px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
          title="Toggle Component Tree"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6L8 8l2 2m0 0l2-2m-2 2l2 2m-2-2l2 2M3 10h.01M5 10h.01M7 10h.01M9 10h.01M11 10h.01M13 10h.01M15 10h.01M17 10h.01" />
          </svg>
          <span className="ml-2">Tree</span>
        </button>
        
        {/* Component Tree Panel */}
        <div id="component-tree" className="fixed top-20 right-4 z-50 hidden">
          <div className="bg-slate-900/90 backdrop-blur-sm border border-white/10 rounded-lg p-4 max-w-xs max-h-96 overflow-y-auto">
            <ComponentTree />
          </div>
        </div>
      </div>
      
      {/* {children} */}
    </div>
  );
}