// frontend/src/app/tasks/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import Loading from '@/components/Loading';
import { taskService } from '@/services/api-client';
import { Task } from '@/types/api-types';

export default function TaskDetailPage({ params }: { params: { id: string } }) {
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

  const handleComplete = async () => {
    try {
      if (task) {
        const updatedTask = await taskService.completeTask(task.id);
        setTask(updatedTask); // Update local state
      }
    } catch (err: any) {
      alert(`Failed to complete task: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      try {
        if (task) {
          await taskService.deleteTask(task.id);
          router.push('/'); // Redirect to dashboard after deletion
        }
      } catch (err: any) {
        alert(`Failed to delete task: ${err.message}`);
      }
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
    <div className="max-w-xl mx-auto bg-slate-800 p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-3xl font-bold text-white">{task.title}</h2>
      <p className="text-gray-300">{task.description || 'No description provided.'}</p>
      <div className="flex items-center space-x-2">
        <span className="text-gray-400">Status:</span>
        <span className={`px-2 py-1 text-sm font-semibold rounded ${task.completed ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>
      <p className="text-sm text-gray-400">Created: {new Date(task.created_at).toLocaleString()}</p>
      <p className="text-sm text-gray-400">Last Updated: {new Date(task.updated_at).toLocaleString()}</p>

      <div className="flex space-x-4">
        {!task.completed && (
          <button
            onClick={handleComplete}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Mark Complete
          </button>
        )}
        <button
          onClick={() => router.push(`/tasks/edit/${task.id}`)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
