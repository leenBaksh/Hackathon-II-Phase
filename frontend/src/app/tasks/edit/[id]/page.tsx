// frontend/src/app/tasks/edit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import TaskForm from '@/components/TaskForm';
import Loading from '@/components/Loading';
import { taskService } from '@/services/api-client';
import { Task, TaskUpdate } from '@/types/api-types';

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const taskId = params.id;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push('/auth/login');
      return;
    }

    async function fetchTask() {
      try {
        setLoading(true);
        const fetchedTask = await taskService.getTask(taskId);
        setTask(fetchedTask);
      } catch (err: any) {
        setError(err.message || 'Unable to load task');
      } finally {
        setLoading(false);
      }
    }
    fetchTask();
  }, [taskId, session, isPending, router]);

  const handleUpdate = async (updatedTask: TaskUpdate) => {
    try {
      await taskService.updateTask(taskId, updatedTask);
      router.push('/'); // Redirect to dashboard after update
    } catch (error: any) {
      alert(`Failed to update task: ${error.message}`);
    }
  };

  if (isPending || !session) {
    return <Loading />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-600 text-lg">An error occurred: {error}</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-600 text-lg">Task not found or you do not have access to this task.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Edit Task</h2>
      <TaskForm onSubmit={handleUpdate} initialData={task} />
    </div>
  );
}
