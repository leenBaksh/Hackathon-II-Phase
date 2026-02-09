import { Task } from '@/types/api-types';
import { TaskFilter, TaskSort } from '@/components/tasks/TaskFilters';

export const filterTasks = (tasks: Task[], filter: TaskFilter, searchQuery: string): Task[] => {
  let filteredTasks = [...tasks];

  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(query) ||
      (task.description && task.description.toLowerCase().includes(query))
    );
  }

  // Apply status/date filter
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekFromNow = new Date(today);
  weekFromNow.setDate(weekFromNow.getDate() + 7);

  switch (filter) {
    case 'all':
      break;
    case 'completed':
      filteredTasks = filteredTasks.filter(task => task.completed);
      break;
    case 'pending':
      filteredTasks = filteredTasks.filter(task => !task.completed);
      break;
    case 'today':
      filteredTasks = filteredTasks.filter(task => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
      });
      break;
    case 'week':
      filteredTasks = filteredTasks.filter(task => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        return taskDate >= today && taskDate <= weekFromNow;
      });
      break;
  }

  return filteredTasks;
};

export const sortTasks = (tasks: Task[], sort: TaskSort): Task[] => {
  const sortedTasks = [...tasks];

  switch (sort) {
    case 'created':
      sortedTasks.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      break;
    case 'dueDate':
      sortedTasks.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
      break;
    case 'priority':
      sortedTasks.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 2;
        const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 2;
        return bPriority - aPriority;
      });
      break;
    case 'name':
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return sortedTasks;
};

export const getTaskStats = (tasks: Task[]) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekFromNow = new Date(today);
  weekFromNow.setDate(weekFromNow.getDate() + 7);
  
  const dueToday = tasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  }).length;
  
  const dueThisWeek = tasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return taskDate >= today && taskDate <= weekFromNow;
  }).length;
  
  const overdue = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate < today;
  }).length;

  return {
    total,
    completed,
    pending,
    dueToday,
    dueThisWeek,
    overdue,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
};

export const formatDueDate = (dueDate: string | null): string => {
  if (!dueDate) return '';
  
  const date = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  date.setHours(0, 0, 0, 0);
  
  if (date.getTime() === today.getTime()) {
    return 'Today';
  } else if (date.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  } else if (date < today) {
    const daysOverdue = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return `${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue`;
  } else {
    const daysUntil = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntil <= 7) {
      return `In ${daysUntil} day${daysUntil > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'text-red-400 bg-red-500/20 border-red-500/30';
    case 'medium':
      return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    case 'low':
      return 'text-green-400 bg-green-500/20 border-green-500/30';
    default:
      return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
  }
};