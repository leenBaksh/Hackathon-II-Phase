export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Messages
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Stay connected with your team
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Conversations
              </h3>
              <div className="space-y-2">
                <div className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="font-medium text-gray-900 dark:text-white">John Doe</div>
                  <div className="text-sm text-gray-500 truncate">Hey, can you review the...</div>
                </div>
                <div className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="font-medium text-gray-900 dark:text-white">Jane Smith</div>
                  <div className="text-sm text-gray-500 truncate">The project is ready for...</div>
                </div>
                <div className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <div className="font-medium text-gray-900 dark:text-white">Team Chat</div>
                  <div className="text-sm text-gray-500 truncate">Mike: Great work today!</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">JD</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                  <p className="text-sm text-gray-500">Active now</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">JD</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg max-w-md">
                    <p className="text-gray-900 dark:text-white">Hey, can you review the latest designs?</p>
                  </div>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <div className="bg-blue-500 text-white p-3 rounded-lg max-w-md">
                    <p>Sure! I'll take a look right now.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}