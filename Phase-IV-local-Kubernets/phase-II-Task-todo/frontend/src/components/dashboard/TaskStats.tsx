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
  loading?: boolean;
  index?: number;
}

// Animated counter component
const AnimatedCounter = ({ value }: { value: number }) => {
  const spring = useSpring(0, { duration: 2000 });
  const display = useTransform(spring, (current) => Math.round(current));
  
  React.useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  
  return <motion.span>{display}</motion.span>;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, bgColor, loading, index = 0 }) => {
  const glowColor = color.includes('blue') ? 'rgba(59, 130, 246, 0.4)' :
                    color.includes('green') ? 'rgba(34, 197, 94, 0.4)' :
                    color.includes('orange') ? 'rgba(249, 115, 22, 0.4)' :
                    'rgba(168, 85, 247, 0.4)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ 
        scale: 1.03,
        y: -5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-2xl ${bgColor} backdrop-blur-sm border border-white/10 p-6 cursor-pointer group`}
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Animated background gradient */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${color}`}
        initial={{ opacity: 0.1 }}
        whileHover={{ opacity: 0.25 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ 
          opacity: 1,
          boxShadow: `0 0 40px ${glowColor}, inset 0 0 0 1px ${glowColor.replace('0.4', '0.3')}`
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
            whileHover={{ 
              scale: 1.15,
              rotate: 5,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.div>
          <motion.div 
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-300 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-white tabular-nums">
            {loading ? (
              <motion.div 
                className="w-16 h-8 bg-white/10 rounded-lg"
                animate={{
                  opacity: [0.5, 1, 0.5],
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
      
      {/* Decorative elements with animation */}
      <motion.div 
        className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/5"
        initial={{ scale: 0.8, opacity: 0.5 }}
        whileHover={{ scale: 1.1, opacity: 0.8 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div 
        className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-white/5"
        initial={{ scale: 0.8, opacity: 0.5 }}
        whileHover={{ scale: 1.2, opacity: 0.8 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
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
    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );

  const completedIcon = (
    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const pendingIcon = (
    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const completionIcon = (
    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Tasks"
        value={totalTasks}
        icon={totalIcon}
        color="from-blue-500/20 to-blue-600/20"
        bgColor="bg-blue-500/10"
        loading={loading}
        index={0}
      />
      
      <StatCard
        title="Completed"
        value={completedTasks}
        icon={completedIcon}
        color="from-green-500/20 to-green-600/20"
        bgColor="bg-green-500/10"
        loading={loading}
        index={1}
      />
      
      <StatCard
        title="Pending"
        value={pendingTasks}
        icon={pendingIcon}
        color="from-orange-500/20 to-orange-600/20"
        bgColor="bg-orange-500/10"
        loading={loading}
        index={2}
      />
      
      <StatCard
        title="Completion Rate"
        value={completionRate}
        icon={completionIcon}
        color="from-purple-500/20 to-purple-600/20"
        bgColor="bg-purple-500/10"
        loading={loading}
        index={3}
      />
    </div>
  );
};

export default TaskStats;
