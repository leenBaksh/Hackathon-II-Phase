export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Team
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Meet the talented people building TaskFlow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">JD</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              John Doe
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              CEO & Founder
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Passionate about building tools that help teams achieve more
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">JS</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Jane Smith
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              CTO
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Architect of our scalable and intuitive platform
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">MJ</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Mike Johnson
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Head of Product
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Focused on creating the best user experience possible
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Join Our Team
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're always looking for talented people to join us
          </p>
          <a href="/careers" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            View Open Positions
          </a>
        </div>
      </div>
    </div>
  );
}