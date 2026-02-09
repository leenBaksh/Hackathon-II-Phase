// frontend/src/components/dashboard/WelcomeSection.tsx
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import { Task } from '@/types/api-types';

interface WelcomeSectionProps {
  tasks: Task[];
  className?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ tasks, className = '' }) => {
  const { data: session } = authClient.useSession();
  
  // Get current date and time
  const now = new Date();
  const dateString = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  // Calculate completion rate
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = now.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };
  
  // Get motivational message based on progress
  const getMotivationalMessage = () => {
    if (totalTasks === 0) {
      return "Ready to begin? Create your first task and start your journey.";
    } else if (completionRate === 100) {
      return "Outstanding work! You've completed everything on your list.";
    } else if (completionRate >= 75) {
      return "Excellent progress! You're almost at the finish line.";
    } else if (completionRate >= 50) {
      return "Great momentum! Keep pushing forward.";
    } else if (completionRate >= 25) {
      return "Good start! Every task completed is a step forward.";
    } else {
      return "Every journey begins with a single step. You've got this!";
    }
  };
  
  // Get user display name
  const getDisplayName = () => {
    if (session?.user?.name) {
      return session.user.name.split(' ')[0];
    }
    return 'there';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const progressVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: completionRate / 100,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
        },
        opacity: { duration: 0.3 },
      },
    },
  };
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-6 lg:p-8 mb-10 ${className}`}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-violet-500/5 to-teal-500/5" />
      
      {/* Animated background decorative elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div 
          className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Welcome message */}
          <div className="flex-1">
            <div className="space-y-5">
              {/* Greeting with refined typography */}
              <motion.div variants={itemVariants} className="space-y-3">
                <motion.h1 
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
                    {getGreeting()}, {getDisplayName()}!
                  </span>
                </motion.h1>
                <motion.div 
                  className="flex flex-wrap items-center gap-3 text-sm text-slate-400"
                  variants={itemVariants}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {dateString}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {timeString}
                  </span>
                </motion.div>
              </motion.div>
              
              {/* Motivational message with refined card styling */}
              <motion.div 
                variants={itemVariants}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/30"
                whileHover={{ 
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-lg text-slate-200 font-medium leading-relaxed">
                  {getMotivationalMessage()}
                </p>
                {totalTasks > 0 && (
                  <p className="mt-3 text-sm text-slate-400">
                    Completed {completedTasks} of {totalTasks} tasks ({completionRate}%)
                  </p>
                )}
              </motion.div>
            </div>
          </div>
          
          {/* Stats preview with refined design */}
          {totalTasks > 0 && (
            <motion.div 
              variants={itemVariants}
              className="flex-shrink-0"
            >
              <motion.div 
                className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/40"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 40px rgba(99, 102, 241, 0.15)',
                  borderColor: 'rgba(99, 102, 241, 0.4)'
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center space-y-5">
                  <div className="relative">
                    <div className="w-28 h-28 mx-auto relative">
                      {/* Circular progress background */}
                      <svg className="w-28 h-28 transform -rotate-90">
                        <circle
                          cx="56"
                          cy="56"
                          r="42"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          className="text-slate-700/50"
                        />
                        <motion.circle
                          cx="56"
                          cy="56"
                          r="42"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 42}`}
                          strokeLinecap="round"
                          className="text-indigo-400"
                          variants={progressVariants}
                          initial="hidden"
                          animate="visible"
                        />
                      </svg>
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                      >
                        <span className="text-3xl font-bold text-white tracking-tight">{completionRate}%</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-300">Daily Progress</p>
                    <p className="text-xs text-slate-500">
                      {completedTasks} of {totalTasks} tasks completed
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeSection;
