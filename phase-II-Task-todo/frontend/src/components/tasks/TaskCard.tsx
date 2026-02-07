// frontend/src/components/tasks/TaskCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Task } from '@/types/api-types';
import { TaskCategory, TaskLabel } from '@/types/task-categories';
import { CategoryBadge, LabelBadge } from './CategoryBadges';

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  viewMode?: 'list' | 'grid';
  showPriority?: boolean;
  showDueDate?: boolean;
  categories?: TaskCategory[];
  labels?: TaskLabel[];
  index?: number; // For stagger animation
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onDelete, 
  onToggleComplete, 
  onEdit, 
  viewMode = 'list',
  showPriority = true,
  showDueDate = true,
  categories = [],
  labels = [],
  index = 0
}) => {
  // Find category object and labels
  const categoryObj = categories.find(cat => cat.id === task.category);
  const taskLabels = labels.filter(label => task.labels?.includes(label.id));
  
  // Get priority color
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 border-red-500';
      case 'medium':
        return 'bg-orange-500 border-orange-500';
      case 'low':
        return 'bg-green-500 border-green-500';
      default:
        return 'bg-blue-500 border-blue-500';
    }
  };
  
  // Get priority gradient
  const getPriorityGradient = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'from-red-500/20 to-red-600/20';
      case 'medium':
        return 'from-orange-500/20 to-orange-600/20';
      case 'low':
        return 'from-green-500/20 to-green-600/20';
      default:
        return 'from-blue-500/20 to-blue-600/20';
    }
  };

  // Get glow color based on priority
  const getGlowColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'rgba(239, 68, 68, 0.4)';
      case 'medium':
        return 'rgba(249, 115, 22, 0.4)';
      case 'low':
        return 'rgba(34, 197, 94, 0.4)';
      default:
        return 'rgba(59, 130, 246, 0.4)';
    }
  };
  
  // Format due date
  const formatDueDate = (dueDate?: string) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: 'Overdue', color: 'text-red-400' };
    } else if (diffDays === 0) {
      return { text: 'Today', color: 'text-orange-400' };
    } else if (diffDays === 1) {
      return { text: 'Tomorrow', color: 'text-yellow-400' };
    } else if (diffDays <= 7) {
      return { text: `In ${diffDays} days`, color: 'text-blue-400' };
    } else {
      return { text: date.toLocaleDateString(), color: 'text-gray-400' };
    }
  };
  
  const dueDateInfo = formatDueDate(task.dueDate);
  
  // Animation variants
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.02,
        y: -4,
        transition: { 
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }}
      whileTap={{ scale: 0.98 }}
      className={`group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 cursor-pointer ${
        viewMode === 'grid' ? 'h-full' : ''
      } ${task.completed ? 'opacity-75' : ''}`}
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
      // Add glow effect on hover using motion props
      transition={{
        boxShadow: {
          duration: 0.3,
        }
      }}
      // @ts-ignore - Framer Motion custom properties
      whileHoverShadow={`0 20px 40px ${getGlowColor(task.priority)}, 0 0 60px ${getGlowColor(task.priority).replace('0.4', '0.2')}`}
    >
      {/* Animated background glow */}
      <motion.div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getPriorityGradient(task.priority)}`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ 
          opacity: 1,
          boxShadow: `inset 0 0 0 1px ${getGlowColor(task.priority).replace('0.4', '0.5')}, 0 0 20px ${getGlowColor(task.priority).replace('0.4', '0.3')}`
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Priority indicator with animation */}
      {showPriority && task.priority && (
        <motion.div 
          className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${getPriorityColor(task.priority)}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
          style={{ originY: 0 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start gap-4">
          {/* Animated Checkbox */}
          <motion.div 
            className="relative flex-shrink-0 mt-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className="h-5 w-5 rounded-lg border-2 border-gray-400 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 bg-white/10 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-blue-400"
            />
            {task.completed && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
            )}
          </motion.div>
          
          {/* Task content */}
          <div className="flex-1 min-w-0">
            {/* Title with hover animation */}
            <Link href={`/tasks/${task.id}`} className="block">
              <motion.h3 
                className={`text-lg font-semibold cursor-pointer mb-2 ${
                  task.completed 
                    ? 'line-through text-gray-400' 
                    : 'text-white'
                }`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {task.title}
              </motion.h3>
            </Link>
            
            {/* Description with fade */}
            {task.description && (
              <motion.p 
                className="text-sm text-gray-400 mb-3 line-clamp-2"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
              >
                {task.description}
              </motion.p>
            )}
            
            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {/* Due date */}
              {showDueDate && dueDateInfo && (
                <motion.div 
                  className={`flex items-center gap-1 ${dueDateInfo.color}`}
                  whileHover={{ scale: 1.05 }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{dueDateInfo.text}</span>
                </motion.div>
              )}
              
              {/* Category */}
              {categoryObj && (
                <CategoryBadge category={categoryObj} size="sm" />
              )}
              
              {/* Labels */}
              {taskLabels && taskLabels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {taskLabels.map((label, idx) => (
                    <motion.div
                      key={label.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 + idx * 0.03 }}
                    >
                      <LabelBadge label={label} size="sm" />
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Priority */}
              {showPriority && task.priority && (
                <motion.div 
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-white ${getPriorityColor(task.priority)} bg-opacity-20`}
                  whileHover={{ scale: 1.05 }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="capitalize">{task.priority}</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action buttons with stagger animation */}
        <motion.div 
          className="flex items-center gap-2 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 + 0.3 }}
        >
          <Link href={`/tasks/edit/${task.id}`}>
            <motion.button 
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                onEdit(task.id);
              }}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-8 px-3 bg-blue-500/20 text-blue-300 border border-blue-500/30"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(59, 130, 246, 0.3)',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </motion.button>
          </Link>
          <motion.button
            onClick={() => onDelete(task.id)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-8 px-3 bg-red-500/20 text-red-300 border border-red-500/30"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgba(239, 68, 68, 0.3)',
              boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
