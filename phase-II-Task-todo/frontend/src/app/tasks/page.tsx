// frontend/src/app/tasks/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import Loading from '@/components/Loading';
import TaskFilters from '@/components/tasks/TaskFilters';
import TaskModal from '@/components/tasks/TaskModal';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { taskService } from '@/services/api-client';
import { Task, TaskCreate } from '@/types/api-types';
import { TaskFilter, TaskSort } from '@/components/tasks/TaskFilters';
import { filterTasks, sortTasks } from '@/utils/taskUtils';
import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem, FadeIn } from '@/components/animations';
import { SkeletonStats, SkeletonText } from '@/components/ui/Skeleton';

export default function TasksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all');
  const [activeSort, setActiveSort] = useState<TaskSort>('created');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/login');
    } else {
      loadTasks();
    }
  }, [session, status, router]);

  const loadTasks = async () => {
    try {
      const userTasks = await taskService.getTasks();
      setTasks(userTasks);
      setFilteredTasks(userTasks);
    } catch (error: any) {
      console.error('An error occurred while loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = filterTasks(tasks, activeFilter, searchQuery);
    filtered = sortTasks(filtered, activeSort);
    setFilteredTasks(filtered);
  }, [tasks, activeFilter, activeSort, searchQuery]);

  const handleFilterChange = (filter: TaskFilter) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (sort: TaskSort) => {
    setActiveSort(sort);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreate = async (task: TaskCreate) => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks([newTask, ...tasks]);
      setShowCreateModal(false);
    } catch (error: any) {
      alert(`Failed to create task: ${error.message}`);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      try {
        await taskService.deleteTask(taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (error: any) {
        alert(`Failed to delete task: ${error.message}`);
      }
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        const updatedTask = await taskService.updateTask(taskId, {
          ...task,
          completed: !task.completed
        });
        setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
      }
    } catch (error: any) {
      alert(`Failed to update task: ${error.message}`);
    }
  };

  const handleReorder = async (reorderedTasks: Task[]) => {
    try {
      // Update local state immediately for better UX
      setTasks(reorderedTasks);
      
      // Optional: Update backend with new order
      // This would require adding an 'order' field to your Task model
      // await taskService.reorderTasks(reorderedTasks.map(t => t.id));
    } catch (error: any) {
      console.error('Error reordering tasks:', error);
      // Revert to original order if backend update fails
      // setTasks(originalTasks);
    }
  };

  if (status === 'loading' || !session) {
    return <Loading />;
  }

  return (
    <DashboardLayout>
      <StaggerContainer className="space-y-8" staggerDelay={0.1}>
        {/* Page Header */}
        <StaggerItem>
          <AnimatedSection>
            <div className="flex flex-col gap-4">
              <div>
                <motion.h1 
                  className="text-2xl sm:text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Tasks
                </motion.h1>
                <motion.p 
                  className="text-sm sm:text-base text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Manage your tasks and stay organized
                </motion.p>
              </div>
              <motion.button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all h-10 sm:h-11 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: showCreateModal ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </motion.svg>
                <span className="hidden sm:inline">Create New Task</span>
                <span className="sm:hidden">New Task</span>
              </motion.button>
            </div>
          </AnimatedSection>
        </StaggerItem>

        {/* Task Stats */}
        <StaggerItem>
          <AnimatedSection direction="up" delay={0.2}>
            {isLoading ? (
              <SkeletonStats />
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <motion.div 
                  key="total"
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3 sm:p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </motion.div>
                    <div>
                      <motion.p 
                        className="text-xl sm:text-2xl font-bold text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                      >
                        {tasks.length}
                      </motion.p>
                      <p className="text-xs sm:text-sm text-gray-400">Total</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  key="completed"
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3 sm:p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'rgba(34, 197, 94, 0.3)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/20 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>
                    <div>
                      <motion.p 
                        className="text-xl sm:text-2xl font-bold text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                      >
                        {tasks.filter(t => t.completed).length}
                      </motion.p>
                      <p className="text-xs sm:text-sm text-gray-400">Done</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  key="pending"
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3 sm:p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'rgba(249, 115, 22, 0.3)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>
                    <div>
                      <motion.p 
                        className="text-xl sm:text-2xl font-bold text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                      >
                        {tasks.filter(t => !t.completed).length}
                      </motion.p>
                      <p className="text-xs sm:text-sm text-gray-400">To Do</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  key="progress"
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3 sm:p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'rgba(168, 85, 247, 0.3)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </motion.div>
                    <div>
                      <motion.p 
                        className="text-xl sm:text-2xl font-bold text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.4 }}
                      >
                        {tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0}%
                      </motion.p>
                      <p className="text-xs sm:text-sm text-gray-400">Progress</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatedSection>
        </StaggerItem>

        {/* Filters */}
        <StaggerItem>
          <AnimatedSection direction="up" delay={0.3}>
            <TaskFilters
              tasks={tasks}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onSearchChange={handleSearchChange}
            />
          </AnimatedSection>
        </StaggerItem>

        {/* Task Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TaskModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreate}
                mode="create"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tasks List */}
        <StaggerItem>
          <AnimatedSection direction="up" delay={0.4}>
            {isLoading ? (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                  <motion.div 
                    className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
                <motion.p 
                  className="text-gray-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Loading tasks...
                </motion.p>
              </motion.div>
            ) : filteredTasks.length > 0 ? (
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
                whileHover={{ 
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h2 className="text-xl font-semibold text-white">
                    {activeFilter === 'all' ? 'All Tasks' : 
                     activeFilter === 'completed' ? 'Completed Tasks' :
                     activeFilter === 'pending' ? 'Pending Tasks' :
                     activeFilter === 'today' ? "Today's Tasks" :
                     "This Week's Tasks"}
                    <span className="ml-2 text-sm text-gray-400">({filteredTasks.length})</span>
                  </h2>
                </motion.div>
                <TaskList
                  tasks={filteredTasks}
                  onDelete={handleDelete}
                  onToggleComplete={handleToggleComplete}
                  enableDragDrop={true}
                  onReorder={handleReorder}
                />
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                  }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold text-white mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {searchQuery ? 'No tasks found' : 'No tasks found'}
                </motion.h3>
                <motion.p 
                  className="text-gray-400 mb-8 max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {searchQuery 
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Create your first task to begin.'
                  }
                </motion.p>
                {!searchQuery && (
                  <motion.button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-11 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Your First Task
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatedSection>
        </StaggerItem>
      </StaggerContainer>
    </DashboardLayout>
  );
}
