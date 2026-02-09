// frontend/src/components/dashboard/TaskStats.tsx
'use client';

import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Task } from '@/types/api-types';

interface TaskStatsProps {
  tasks: Task[];
  loading?: boolean;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  accentColor: string;
  loading?: boolean;
  index?: number;
}

// Animated counter component
const AnimatedCounter = ({ value }: { value: number }) => {
  const spring = useSpring(0, { duration: 1500, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current));
  
  React.useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  
  return <motion.span>{display}</motion.span>;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, bgColor, accentColor, loading, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className={`relative overflow-hidden rounded-xl ${bgColor} backdrop-blur-sm border border-slate-700/40 p-5 cursor-pointer group`}
    >
      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor}`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={`flex justify-center items-center rounded-lg w-10 h-10 bg-slate-800/80 border border-slate-700/50 transition-transform duration-200 group-hover:scale-110`}>
            {icon}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-500 font-medium">Live</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="font-bold tabular-nums text-white text-2xl tracking-tight">
            {loading ? (
              <motion.div 
                className="bg-slate-700/50 rounded-lg w-14 h-8"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ) : (
              <AnimatedCounter value={value} />
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const TaskStats: React.FC<TaskStatsProps> = ({ tasks, loading = false }) => {
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Define icons for each stat
  const totalIcon = (
    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );

  const completedIcon = (
    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const pendingIcon = (
    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const completionIcon = (
    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  return (
    <div className="gap-4 grid grid-cols-2 lg:grid-cols-4 mb-10">
      <StatCard
        title="Total Tasks"
        value={totalTasks}
        icon={totalIcon}
        color="from-indigo-500/10 to-indigo-600/10"
        bgColor="bg-slate-900/60"
        accentColor="bg-indigo-400"
        loading={loading}
        index={0}
      />
      
      <StatCard
        title="Completed"
        value={completedTasks}
        icon={completedIcon}
        color="from-emerald-500/10 to-emerald-600/10"
        bgColor="bg-slate-900/60"
        accentColor="bg-emerald-400"
        loading={loading}
        index={1}
      />
      
      <StatCard
        title="Pending"
        value={pendingTasks}
        icon={pendingIcon}
        color="from-amber-500/10 to-amber-600/10"
        bgColor="bg-slate-900/60"
        accentColor="bg-amber-400"
        loading={loading}
        index={2}
      />
      
      <StatCard
        title="Success Rate"
        value={completionRate}
        icon={completionIcon}
        color="from-violet-500/10 to-violet-600/10"
        bgColor="bg-slate-900/60"
        accentColor="bg-violet-400"
        loading={loading}
        index={3}
      />
    </div>
  );
};

export default TaskStats;
