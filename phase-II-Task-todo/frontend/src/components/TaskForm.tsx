// frontend/src/components/TaskForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Task, TaskCreate, TaskUpdate } from '@/types/api-types';

interface TaskFormProps {
  onSubmit: (task: TaskCreate | TaskUpdate) => void;
  initialData?: Task;
  mode?: 'create' | 'update';
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData, mode = 'create' }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [completed, setCompleted] = useState(initialData?.completed || false);
  const [errors, setErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setCompleted(initialData.completed);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: { title?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'A task title is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const taskData = { title, description, completed };
      if (mode === 'create') {
        onSubmit(taskData as TaskCreate);
      } else {
        onSubmit(taskData as TaskUpdate);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
          Task Title
        </label>
        <div className="relative">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`block w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
              errors.title ? 'border-red-500/50' : 'border-white/20'
            }`}
            placeholder="e.g., Complete quarterly report"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
        {errors.title && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
          Description <span className="text-gray-400">(optional)</span>
        </label>
        <div className="relative">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="block w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
            placeholder="Enter additional details about this task..."
          />
          <div className="absolute top-3 right-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </div>
      </div>

      {initialData && (
        <div className="flex items-center p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-5 w-5 rounded-lg border-2 border-gray-400 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 bg-white/10 backdrop-blur-sm cursor-pointer"
          />
          <label htmlFor="completed" className="ml-3 block text-sm font-medium text-white cursor-pointer">
            Mark task as completed
          </label>
        </div>
      )}

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        {initialData ? (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Update Task
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Task
          </>
        )}
      </button>
    </form>
  );
};

export default TaskForm;
