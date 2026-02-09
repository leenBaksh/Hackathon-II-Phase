export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get the support you need to succeed with TaskFlow
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  How do I create my first task?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Simply click the "New Task" button and fill in the details.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  Can I invite team members?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, you can invite team members from the settings page.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  Is my data secure?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We use industry-standard encryption to protect your data.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Contact Support
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="space-y-4">
              <a href="mailto:support@taskflow.com" className="block text-blue-600 hover:text-blue-700 font-medium">
                Email: support@taskflow.com
              </a>
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  Response time: Within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Popular Topics
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/docs" className="text-blue-600 hover:text-blue-700 font-medium">
              Getting Started →
            </a>
            <a href="/tutorials" className="text-blue-600 hover:text-blue-700 font-medium">
              Tutorials →
            </a>
            <a href="/features" className="text-blue-600 hover:text-blue-700 font-medium">
              Features Guide →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}