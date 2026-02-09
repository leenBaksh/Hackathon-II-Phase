'use client';

import { useState } from 'react';
import { Task } from '@/types/api-types';

export type TaskFilter = 'all' | 'completed' | 'pending' | 'today' | 'week';
export type TaskSort = 'dueDate' | 'priority' | 'created' | 'name';

interface TaskFiltersProps {
  tasks: Task[];
  onFilterChange: (filter: TaskFilter) => void;
  onSortChange: (sort: TaskSort) => void;
  onSearchChange: (search: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  tasks,
  onFilterChange,
  onSortChange,
  onSearchChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all');
  const [activeSort, setActiveSort] = useState<TaskSort>('created');

  const filters = [
    { id: 'all' as TaskFilter, label: 'All Tasks', icon: '📋' },
    { id: 'pending' as TaskFilter, label: 'Pending', icon: '⏳' },
    { id: 'completed' as TaskFilter, label: 'Completed', icon: '✅' },
    { id: 'today' as TaskFilter, label: 'Today', icon: '📅' },
    { id: 'week' as TaskFilter, label: 'This Week', icon: '📆' },
  ];

  const sortOptions = [
    { id: 'created' as TaskSort, label: 'Date Created' },
    { id: 'dueDate' as TaskSort, label: 'Due Date' },
    { id: 'priority' as TaskSort, label: 'Priority' },
    { id: 'name' as TaskSort, label: 'Name' },
  ];

  const getFilterCount = (filter: TaskFilter): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);

    switch (filter) {
      case 'all':
        return tasks.length;
      case 'completed':
        return tasks.filter(task => task.completed).length;
      case 'pending':
        return tasks.filter(task => !task.completed).length;
      case 'today':
        return tasks.filter(task => {
          if (!task.dueDate) return false;
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate.getTime() === today.getTime();
        }).length;
      case 'week':
        return tasks.filter(task => {
          if (!task.dueDate) return false;
          const taskDate = new Date(task.dueDate);
          return taskDate >= today && taskDate <= weekFromNow;
        }).length;
      default:
        return 0;
    }
  };

  const handleFilterClick = (filter: TaskFilter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleSortChange = (sort: TaskSort) => {
    setActiveSort(sort);
    onSortChange(sort);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by title or description..."
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const count = getFilterCount(filter.id);
          return (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={`
                inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-lg font-medium transition-all duration-200 tap-target
                ${activeFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }
              `}
            >
              <span className="text-sm sm:text-base">{filter.icon}</span>
              <span className="hidden sm:inline text-sm sm:text-base">{filter.label}</span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-semibold
                ${activeFilter === filter.id
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-gray-400'
                }
              `}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sort Options */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <div className="flex gap-1 flex-wrap">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSortChange(option.id)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 tap-target
                  ${activeSort === option.id
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          <button className="p-2 rounded bg-white/10 text-white tap-target">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="p-2 rounded text-gray-400 hover:text-white tap-target">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;