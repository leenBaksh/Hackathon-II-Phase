'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold text-transparent text-5xl mb-4">
              About TaskFlow
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              The modern task management solution built for today's high-performing teams
            </p>
          </div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
          >
            <h2 className="font-bold text-white text-3xl mb-4">Our Mission</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              TaskFlow was born from a simple observation: traditional task management tools weren't keeping pace with modern workflows. We're on a mission to transform how teams organize, track, and complete their work through intelligent automation, seamless collaboration, and beautiful design.
            </p>
            <p className="text-white/80 leading-relaxed">
              We believe that great tools should disappear into the background, letting teams focus on what matters most—delivering exceptional results.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 mb-8"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="font-bold text-white text-2xl mb-4">Core Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span className="text-white/80">Intuitive task creation and management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span className="text-white/80">Real-time collaboration and updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span className="text-white/80">Smart notifications and reminders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span className="text-white/80">Advanced filtering and search</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span className="text-white/80">Customizable workflows and labels</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="font-bold text-white text-2xl mb-4">Technology Stack</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">⚡</span>
                  <span className="text-white/80">Next.js 16+ with App Router</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">⚡</span>
                  <span className="text-white/80">Python FastAPI backend</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">⚡</span>
                  <span className="text-white/80">Neon Serverless PostgreSQL</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">⚡</span>
                  <span className="text-white/80">Better Auth authentication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">⚡</span>
                  <span className="text-white/80">SQLModel for database operations</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Development Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
          >
            <h2 className="font-bold text-white text-3xl mb-4">Spec-Driven Development</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              TaskFlow is built using the Agentic Dev Stack workflow with Spec-Driven Development (SDD). This approach ensures:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-500/20 rounded-lg p-4 mb-3">
                  <span className="text-blue-400 text-2xl">📋</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Write Specs</h4>
                <p className="text-white/60 text-sm">Detailed specifications guide every feature</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500/20 rounded-lg p-4 mb-3">
                  <span className="text-purple-400 text-2xl">🏗️</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Generate Plans</h4>
                <p className="text-white/60 text-sm">Architecture plans ensure scalable design</p>
              </div>
              <div className="text-center">
                <div className="bg-green-500/20 rounded-lg p-4 mb-3">
                  <span className="text-green-400 text-2xl">🤖</span>
                </div>
                <h4 className="font-semibold text-white mb-2">AI Implementation</h4>
                <p className="text-white/60 text-sm">Claude Code executes development tasks</p>
              </div>
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
          >
            <h2 className="font-bold text-white text-3xl mb-6">Built With Passion</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              TaskFlow is created by developers who understand the challenges of modern project management. We've experienced the pain points of scattered tasks, missed deadlines, and communication gaps firsthand.
            </p>
            <p className="text-white/80 leading-relaxed">
              This project demonstrates the power of AI-assisted development and spec-driven workflows, serving as both a practical tool and a reference implementation for modern web applications.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="font-bold text-white text-3xl mb-4">Ready to Get Started?</h2>
            <p className="text-white/80 mb-8">
              Join thousands of teams already using TaskFlow to streamline their workflow and boost productivity.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors"
              >
                Sign Up Free
              </Link>
              <Link
                href="/tasks"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-lg border border-white/20 transition-colors"
              >
                View Demo
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}