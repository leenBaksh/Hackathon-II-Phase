// frontend/src/app/(dashboard)/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { taskService } from '@/services/api-client';
import { Task } from '@/types/api-types';
import TaskList from '@/components/TaskList';
import Loading from '@/components/Loading';
import TaskStats from '@/components/dashboard/TaskStats';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import ProgressBar from '@/components/ui/Progress';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { StaggerContainer, StaggerItem, AnimatedSection } from '@/components/animations';
import { SkeletonStats, SkeletonWelcome } from '@/components/ui/Skeleton';

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push('/auth/login');
      return;
    }

    async function fetchTasks() {
      try {
        setLoading(true);
        const fetchedTasks = await taskService.getTasks();
        setTasks(fetchedTasks);
      } catch (err: any) {
        setError(err.message || 'Unable to load tasks');
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [session, isPending, router]);

  const handleDelete = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      try {
        await taskService.deleteTask(taskId);
        setTasks(tasks.filter((task) => task.id !== taskId));
      } catch (err: any) {
        alert(`Failed to delete task: ${err.message}`);
      }
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    try {
      const taskToToggle = tasks.find((task) => task.id === taskId);
      if (taskToToggle && !taskToToggle.completed) {
        const updatedTask = await taskService.completeTask(taskId);
        setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
      } else if (taskToToggle) {
        const updatedTask = await taskService.updateTask(taskId, { completed: false });
        setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
      }
    } catch (err: any) {
      alert(`Failed to update task status: ${err.message}`);
    }
  };

  if (isPending || !session) {
    return <Loading />;
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <SkeletonWelcome />
          <SkeletonStats />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 w-32 bg-slate-700/50 rounded" />
              <div className="h-10 w-32 bg-slate-700/50 rounded" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="h-24 bg-slate-800/50 rounded-xl"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center items-center h-full"
        >
          <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
            <p className="text-red-400 text-lg">An error occurred: {error}</p>
          </div>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <StaggerContainer className="space-y-10" staggerDelay={0.1}>
        {/* Welcome Section */}
        <StaggerItem>
          <WelcomeSection tasks={tasks} />
        </StaggerItem>
        
        {/* Task Statistics */}
        <StaggerItem>
          <TaskStats tasks={tasks} loading={loading} />
        </StaggerItem>
        
        {/* Progress Overview */}
        {tasks.length > 0 && (
          <StaggerItem>
            <AnimatedSection>
              <motion.div 
                className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6"
                whileHover={{ 
                  borderColor: 'rgba(99, 102, 241, 0.4)',
                }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-4">Overall Progress</h3>
                <ProgressBar 
                  value={tasks.filter(task => task.completed).length} 
                  max={tasks.length} 
                  color="blue"
                  size="lg"
                />
              </motion.div>
            </AnimatedSection>
          </StaggerItem>
        )}
        
        {/* Tasks Section */}
        <StaggerItem>
          <motion.div 
            className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 lg:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <motion.h2 
                className="text-2xl font-bold text-white tracking-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Your Tasks
              </motion.h2>
              <Link href="/tasks/create">
                <motion.button 
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold h-11 px-5 bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Task
                </motion.button>
              </Link>
            </div>
            <TaskList tasks={tasks} onDelete={handleDelete} onToggleComplete={handleToggleComplete} />
          </motion.div>
        </StaggerItem>
      </StaggerContainer>
    </DashboardLayout>
  );
}
