// frontend/src/components/analytics/CustomChart.tsx
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ChartDataPoint {
  label: string;
  value: number;
  date?: string;
  category?: string;
}

interface CustomBarChartProps {
  data: ChartDataPoint[];
  title: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showLabels?: boolean;
}

export function CustomBarChart({ 
  data, 
  title, 
  color = 'from-blue-500 to-purple-600', 
  height = 300,
  showGrid = true,
  showLabels = true
}: CustomBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="relative" style={{ height: `${height}px` }}>
        {/* Grid lines */}
        {showGrid && (
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full border-b border-white/10" />
            ))}
          </div>
        )}
        
        {/* Bars */}
        <div className="relative h-full flex items-end justify-around gap-2">
          {data.map((point, index) => {
            const barHeight = (point.value / maxValue) * (height - 40);
            return (
              <motion.div
                key={point.label}
                className="relative flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 + index * 0.05,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className={`w-full bg-gradient-to-t ${color} rounded-t-lg relative cursor-pointer`}
                  style={{ height: `${barHeight}px` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {point.value}
                  </div>
                </motion.div>
                {showLabels && (
                  <div className="absolute bottom-0 left-0 right-0 text-center">
                    <span className="text-xs text-gray-400 mt-2">{point.label}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500">
          {[...Array(5)].map((_, i) => {
            const value = Math.round((maxValue / 4) * (4 - i));
            return <span key={i}>{value}</span>;
          })}
        </div>
      </div>
    </motion.div>
  );
}

interface CustomLineChartProps {
  data: ChartDataPoint[];
  title: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
}

export function CustomLineChart({ 
  data, 
  title, 
  color = 'from-blue-500 to-purple-600', 
  height = 300,
  showGrid = true
}: CustomLineChartProps) {
  const points = useMemo(() => {
    const maxValue = Math.max(...data.map(d => d.value));
    return data.map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (point.value / maxValue) * 100;
      return { x, y, value: point.value, label: point.label };
    });
  }, [data]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="relative" style={{ height: `${height}px` }}>
        {/* Grid lines */}
        {showGrid && (
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full border-b border-white/10" />
            ))}
          </div>
        )}
        
        {/* Line chart */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {/* Line */}
          <motion.path
            d={`M ${points.map(p => `${p.x}%,${p.y}%`).join(' L ')}`}
            stroke={`url(#gradient-${title.replace(/\s+/g, '')})`}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <motion.g key={index}>
              <motion.circle
                cx={`${point.x}%`}
                cy={`${point.y}%`}
                r="5"
                fill="white"
                stroke="rgb(59, 130, 246)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.3 }}
                style={{ transformOrigin: `${point.x}% ${point.y}%` }}
              />
              <motion.circle
                cx={`${point.x}%`}
                cy={`${point.y}%`}
                r="8"
                fill="rgba(59, 130, 246, 0.2)"
                stroke="none"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              />
              <motion.text
                x={`${point.x}%`}
                y={`${point.y - 15}%`}
                textAnchor="middle"
                className="text-xs text-gray-400 fill-current"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              >
                {point.value}
              </motion.text>
            </motion.g>
          ))}
        </svg>
      </div>
    </motion.div>
  );
}

interface CustomPieChartProps {
  data: ChartDataPoint[];
  title: string;
  colors?: string[];
}

export function CustomPieChart({ data, title, colors = [] }: CustomPieChartProps) {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);
  
  const defaultColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
  ];

  const segments = useMemo(() => {
    let currentAngle = -90;
    return data.map((segment, index) => {
      const percentage = (segment.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const endAngle = currentAngle + angle;
      
      const result = {
        ...segment,
        percentage,
        startAngle: currentAngle,
        endAngle,
        color: colors[index] || defaultColors[index] || defaultColors[0]
      };
      
      currentAngle = endAngle;
      return result;
    });
  }, [data, total, colors]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            {segments.map((segment, index) => {
              const radius = 80;
              const innerRadius = 40;
              const x = 96;
              const y = 96;
              
              const startX = x + innerRadius * Math.cos((segment.startAngle * Math.PI) / 180);
              const startY = y + innerRadius * Math.sin((segment.startAngle * Math.PI) / 180);
              const endX = x + innerRadius * Math.cos((segment.endAngle * Math.PI) / 180);
              const endY = y + innerRadius * Math.sin((segment.endAngle * Math.PI) / 180);
              
              const outerStartX = x + radius * Math.cos((segment.startAngle * Math.PI) / 180);
              const outerStartY = y + radius * Math.sin((segment.startAngle * Math.PI) / 180);
              const outerEndX = x + radius * Math.cos((segment.endAngle * Math.PI) / 180);
              const outerEndY = y + radius * Math.sin((segment.endAngle * Math.PI) / 180);
              
              const largeArcFlag = (segment.endAngle - segment.startAngle) > 180 ? 1 : 0;
              
              return (
                <g key={index}>
                  {/* Outer segment */}
                  <motion.path
                    d={`M ${outerStartX} ${outerStartY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY} L ${endX} ${endY} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startX} ${startY} Z`}
                    className={`bg-gradient-to-br ${segment.color}`}
                    fill="url(#pieGradient${index})"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id={`pieGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                    </linearGradient>
                  </defs>
                </g>
              );
            })}
          </svg>
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{data.length}</div>
              <div className="text-xs text-gray-400">Categories</div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="ml-8 space-y-2">
          {segments.map((segment, index) => (
            <motion.div
              key={segment.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className={`w-4 h-4 rounded bg-gradient-to-br ${segment.color}`} />
              <div>
                <div className="text-sm text-white">{segment.label}</div>
                <div className="text-xs text-gray-400">{segment.percentage.toFixed(1)}%</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}