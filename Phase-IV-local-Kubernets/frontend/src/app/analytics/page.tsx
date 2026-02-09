// frontend/src/app/analytics/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@/components/Loading';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { taskService } from '@/services/api-client';
import { Task } from '@/types/api-types';
import TaskAnalytics from '@/components/analytics/TaskAnalytics';
import AdvancedAnalytics from '@/components/analytics/AdvancedAnalytics';
import TimeTracking from '@/components/analytics/TimeTracking';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations';
import { SkeletonStats, SkeletonText } from '@/components/ui/Skeleton';

export default function AnalyticsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'basic' | 'advanced' | 'time'>('basic');

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
        setError(err.message || 'Unable to load analytics');
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [session, isPending, router]);

  const handleTimeLogged = (timeEntry: any) => {
    // Here you could send the time entry to your backend
    console.log('Time logged:', timeEntry);
  };

  if (isPending || !session) {
    return <Loading />;
  }

  if (loading) {
    return (
      <DashboardLayout>
        <StaggerContainer className="space-y-6">
          {/* Header */}
          <StaggerItem>
            <div className="flex items-center justify-between">
              <SkeletonText lines={2} />
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-white/10 rounded animate-pulse" />
                <div className="h-8 w-20 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          </StaggerItem>

          {/* View Selector */}
          <StaggerItem>
            <div className="flex gap-2">
              {['basic', 'advanced', 'time'].map((view) => (
                <div key={view} className="h-10 w-24 bg-white/10 rounded animate-pulse" />
              ))}
            </div>
          </StaggerItem>

          {/* Content */}
          <StaggerItem>
            <SkeletonStats />
          </StaggerItem>
          
          <StaggerItem>
            <SkeletonStats />
          </StaggerItem>
          
          <StaggerItem>
            <div className="h-96 bg-white/5 rounded-2xl animate-pulse" />
          </StaggerItem>
        </StaggerContainer>
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
          <p className="text-red-600 text-lg">Unable to load analytics: {error}</p>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <StaggerContainer className="space-y-6">
        {/* Page Header */}
        <StaggerItem>
          <AnimatedSection>
            <div className="flex flex-col gap-4">
              <div>
                <motion.h1 
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Analytics
                </motion.h1>
                <motion.p 
                  className="text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Deep insights into your productivity patterns
                </motion.p>
              </div>
            </div>

            {/* View Selector */}
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {[
                { key: 'basic', label: 'Basic', icon: '📊' },
                { key: 'advanced', label: 'Advanced', icon: '📈' },
                { key: 'time', label: 'Time Tracking', icon: '⏰' },
              ].map((view) => (
                <motion.button
                  key={view.key}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeView === view.key
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveView(view.key as any)}
                >
                  <span>{view.icon}</span>
                  <span>{view.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </AnimatedSection>
        </StaggerItem>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeView === 'basic' && (
              <StaggerItem>
                <AnimatedSection delay={0.2}>
                  <TaskAnalytics tasks={tasks} />
                </AnimatedSection>
              </StaggerItem>
            )}

            {activeView === 'advanced' && (
              <StaggerItem>
                <AnimatedSection delay={0.2}>
                  <AdvancedAnalytics tasks={tasks} />
                </AnimatedSection>
              </StaggerItem>
            )}

            {activeView === 'time' && (
              <StaggerItem>
                <AnimatedSection delay={0.2}>
                  <TimeTracking tasks={tasks} onTimeLogged={handleTimeLogged} />
                </AnimatedSection>
              </StaggerItem>
            )}
          </motion.div>
        </AnimatePresence>
      </StaggerContainer>
    </DashboardLayout>
  );
}