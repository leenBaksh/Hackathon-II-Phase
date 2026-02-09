'use client';

import { motion } from 'framer-motion';

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Build integrations with our RESTful API
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Authentication
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              All API requests require authentication using JWT tokens.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`curl -X POST http://localhost:8000/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "yourpassword"}'`}
              </pre>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Base URL
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              All API endpoints are relative to the base URL.
            </p>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 text-sm">
{`Base URL: http://localhost:8000/api

# Health Check
GET /health

# Auth Endpoints
POST /auth/register
POST /auth/login

# Tasks Endpoints
GET /tasks
POST /tasks
GET /tasks/{id}
PUT /tasks/{id}
DELETE /tasks/{id}
PATCH /tasks/{id}/complete`}
              </pre>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Example: Creating a Task
          </h2>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`curl -X POST http://localhost:8000/api/tasks \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Sample Task",
    "description": "This is a sample task description",
    "completed": false
  }'`}
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
