export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Company
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Learn more about the team behind TaskFlow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              About Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our mission is to help teams achieve more through better task management
            </p>
            <a href="/about" className="text-blue-600 hover:text-blue-700 font-medium">
              Learn More →
            </a>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Team
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Meet the talented people building TaskFlow
            </p>
            <a href="/team" className="text-blue-600 hover:text-blue-700 font-medium">
              Meet the Team →
            </a>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Careers
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Join us and help shape the future of productivity
            </p>
            <a href="/careers" className="text-blue-600 hover:text-blue-700 font-medium">
              View Open Positions →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}