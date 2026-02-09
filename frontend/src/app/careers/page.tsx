import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers - TaskFlow",
  description: "Join the TaskFlow team and help shape the future of productivity software.",
};

const openPositions = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build beautiful, accessible user interfaces using React and TypeScript.",
  },
  {
    id: 2,
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Design and implement scalable APIs and services with Python and FastAPI.",
  },
  {
    id: 3,
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create intuitive and beautiful user experiences that delight our users.",
  },
  {
    id: 4,
    title: "Developer Advocate",
    department: "Developer Relations",
    location: "Remote",
    type: "Full-time",
    description: "Build community and help developers get the most out of TaskFlow.",
  },
];

const values = [
  {
    icon: "🎯",
    title: "User First",
    description: "Every decision we make starts with understanding our users' needs.",
  },
  {
    icon: "⚡",
    title: "Ship Fast",
    description: "We believe in rapid iteration and continuous improvement.",
  },
  {
    icon: "🤝",
    title: "Open Communication",
    description: "We value transparency and direct feedback in everything we do.",
  },
  {
    icon: "🌱",
    title: "Grow Together",
    description: "We invest in our team's growth and celebrate collective wins.",
  },
];

const benefits = [
  {
    icon: "🏠",
    title: "Remote-First",
    description: "Work from anywhere in the world. We're fully distributed.",
  },
  {
    icon: "💰",
    title: "Competitive Salary",
    description: "We offer top-tier compensation adjusted for your location.",
  },
  {
    icon: "🏥",
    title: "Health Benefits",
    description: "Comprehensive health coverage for you and your family.",
  },
  {
    icon: "📚",
    title: "Learning Budget",
    description: "$2,000 annual budget for courses, conferences, and books.",
  },
  {
    icon: "🏖️",
    title: "Unlimited PTO",
    description: "Take the time you need to recharge and stay productive.",
  },
  {
    icon: "💻",
    title: "Equipment Budget",
    description: "$3,000 setup budget for your home office.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join the <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">TaskFlow</span> Team
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            We&apos;re building the future of productivity software. Help us transform how teams work together and achieve more.
          </p>
          <Link
            href="#open-positions"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30"
          >
            View Open Positions
          </Link>
        </div>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-white/10 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-colors"
              >
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3 className="font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-slate-800/50 border border-white/10 rounded-xl p-6 hover:bg-slate-800/70 transition-colors"
              >
                <span className="text-3xl">{benefit.icon}</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="mb-20 scroll-mt-24">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Open Positions</h2>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <div
                key={position.id}
                className="bg-slate-800/50 border border-white/10 rounded-xl p-6 hover:bg-slate-800/70 hover:border-white/20 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{position.title}</h3>
                      <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full">
                        {position.department}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{position.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        📍 {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏰ {position.type}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/careers/${position.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors whitespace-nowrap"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">Don&apos;t See Your Role?</h2>
            <p className="text-gray-400 mb-6">
              We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind for future opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all shadow-lg shadow-purple-500/30"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
