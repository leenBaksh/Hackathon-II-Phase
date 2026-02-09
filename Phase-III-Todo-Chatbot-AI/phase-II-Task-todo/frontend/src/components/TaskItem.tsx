// frontend/src/components/TaskItem.tsx
import React from 'react';
import Link from 'next/link';
import { Task } from '@/types/api-types';

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleComplete }) => {
  return (
    <li className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 flex items-center justify-between transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-xl">
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="h-5 w-5 rounded-lg border-2 border-gray-400 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 bg-white/10 backdrop-blur-sm cursor-pointer"
          />
          {task.completed && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <Link href={`/tasks/${task.id}`} className="flex-1">
          <span className={`text-lg cursor-pointer transition-all duration-200 ${task.completed ? 'line-through text-gray-400' : 'text-white hover:text-blue-300'}`}>
            {task.title}
          </span>
          {task.description && (
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{task.description}</p>
          )}
        </Link>
      </div>
      
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Link href={`/tasks/edit/${task.id}`}>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </Link>
        <button
          onClick={() => onDelete(task.id)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 px-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
