import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Roadmap - TaskFlow",
  description: "See what's coming next for TaskFlow. Our product roadmap and upcoming features.",
};

const roadmapData = {
  released: [
    {
      title: "Core Task Management",
      description: "Create, edit, and organize tasks with priorities, categories, and due dates.",
      date: "Released",
      icon: "✅",
    },
    {
      title: "User Authentication",
      description: "Secure signup and login with JWT-based authentication.",
      date: "Released",
      icon: "✅",
    },
    {
      title: "Responsive Dashboard",
      description: "Beautiful, mobile-friendly interface for managing tasks on any device.",
      date: "Released",
      icon: "✅",
    },
    {
      title: "Task Analytics",
      description: "View task completion stats and productivity insights.",
      date: "Released",
      icon: "✅",
    },
  ],
  inProgress: [
    {
      title: "Team Collaboration",
      description: "Share tasks and collaborate with team members in real-time.",
      date: "Q1 2026",
      icon: "🚧",
    },
    {
      title: "Mobile App",
      description: "Native iOS and Android apps for task management on the go.",
      date: "Q2 2026",
      icon: "🚧",
    },
  ],
  planned: [
    {
      title: "AI-Powered Suggestions",
      description: "Smart task prioritization and time estimation using AI.",
      date: "Q3 2026",
      icon: "📋",
    },
    {
      title: "Integrations Hub",
      description: "Connect with Slack, GitHub, Google Calendar, and more.",
      date: "Q3 2026",
      icon: "📋",
    },
    {
      title: "Advanced Reporting",
      description: "Detailed analytics, custom reports, and data export capabilities.",
      date: "Q4 2026",
      icon: "📋",
    },
    {
      title: "Automation Workflows",
      description: "Create custom automation rules to streamline your workflow.",
      date: "Q4 2026",
      icon: "📋",
    },
  ],
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Product <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Roadmap</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what we're building and what's coming next. We're constantly improving TaskFlow to help you work smarter.
          </p>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            <span className="text-lg">✅</span>
            <span className="text-gray-300 text-sm">Released</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🚧</span>
            <span className="text-gray-300 text-sm">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📋</span>
            <span className="text-gray-300 text-sm">Planned</span>
          </div>
        </div>

        {/* Roadmap Sections */}
        <div className="space-y-16">
          {/* Released */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              Released
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roadmapData.released.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-white/10 rounded-xl p-6 hover:bg-slate-800/70 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* In Progress */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              In Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roadmapData.inProgress.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-white/10 rounded-xl p-6 hover:bg-slate-800/70 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <span className="text-xs text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-full">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Planned */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Planned
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roadmapData.planned.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-white/10 rounded-xl p-6 hover:bg-slate-800/70 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Have a feature request or feedback?</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
