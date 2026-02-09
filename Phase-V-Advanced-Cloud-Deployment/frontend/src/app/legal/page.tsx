export default function LegalPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Legal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Important legal information about TaskFlow
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-1 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Privacy Policy
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                How we collect, use, and protect your data
              </p>
              <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                Read Privacy Policy →
              </a>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Terms of Service
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The terms and conditions for using TaskFlow
              </p>
              <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                Read Terms of Service →
              </a>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Cookie Policy
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                How we use cookies and similar technologies
              </p>
              <a href="/cookies" className="text-blue-600 hover:text-blue-700 font-medium">
                Read Cookie Policy →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}