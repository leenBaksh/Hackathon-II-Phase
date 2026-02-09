export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Organize your tasks into projects for better management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Website Redesign
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Complete overhaul of company website design and functionality
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">12 tasks</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">In Progress</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Mobile App Development
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Build native mobile apps for iOS and Android platforms
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">8 tasks</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Planning</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Marketing Campaign
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Q4 marketing campaign for product launch
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">15 tasks</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Create New Project
          </button>
        </div>
      </div>
    </div>
  );
}