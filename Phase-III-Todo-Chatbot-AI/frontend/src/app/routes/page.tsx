'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RoutesPage() {
  const routes = [
    { path: '/', name: 'Home', description: 'Landing page with hero section' },
    { path: '/dashboard', name: 'Dashboard', description: 'Main dashboard with task overview' },
    { path: '/tasks', name: 'Tasks', description: 'Task management interface' },
    { path: '/tasks/create', name: 'Create Task', description: 'Create a new task' },
    { path: '/auth/login', name: 'Login', description: 'User login page' },
    { path: '/auth/register', name: 'Register', description: 'User registration page' },
    { path: '/auth/forgot-password', name: 'Forgot Password', description: 'Password recovery' },
    { path: '/analytics', name: 'Analytics', description: 'Task analytics and insights' },
    { path: '/test-api', name: 'API Test', description: 'Test API connectivity' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Available Routes
          </h1>
          <p className="text-gray-400 text-lg">
            Navigate to any page using the links below
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {routes.map((route, index) => (
            <motion.div
              key={route.path}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Link href={route.path}>
                <div className="bg-gradient-to-br from-gray-900 to-slate-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {route.name}
                    </h3>
                    <div className="text-2xl text-gray-500 group-hover:text-blue-400 transition-colors">
                      →
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors mb-3">
                    {route.description}
                  </p>
                  <div className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                    {route.path}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}