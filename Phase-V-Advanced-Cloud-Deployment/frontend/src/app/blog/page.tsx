import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - TaskFlow",
  description: "Insights, tips, and updates from the TaskFlow team. Learn about productivity, task management, and product updates.",
};

const blogPosts = [
  {
    id: 1,
    title: "5 Productivity Hacks for Remote Teams",
    excerpt: "Discover proven strategies to boost your team's productivity while working remotely. From async communication to focused work sessions.",
    category: "Productivity",
    date: "Feb 5, 2026",
    readTime: "5 min read",
    author: "Sarah Chen",
    authorRole: "Product Lead",
    featured: true,
  },
  {
    id: 2,
    title: "Introducing TaskFlow Analytics",
    excerpt: "Get deeper insights into your task completion patterns with our new analytics dashboard. Track trends and optimize your workflow.",
    category: "Product Updates",
    date: "Feb 1, 2026",
    readTime: "3 min read",
    author: "Mike Johnson",
    authorRole: "Engineering",
  },
  {
    id: 3,
    title: "The Science of Task Prioritization",
    excerpt: "Learn how to prioritize effectively using the Eisenhower Matrix and other proven frameworks. Stop feeling overwhelmed by your todo list.",
    category: "Guides",
    date: "Jan 28, 2026",
    readTime: "7 min read",
    author: "Emily Davis",
    authorRole: "Content Strategist",
  },
  {
    id: 4,
    title: "Team Collaboration Best Practices",
    excerpt: "Effective collaboration is key to team success. Here are the communication patterns and tools that high-performing teams use.",
    category: "Teamwork",
    date: "Jan 20, 2026",
    readTime: "6 min read",
    author: "Sarah Chen",
    authorRole: "Product Lead",
  },
  {
    id: 5,
    title: "Building a Culture of Accountability",
    excerpt: "How to create a team culture where everyone owns their tasks and delivers consistently without micromanagement.",
    category: "Leadership",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    author: "David Park",
    authorRole: "CEO",
  },
  {
    id: 6,
    title: "TaskFlow vs Traditional Tools: A Comparison",
    excerpt: "See how TaskFlow stacks up against traditional task management tools and why teams are making the switch.",
    category: "Product Updates",
    date: "Jan 10, 2026",
    readTime: "4 min read",
    author: "Mike Johnson",
    authorRole: "Engineering",
  },
];

const categories = ["All", "Product Updates", "Productivity", "Guides", "Teamwork", "Leadership"];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            TaskFlow <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights, tips, and updates to help you and your team work smarter.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                index === 0
                  ? "bg-blue-500 text-white"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <Link href={`/blog/${featuredPost.id}`} className="block group">
              <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 h-64 md:h-full flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl">📝</span>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                        {featuredPost.category}
                      </span>
                      <span className="text-xs text-gray-500">{featuredPost.date}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-400 mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                          {featuredPost.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{featuredPost.author}</p>
                          <p className="text-xs text-gray-500">{featuredPost.authorRole}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block group">
              <article className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden hover:bg-slate-800/70 hover:border-white/20 transition-all h-full flex flex-col">
                <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <span className="text-5xl">📄</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-400">{post.author}</span>
                    </div>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
            <p className="text-gray-400 mb-6">
              Get the latest productivity tips and product updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
