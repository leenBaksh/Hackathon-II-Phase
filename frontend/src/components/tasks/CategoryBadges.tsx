'use client';

import { TaskCategory, TaskLabel } from '@/types/task-categories';

interface CategoryBadgeProps {
  category: TaskCategory;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ 
  category, 
  size = 'md', 
  showIcon = true 
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-full border font-medium
      ${sizeClasses[size]}
      ${colorClasses[category.color as keyof typeof colorClasses] || colorClasses.gray}
    `}>
      {showIcon && category.icon && (
        <span className="text-xs">{category.icon}</span>
      )}
      {category.name}
    </span>
  );
};

interface LabelBadgeProps {
  label: TaskLabel;
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
}

export const LabelBadge: React.FC<LabelBadgeProps> = ({ 
  label, 
  size = 'sm', 
  removable = false,
  onRemove 
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-full border
      ${sizeClasses[size]}
      ${colorClasses[label.color as keyof typeof colorClasses] || colorClasses.gray}
    `}>
      {label.name}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-70 transition-opacity"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
};

interface CategorySelectorProps {
  categories: TaskCategory[];
  selectedCategory?: TaskCategory;
  onCategoryChange: (category: TaskCategory | undefined) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange(undefined)}
        className={`
          inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors
          ${sizeClasses[size]}
          ${!selectedCategory 
            ? 'bg-white/10 text-white border-white/20' 
            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
          }
        `}
      >
        <span className="text-xs">📋</span>
        No Category
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category)}
          className={`
            inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors
            ${sizeClasses[size]}
            ${selectedCategory?.id === category.id 
              ? 'bg-white/20 text-white border-white/30' 
              : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
            }
          `}
        >
          {category.icon && <span className="text-xs">{category.icon}</span>}
          {category.name}
        </button>
      ))}
    </div>
  );
};