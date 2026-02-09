// api-client.ts
import { getSession } from 'next-auth/react'; // Import getSession
import { Task, TaskCreate, TaskUpdate, ApiError } from '../types/api-types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
// MOCKED_USER_ID is no longer used as user_id comes from JWT
// const MOCKED_USER_ID = process.env.NEXT_PUBLIC_MOCKED_USER_ID || 'a1b2c3d4-e5f6-7890-1234-567890abcdef';

async function callApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const session = await getSession();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Get the JWT token from localStorage where auth-service stores it
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('access_token');
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}/${endpoint}`; // Removed MOCKED_USER_ID from URL
  const response = await fetch(url, {
    headers: {
      ...headers,
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new Error(errorData.detail ? JSON.stringify(errorData.detail) : 'The request could not be completed.');
  }

  // Handle 204 No Content for DELETE operations
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    return callApi<Task[]>('tasks');
  },

  getTask: async (taskId: string): Promise<Task> => {
    return callApi<Task>(`tasks/${taskId}`);
  },

  createTask: async (task: TaskCreate): Promise<Task> => {
    return callApi<Task>('tasks', {
      method: 'POST',
      body: JSON.stringify({ task_create: task }),
    });
  },

  updateTask: async (taskId: string, task: TaskUpdate): Promise<Task> => {
    return callApi<Task>(`tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ task_update: task }),
    });
  },

  deleteTask: async (taskId: string): Promise<void> => {
    return callApi<void>(`tasks/${taskId}`, {
      method: 'DELETE',
    });
  },

  completeTask: async (taskId: string): Promise<Task> => {
    return callApi<Task>(`tasks/${taskId}/complete`, {
      method: 'PATCH',
    });
  },
};
