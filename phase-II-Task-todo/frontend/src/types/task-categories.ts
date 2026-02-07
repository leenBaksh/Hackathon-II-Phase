export interface TaskCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface TaskLabel {
  id: string;
  name: string;
  color: string;
}

export const DEFAULT_CATEGORIES: TaskCategory[] = [
  { id: 'work', name: 'Work', color: 'blue', icon: '💼' },
  { id: 'personal', name: 'Personal', color: 'green', icon: '🏠' },
  { id: 'shopping', name: 'Shopping', color: 'purple', icon: '🛒' },
  { id: 'health', name: 'Health', color: 'red', icon: '🏃' },
  { id: 'learning', name: 'Learning', color: 'yellow', icon: '📚' },
];

export const DEFAULT_LABELS: TaskLabel[] = [
  { id: 'urgent', name: 'Urgent', color: 'red' },
  { id: 'important', name: 'Important', color: 'orange' },
  { id: 'review', name: 'Review', color: 'blue' },
  { id: 'waiting', name: 'Waiting', color: 'gray' },
  { id: 'bug', name: 'Bug', color: 'red' },
  { id: 'feature', name: 'Feature', color: 'green' },
];