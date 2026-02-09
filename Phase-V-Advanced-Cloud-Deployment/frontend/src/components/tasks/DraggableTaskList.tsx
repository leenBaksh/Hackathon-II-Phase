'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types/api-types';
import TaskCard from './TaskCard';

interface DraggableTaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onReorder: (tasks: Task[]) => void;
}

// Draggable Task Card Wrapper
const DraggableTaskCard: React.FC<{
  task: Task;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}> = ({ task, onDelete, onToggleComplete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleEdit = (taskId: string) => {
    window.location.href = `/tasks/edit/${taskId}`;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="touch-none"
    >
      <div className="relative group">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing"
        >
          <div className="p-1 rounded hover:bg-white/10 transition-colors">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 12h2v2H3v-2zm0-4h2v2H3V8zm0 8h2v2H3v-2zm4-4h14v2H7v-2zm0-4h14v2H7V8zm0 8h14v2H7v-2z" />
            </svg>
          </div>
        </div>
        
        {/* Task Card with margin for drag handle */}
        <div className="ml-8">
          <TaskCard
            task={task}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            onEdit={handleEdit}
            viewMode="list"
            showPriority={true}
            showDueDate={true}
          />
        </div>
      </div>
    </div>
  );
};

const DraggableTaskList: React.FC<DraggableTaskListProps> = ({
  tasks,
  onDelete,
  onToggleComplete,
  onReorder,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      
      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
      onReorder(reorderedTasks);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

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

  return (
    <div className={`space-y-3 ${isDragging ? 'select-none' : ''}`}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <DraggableTaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DraggableTaskList;