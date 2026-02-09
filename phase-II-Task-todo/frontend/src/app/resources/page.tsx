export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to get the most out of TaskFlow
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Documentation
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Comprehensive guides to help you master TaskFlow
            </p>
            <a href="/docs" className="text-blue-600 hover:text-blue-700 font-medium">
              View Documentation →
            </a>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Tutorials
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Step-by-step tutorials for common workflows
            </p>
            <a href="/tutorials" className="text-blue-600 hover:text-blue-700 font-medium">
              Browse Tutorials →
            </a>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Blog
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Tips, tricks, and best practices for productivity
            </p>
            <a href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
              Read Latest Posts →
            </a>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Support
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get help from our support team
            </p>
            <a href="/help" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact Support →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}