export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Cookie Policy
          </h1>
          
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                What Are Cookies
              </h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                How We Use Cookies
              </h2>
              <p>
                We use cookies to remember your preferences, analyze traffic, and personalize content 
                to improve your experience on our site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Managing Cookies
              </h2>
              <p>
                You can control and manage cookies through your browser settings. Please note that 
                disabling certain cookies may affect the functionality of our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Contact Us
              </h2>
              <p>
                If you have any questions about our use of cookies, please contact us at 
                support@taskflow.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}