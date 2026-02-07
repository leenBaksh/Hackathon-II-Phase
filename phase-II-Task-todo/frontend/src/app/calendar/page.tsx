export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Calendar
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            View and manage your tasks with calendar view
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                November 2024
              </h2>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {i + 1}
                  </div>
                  {(i + 1) % 5 === 0 && (
                    <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}