// frontend/src/components/TaskList.tsx
import React from 'react';
import { Task } from '@/types/api-types';
import TaskItem from './TaskItem';
import TaskCard from './tasks/TaskCard';
import DraggableTaskList from './tasks/DraggableTaskList';

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  viewMode?: 'list' | 'grid';
  useEnhancedCards?: boolean;
  enableDragDrop?: boolean;
  onReorder?: (tasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onDelete, 
  onToggleComplete, 
  viewMode = 'list',
  useEnhancedCards = true,
  enableDragDrop = false,
  onReorder
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No tasks found</h3>
        <p className="text-gray-400">Create your first task to begin.</p>
      </div>
    );
  }

  const handleEdit = (taskId: string) => {
    // Navigate to edit page or open edit modal
    window.location.href = `/tasks/edit/${taskId}`;
  };

  if (enableDragDrop && viewMode === 'list') {
    return (
      <DraggableTaskList
        tasks={tasks}
        onDelete={onDelete}
        onToggleComplete={onToggleComplete}
        onReorder={onReorder || (() => {})}
      />
    );
  }

  if (useEnhancedCards) {
    return (
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
      }>
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDelete={onDelete} 
            onToggleComplete={onToggleComplete}
            onEdit={handleEdit}
            viewMode={viewMode}
            showPriority={true}
            showDueDate={true}
          />
        ))}
      </div>
    );
  }

  // Fallback to original TaskItem
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  );
};

export default TaskList;
