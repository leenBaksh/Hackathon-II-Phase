// frontend/src/components/analytics/TimeTracking.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Task } from '@/types/api-types';
import { format } from 'date-fns';

interface TimeEntry {
  id: string;
  taskId: string;
  taskTitle: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  isRunning: boolean;
  category?: string;
}

interface TimeTrackingProps {
  tasks: Task[];
  onTimeLogged?: (entry: TimeEntry) => void;
}

const CATEGORIES = [
  'Work', 'Personal', 'Study', 'Exercise', 'Break', 'Meeting', 'Other'
];

const DEFAULT_BREAK_DURATION = 5; // minutes

export default function TimeTracking({ tasks, onTimeLogged }: TimeTrackingProps) {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<TimeEntry | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isBreakMode, setIsBreakMode] = useState(false);
  const [breakTime, setBreakTime] = useState(0);

  // Update timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeEntry && activeEntry.isRunning) {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - activeEntry.startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
      }
      
      if (isBreakMode) {
        setBreakTime(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeEntry, isBreakMode]);

  // Calculate total time today
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayEntries = entries.filter(entry => {
      const entryDate = new Date(entry.startTime);
      return entryDate >= today && entry.endTime;
    });
    
    const total = todayEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
    setTotalTime(total);
  }, [entries]);

  const startTimer = (task: Task) => {
    const newEntry: TimeEntry = {
      id: crypto.randomUUID(),
      taskId: task.id,
      taskTitle: task.title,
      startTime: new Date(),
      isRunning: true,
      category: task.category || 'Work'
    };
    
    setActiveEntry(newEntry);
    setIsBreakMode(false);
    setBreakTime(0);
  };

  const stopTimer = () => {
    if (activeEntry) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - activeEntry.startTime.getTime()) / 1000);
      
      const completedEntry: TimeEntry = {
        ...activeEntry,
        endTime,
        duration,
        isRunning: false
      };
      
      setEntries(prev => [...prev, completedEntry]);
      setElapsedTime(0);
      setActiveEntry(null);
      
      if (onTimeLogged) {
        onTimeLogged(completedEntry);
      }
    }
  };

  const startBreak = () => {
    if (activeEntry) {
      stopTimer();
    }
    setIsBreakMode(true);
    setBreakTime(0);
  };

  const endBreak = () => {
    setIsBreakMode(false);
    setBreakTime(0);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const formatTimeForDisplay = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  };

  const todayStats = entries.filter(entry => {
    const entryDate = new Date(entry.startTime);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return entryDate >= today;
  });

  const totalTimeToday = todayStats.reduce((sum, entry) => sum + (entry.duration || 0), 0);
  const tasksWorkedOn = todayStats.length;
  const averageSessionTime = tasksWorkedOn > 0 ? totalTimeToday / tasksWorkedOn : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Time Tracking</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-400">
            {activeEntry && activeEntry.isRunning ? 'Tracking' : 'Idle'}
            {isBreakMode && ' (Break)'}
          </span>
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-8">
        <motion.div
          className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${
            isBreakMode ? 'bg-yellow-500' : 'bg-blue-500'
          } shadow-lg`}
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: isBreakMode ? Infinity : 0,
          }}
        >
          <div className="text-center text-white">
            <div className="text-3xl font-mono">
              {isBreakMode ? formatTimeForDisplay(breakTime) : formatTimeForDisplay(elapsedTime)}
            </div>
            <div className="text-sm opacity-80">
              {isBreakMode ? 'Break Time' : 'Session Time'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Active Task */}
      {activeEntry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">{activeEntry.taskTitle}</div>
              <div className="text-sm text-gray-400">
                Started at {format(activeEntry.startTime, 'h:mm a')}
              </div>
            </div>
            <button
              onClick={stopTimer}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Stop
            </button>
          </div>
        </motion.div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-4 mb-8">
        <motion.button
          onClick={isBreakMode ? endBreak : startBreak}
          className={`flex-1 ${
            isBreakMode 
              ? 'bg-yellow-500 hover:bg-yellow-600' 
              : 'bg-gray-600 hover:bg-gray-700'
          } text-white px-4 py-3 rounded-lg transition-colors`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!activeEntry && !isBreakMode}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
          </svg>
          {isBreakMode ? 'End Break' : 'Take Break'}
        </motion.button>
        
        {!isBreakMode && (
          <motion.button
            onClick={() => {
              if (tasks.length > 0) {
                startTimer(tasks[0]); // Start with first available task
              }
            }}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={activeEntry !== null}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010.905 9.5L10.905 6.5a1 1 0 00-1.65-.988l5.5 3a1 1 0 00.575.908l4.917 2.69V21a1 1 0 01-1 1h-5.75a1 1 0 01-1-1V14.88z" />
            </svg>
            Start Task
          </motion.button>
        )}
      </div>

      {/* Task Selection for Starting Timer */}
      {!activeEntry && !isBreakMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium">Select a task to start tracking</h4>
            <div className="text-sm text-gray-400">
              {tasks.length} tasks available
            </div>
          </div>
          
          <div className="max-h-48 overflow-y-auto space-y-2">
            {tasks.map((task) => (
              <motion.button
                key={task.id}
                onClick={() => startTimer(task)}
                className="w-full bg-white/10 hover:bg-white/20 rounded-lg p-3 text-left transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded"
                      checked={false}
                      readOnly
                    />
                    <span className="text-white text-sm">{task.title}</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Today's Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10"
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {formatTime(totalTimeToday)}
          </div>
          <div className="text-sm text-gray-400">Total Time Today</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{tasksWorkedOn}</div>
          <div className="text-sm text-gray-400">Tasks Worked On</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {formatTimeForDisplay(averageSessionTime)}
          </div>
          <div className="text-sm text-gray-400">Average Session</div>
        </div>
      </motion.div>
    </motion.div>
  );
}