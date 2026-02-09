export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover the powerful features that make TaskFlow the perfect task management solution
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Task Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create, organize, and track tasks with our intuitive interface
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Analytics Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get insights into your productivity with detailed analytics
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Team Collaboration
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Work together with your team in real-time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}