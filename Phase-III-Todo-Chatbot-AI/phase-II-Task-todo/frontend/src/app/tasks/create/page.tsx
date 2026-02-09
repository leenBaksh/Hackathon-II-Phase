// frontend/src/app/tasks/create/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import TaskForm from '@/components/TaskForm';
import Loading from '@/components/Loading';
import { taskService } from '@/services/api-client';
import { TaskCreate, TaskUpdate } from '@/types/api-types';
import Link from 'next/link';

export default function CreateTaskPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/login');
    }
  }, [session, status, router]);

  const handleCreate = async (task: TaskCreate | TaskUpdate) => {
    try {
      await taskService.createTask(task as TaskCreate);
      router.push('/tasks'); // Redirect to tasks page after creation
    } catch (error: any) {
      alert(`Failed to create task: ${error.message}`);
    }
  };

  if (status === 'loading' || !session) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Link href="/tasks" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Tasks
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Create New Task</span>
            </h1>
            <p className="text-xl text-gray-300">
              Create a new task to stay organized.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-xl p-8">
              <TaskForm onSubmit={handleCreate} mode="create" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
