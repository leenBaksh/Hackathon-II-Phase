'use client'

import { useState } from 'react'
import { ChatWidget } from '@/components/chatbot'

export default function ChatbotPage() {
  const [isChatOpen, setIsChatOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AuraFlow AI Assistant
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Your intelligent task management companion. Get help with creating tasks, setting reminders, 
            organizing your workflow, and boosting your productivity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Task Management</h3>
            <p className="text-gray-400 text-sm">Create, update, and organize your tasks with natural language commands.</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Reminders</h3>
            <p className="text-gray-400 text-sm">Never miss important deadlines with AI-powered reminders and scheduling.</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Productivity Analytics</h3>
            <p className="text-gray-400 text-sm">Get insights into your work patterns and suggestions for improvement.</p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">Chat with AuraFlow AI</h2>
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {isChatOpen ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Full-size chat widget */}
                <div className="lg:col-span-2">
                  <ChatWidget isOpen={true} isFloating={false} />
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">Chat is minimized. Click the arrow above to expand.</p>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
                >
                  Open Chat
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Start Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">💬</span>
                <div>
                  <h4 className="text-white font-medium">Natural Commands</h4>
                  <p className="text-gray-400 text-sm">Speak naturally: "Create a task for tomorrow's meeting"</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">📋</span>
                <div>
                  <h4 className="text-white font-medium">Quick Actions</h4>
                  <p className="text-gray-400 text-sm">Use quick buttons for common tasks</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">🎯</span>
                <div>
                  <h4 className="text-white font-medium">Smart Suggestions</h4>
                  <p className="text-gray-400 text-sm">Get AI-powered productivity tips</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-400 text-xl">📱</span>
                <div>
                  <h4 className="text-white font-medium">Mobile Friendly</h4>
                  <p className="text-gray-400 text-sm">Chat works on all devices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}