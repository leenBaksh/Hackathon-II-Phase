export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tutorials
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Step-by-step guides to master TaskFlow
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Your First Task
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn how to create your first task and set up your workspace
            </p>
            <span className="text-sm text-blue-600 font-medium">5 min read</span>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Team Collaboration
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Invite team members and start collaborating on projects
            </p>
            <span className="text-sm text-blue-600 font-medium">8 min read</span>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Using Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Track your productivity and optimize your workflow
            </p>
            <span className="text-sm text-blue-600 font-medium">6 min read</span>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Advanced Features
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover powerful features for power users
            </p>
            <span className="text-sm text-blue-600 font-medium">10 min read</span>
          </div>
        </div>
      </div>
    </div>
  );
}