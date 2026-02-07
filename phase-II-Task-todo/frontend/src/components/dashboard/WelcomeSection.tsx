// frontend/src/components/dashboard/WelcomeSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { Task } from '@/types/api-types';

interface WelcomeSectionProps {
  tasks: Task[];
  className?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ tasks, className = '' }) => {
  const { data: session } = useSession();
  
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
      return "Ready to begin? Create your first task.";
    } else if (completionRate === 100) {
      return "Excellent work. All tasks completed.";
    } else if (completionRate >= 75) {
      return "Excellent progress. You are close to completing all tasks.";
    } else if (completionRate >= 50) {
      return "Great progress. Keep up the momentum.";
    } else if (completionRate >= 25) {
      return "Good start. Continue building momentum.";
    } else {
      return "Every completed task is progress.";
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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const progressVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: completionRate / 100,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1.5,
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
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 p-8 mb-8 ${className}`}
    >
      {/* Animated background decorative elements */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div 
          className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Welcome message */}
          <div className="flex-1">
            <div className="space-y-4">
              {/* Greeting with animation */}
              <motion.div variants={itemVariants} className="space-y-2">
                <motion.h1 
                  className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {getGreeting()}, {getDisplayName()}!
                </motion.h1>
                <motion.div 
                  className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-300"
                  variants={itemVariants}
                >
                  <motion.span 
                    className="flex items-center gap-2"
                    whileHover={{ x: 5, color: '#60A5FA' }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {dateString}
                  </motion.span>
                  <span className="hidden sm:inline">•</span>
                  <motion.span 
                    className="flex items-center gap-2"
                    whileHover={{ x: 5, color: '#60A5FA' }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {timeString}
                  </motion.span>
                </motion.div>
              </motion.div>
              
              {/* Motivational message with animation */}
              <motion.div 
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
                whileHover={{ 
                  scale: 1.01,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.p 
                  className="text-lg font-medium text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {getMotivationalMessage()}
                </motion.p>
                {totalTasks > 0 && (
                  <motion.div 
                    className="mt-2 text-sm text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    You have completed {completedTasks} of {totalTasks} tasks.
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
          
          {/* Stats preview with animation */}
          {totalTasks > 0 && (
            <motion.div 
              variants={itemVariants}
              className="flex-shrink-0"
            >
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 min-w-[200px]"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 mx-auto relative">
                      {/* Circular progress background */}
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="36"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-gray-600/30"
                        />
                        <motion.circle
                          cx="48"
                          cy="48"
                          r="36"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 36}`}
                          strokeLinecap="round"
                          className="text-blue-400"
                          variants={progressVariants}
                          initial="hidden"
                          animate="visible"
                        />
                      </svg>
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                      >
                        <span className="text-2xl font-bold text-white">{completionRate}%</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <motion.p 
                      className="text-sm font-medium text-gray-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      Daily Progress
                    </motion.p>
                    <motion.p 
                      className="text-xs text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                    >
                      {completedTasks} of {totalTasks} tasks
                    </motion.p>
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
