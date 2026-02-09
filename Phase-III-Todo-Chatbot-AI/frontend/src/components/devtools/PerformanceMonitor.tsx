// frontend/src/components/devtools/PerformanceMonitor.tsx
'use client';

import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  renderTime: number;
  components: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 0,
    renderTime: 0,
    components: 0
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let fpsInterval: number;

    const calculateFPS = (currentTime: number) => {
      frameCount++;
      const delta = currentTime - lastTime;
      
      if (delta >= 1000) {
        const fps = Math.round((frameCount * 1000) / delta);
        setMetrics(prev => ({ ...prev, fps }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      fpsInterval = requestAnimationFrame(calculateFPS);
    };

    fpsInterval = requestAnimationFrame(calculateFPS);

    // Monitor memory usage
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        setMetrics(prev => ({ ...prev, memory: usedMB }));
      }
    };

    const memoryInterval = setInterval(monitorMemory, 2000);

    return () => {
      cancelAnimationFrame(fpsInterval);
      clearInterval(memoryInterval);
    };
  }, []);

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'bg-green-400';
    if (fps >= 30) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const getMemoryColor = (memory: number) => {
    if (memory < 50) return 'bg-green-400';
    if (memory < 100) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="fixed top-4 left-4 z-50 bg-slate-900/90 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-xs">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">FPS:</span>
          <div className={`w-2 h-2 rounded-full ${getFPSColor(metrics.fps)} animate-pulse`} />
          <span className="text-white font-mono">{metrics.fps}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Memory:</span>
          <div className={`w-2 h-2 rounded-full ${getMemoryColor(metrics.memory)}`} />
          <span className="text-white font-mono">{metrics.memory}MB</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Render:</span>
          <span className="text-white font-mono">{metrics.renderTime}ms</span>
        </div>
      </div>
    </div>
  );
}