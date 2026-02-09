// frontend/src/components/analytics/AdvancedAnalytics.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Task } from '@/types/api-types';
import { CustomBarChart, CustomLineChart, CustomPieChart } from './CustomChart';
import { format, subDays, startOfDay, isAfter, isBefore } from 'date-fns';

interface AdvancedAnalyticsProps {
  tasks: Task[];
  className?: string;
}

interface TimeRange {
  label: string;
  start: Date;
  end: Date;
}

interface ProductivityMetric {
  date: string;
  tasksCompleted: number;
  productivityScore: number;
  focusTime?: number;
  interruptions?: number;
}

interface TaskAnalytics {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  averageCompletionTime: number;
  fastestCompletion: number;
  slowestCompletion: number;
  completionRate: number;
  tasksPerDay: number;
  mostProductiveDay: string;
  leastProductiveDay: string;
  categoryBreakdown: Array<{ category: string; count: number; percentage: number }>;
  priorityBreakdown: Array<{ priority: string; count: number; percentage: number }>;
  completionTrend: Array<{ date: string; count: number; rate: number }>;
  productivityScore: number;
}

const TIME_RANGES: TimeRange[] = [
  { label: 'Last 7 days', start: subDays(new Date(), 7), end: new Date() },
  { label: 'Last 30 days', start: subDays(new Date(), 30), end: new Date() },
  { label: 'Last 90 days', start: subDays(new Date(), 90), end: new Date() },
  { label: 'Last year', start: subDays(new Date(), 365), end: new Date() },
];

const PRIORITY_COLORS = {
  high: 'from-red-500 to-red-600',
  medium: 'from-orange-500 to-orange-600',
  low: 'from-green-500 to-green-600',
  none: 'from-gray-500 to-gray-600',
};

export default function AdvancedAnalytics({ tasks, className = '' }: AdvancedAnalyticsProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>(TIME_RANGES[0]);
  const [selectedMetric, setSelectedMetric] = useState<'trends' | 'categories' | 'priorities' | 'productivity'>('trends');

  const analytics = useMemo((): TaskAnalytics => {
    // Filter tasks by selected time range
    const filteredTasks = tasks.filter(task => {
      if (!task.created_at) return false;
      const taskDate = new Date(task.created_at);
      return taskDate >= selectedRange.start && taskDate <= selectedRange.end;
    });

    // Calculate completion time for completed tasks
    const completedTasks = filteredTasks.filter(task => task.completed && task.updated_at);
    const completionTimes = completedTasks.map(task => {
      const created = new Date(task.created_at);
      const completed = new Date(task.updated_at);
      return (completed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24); // in days
    });

    // Category breakdown
    const categoryMap = new Map<string, number>();
    filteredTasks.forEach(task => {
      const category = task.category || 'Uncategorized';
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });
    const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, count]) => ({
      category,
      count,
      percentage: (count / filteredTasks.length) * 100,
    }));

    // Priority breakdown
    const priorityMap = new Map<string, number>();
    filteredTasks.forEach(task => {
      const priority = task.priority || 'none';
      priorityMap.set(priority, (priorityMap.get(priority) || 0) + 1);
    });
    const priorityBreakdown = Array.from(priorityMap.entries()).map(([priority, count]) => ({
      priority,
      count,
      percentage: (count / filteredTasks.length) * 100,
    }));

    // Completion trend
    const completionTrend = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayStart = startOfDay(date);
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
      
      const dayTasks = filteredTasks.filter(task => {
        const taskDate = new Date(task.created_at);
        return taskDate >= dayStart && taskDate <= dayEnd;
      });
      
      const dayCompleted = dayTasks.filter(task => task.completed).length;
      completionTrend.push({
        date: format(date, 'MMM dd'),
        count: dayCompleted,
        rate: dayTasks.length > 0 ? (dayCompleted / dayTasks.length) * 100 : 0,
      });
    }

    // Productivity metrics
    const averageCompletionTime = completionTimes.length > 0 
      ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length 
      : 0;
    
    const fastestCompletion = completionTimes.length > 0 ? Math.min(...completionTimes) : 0;
    const slowestCompletion = completionTimes.length > 0 ? Math.max(...completionTimes) : 0;
    
    // Tasks per day
    const daysInRange = Math.ceil((selectedRange.end.getTime() - selectedRange.start.getTime()) / (1000 * 60 * 60 * 24));
    const tasksPerDay = daysInRange > 0 ? filteredTasks.length / daysInRange : 0;
    
    // Productivity score (0-100)
    const productivityScore = Math.min(100, Math.round(
      (filteredTasks.filter(t => t.completed).length / filteredTasks.length) * 50 + // 50% for completion rate
      (Math.max(0, 10 - averageCompletionTime)) * 5 + // 50% for quick completion
      Math.min(50, tasksPerDay * 10) // up to 50% for high volume
    ));

    // Most/least productive days
    const dailyCompletions = new Map<string, number>();
    completionTrend.forEach(day => {
      dailyCompletions.set(day.date, day.count);
    });
    
    const mostProductiveDay = Array.from(dailyCompletions.entries()).reduce((a, b) => 
      b[1] > a[1] ? b : a, ['', 0])[0];
    const leastProductiveDay = Array.from(dailyCompletions.entries()).reduce((a, b) => 
      b[1] < a[1] ? b : a, ['', Infinity])[0];

    return {
      totalTasks: filteredTasks.length,
      completedTasks: completedTasks.length,
      pendingTasks: filteredTasks.length - completedTasks.length,
      averageCompletionTime,
      fastestCompletion,
      slowestCompletion,
      completionRate: filteredTasks.length > 0 ? (completedTasks.length / filteredTasks.length) * 100 : 0,
      tasksPerDay,
      mostProductiveDay,
      leastProductiveDay,
      categoryBreakdown,
      priorityBreakdown,
      completionTrend,
      productivityScore,
    };
  }, [tasks, selectedRange]);

  const renderTrends = () => (
    <div className="space-y-6">
      <CustomLineChart
        data={analytics.completionTrend.map(t => ({ label: t.date, value: t.rate }))}
        title="Completion Rate Trend"
        color="from-green-500 to-emerald-600"
      />
      
      <CustomBarChart
        data={analytics.completionTrend.map(t => ({ label: t.date, value: t.count }))}
        title="Daily Task Completions"
        color="from-blue-500 to-purple-600"
        showGrid={true}
      />
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <CustomPieChart
        data={analytics.categoryBreakdown.map(c => ({ label: c.category, value: c.count }))}
        title="Task Categories"
        colors={['from-blue-500 to-blue-600', 'from-purple-500 to-purple-600', 'from-green-500 to-green-600', 'from-orange-500 to-orange-600', 'from-red-500 to-red-600']}
      />
      
      <CustomBarChart
        data={analytics.categoryBreakdown.map(c => ({ label: c.category, value: c.count }))}
        title="Tasks by Category"
        color="from-purple-500 to-pink-600"
        showLabels={true}
      />
    </div>
  );

  const renderPriorities = () => (
    <div className="space-y-6">
      <CustomPieChart
        data={analytics.priorityBreakdown.map(p => ({ label: p.priority.toUpperCase(), value: p.count }))}
        title="Priority Distribution"
        colors={Object.values(PRIORITY_COLORS)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analytics.priorityBreakdown.map(priority => (
          <motion.div
            key={priority.priority}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-white font-medium capitalize">{priority.priority}</span>
              <span className={`px-2 py-1 rounded text-white text-xs bg-gradient-to-r ${PRIORITY_COLORS[priority.priority as keyof typeof PRIORITY_COLORS]}`}>
                {priority.count}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mt-2">{priority.percentage.toFixed(1)}%</div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderProductivity = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Productivity Score */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h4 className="text-lg font-semibold text-white mb-4">Productivity Score</h4>
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-600/30"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - analytics.productivityScore / 100)}`}
              className="text-white"
              style={{
                transition: 'stroke-dashoffset 1s ease-in-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{analytics.productivityScore}</div>
              <div className="text-xs text-gray-400">Score</div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <div className={`text-lg font-semibold ${
            analytics.productivityScore >= 80 ? 'text-green-400' :
            analytics.productivityScore >= 60 ? 'text-yellow-400' :
            'text-red-400'
          }`}>
            {analytics.productivityScore >= 80 ? 'Excellent' :
             analytics.productivityScore >= 60 ? 'Good' :
             'Needs Improvement'}
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 space-y-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h4 className="text-lg font-semibold text-white mb-4">Key Metrics</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-400">Completion Rate</div>
            <div className="text-xl font-bold text-white">{analytics.completionRate.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Tasks/Day</div>
            <div className="text-xl font-bold text-white">{analytics.tasksPerDay.toFixed(1)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Avg Completion Time</div>
            <div className="text-xl font-bold text-white">{analytics.averageCompletionTime.toFixed(1)}d</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Most Productive</div>
            <div className="text-xl font-bold text-white text-sm">{analytics.mostProductiveDay || 'N/A'}</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Total Tasks</div>
              <div className="text-xl font-bold text-white">{analytics.totalTasks}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Completed</div>
              <div className="text-xl font-bold text-green-400">{analytics.completedTasks}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Pending</div>
              <div className="text-xl font-bold text-orange-400">{analytics.pendingTasks}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Fastest</div>
              <div className="text-xl font-bold text-blue-400">{analytics.fastestCompletion.toFixed(1)}d</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Advanced Analytics</h2>
          <p className="text-gray-400">Deep insights into your productivity patterns</p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {TIME_RANGES.map((range) => (
            <motion.button
              key={range.label}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedRange.label === range.label
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedRange(range)}
            >
              {range.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Metric Selector */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'trends', label: 'Trends', icon: '📈' },
          { key: 'categories', label: 'Categories', icon: '📂' },
          { key: 'priorities', label: 'Priorities', icon: '⚡' },
          { key: 'productivity', label: 'Productivity', icon: '🎯' },
        ].map((metric) => (
          <motion.button
            key={metric.key}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedMetric === metric.key
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedMetric(metric.key as any)}
          >
            <span>{metric.icon}</span>
            <span>{metric.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={selectedMetric}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {selectedMetric === 'trends' && renderTrends()}
        {selectedMetric === 'categories' && renderCategories()}
        {selectedMetric === 'priorities' && renderPriorities()}
        {selectedMetric === 'productivity' && renderProductivity()}
      </motion.div>
    </div>
  );
}