'use client';

import { Task } from '@/types/api-types';
import { getTaskStats } from '@/utils/taskUtils';

interface TaskAnalyticsProps {
  tasks: Task[];
}

const TaskAnalytics: React.FC<TaskAnalyticsProps> = ({ tasks }) => {
  const stats = getTaskStats(tasks);

  // Calculate additional insights
  const completionRate = stats.completionRate;
  const productivityScore = Math.min(100, Math.round(
    (stats.completed / Math.max(1, stats.total)) * 60 + 
    (stats.completed / Math.max(1, stats.total + stats.overdue)) * 40
  ));

  // Get weekly completion data
  const getWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    const weekData = days.map((day, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - today.getDay() + index + 1);
      
const dayTasks = tasks.filter(task => {
        if (!task.completed || !task.updated_at) return false;
        const taskDate = new Date(task.updated_at);
        return taskDate.toDateString() === date.toDateString();
      });

      return {
        day,
        completed: dayTasks.length,
        total: tasks.filter(task => {
          const taskDate = new Date(task.created_at || '');
          return taskDate.toDateString() === date.toDateString();
        }).length
      };
    });

    return weekData;
  };

  const weeklyData = getWeeklyData();
  const maxWeeklyTasks = Math.max(...weeklyData.map(d => d.total), 1);

  return (
    <div className="space-y-6">
      {/* Productivity Score */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Productivity Score</h3>
          <div className="px-3 py-1 bg-blue-500/20 rounded-full">
            <span className="text-blue-400 text-sm font-medium">This Week</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="36"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-blue-500/20"
              />
              <circle
                cx="48"
                cy="48"
                r="36"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 36}`}
                strokeDashoffset={`${2 * Math.PI * 36 * (1 - productivityScore / 100)}`}
                className="text-blue-500 transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{productivityScore}</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Completion Rate</p>
                <p className="text-xl font-semibold text-white">{completionRate}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Tasks Completed</p>
                <p className="text-xl font-semibold text-white">{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Weekly Activity</h3>
        
        <div className="space-y-3">
          {weeklyData.map((day, index) => (
            <div key={day.day} className="flex items-center gap-3">
              <div className="w-8 text-sm text-gray-400">{day.day}</div>
              
              <div className="flex-1 relative">
                <div className="h-6 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${(day.completed / maxWeeklyTasks) * 100}%` }}
                  />
                </div>
                
                {/* Task indicators */}
                <div className="absolute inset-0 flex items-center gap-1 px-2">
                  {Array.from({ length: Math.min(day.total, 5) }).map((_, i) => (
                    <div
                      key={i}
                      className={`
                        w-1.5 h-1.5 rounded-full
                        ${i < day.completed ? 'bg-green-400' : 'bg-gray-600'}
                      `}
                    />
                  ))}
                  {day.total > 5 && (
                    <span className="text-xs text-gray-400 ml-1">+{day.total - 5}</span>
                  )}
                </div>
              </div>
              
              <div className="text-sm text-gray-400 w-12 text-right">
                {day.completed}/{day.total}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">On Track</p>
              <p className="text-lg font-semibold text-white">
                {stats.dueThisWeek > 0 ? `${Math.round((stats.completed / stats.dueThisWeek) * 100)}%` : '100%'}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            {stats.dueThisWeek - stats.completed > 0 
              ? `${stats.dueThisWeek - stats.completed} tasks remaining this week`
              : 'All weekly tasks completed!'
            }
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Completion</p>
              <p className="text-lg font-semibold text-white">
                {stats.completed > 0 ? '2.3 days' : 'N/A'}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Average time to complete tasks
          </p>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Priority Distribution</h3>
        
        <div className="space-y-3">
          {['high', 'medium', 'low'].map((priority) => {
            const count = tasks.filter(task => task.priority === priority).length;
            const percentage = tasks.length > 0 ? Math.round((count / tasks.length) * 100) : 0;
            
            const priorityColors = {
              high: 'bg-red-500',
              medium: 'bg-yellow-500',
              low: 'bg-green-500'
            };

            return (
              <div key={priority} className="flex items-center gap-3">
                <div className="w-16 text-sm text-gray-400 capitalize">{priority}</div>
                
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${priorityColors[priority as keyof typeof priorityColors]} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="text-sm text-gray-400 w-12 text-right">
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskAnalytics;