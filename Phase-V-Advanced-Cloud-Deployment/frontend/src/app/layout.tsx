import type { Metadata } from "next";
import "./globals.css";
import "./styles/devtools.css";
import AppAuthProvider from "./auth-provider";
import { BrandProvider } from "@/contexts/BrandContext";
import UserAuthStatus from "@/components/UserAuthStatus";
import Link from "next/link";
import { DevToolsButton } from "@/components/devtools";
import DynamicLogo from "@/components/DynamicLogo";
import DynamicFooterText from "@/components/DynamicFooterText";
import { ChatWidget } from "@/components/chatbot";

export const metadata: Metadata = {
  title: "AuraFlow - Transform Your Workflow",
  description: "The modern platform for task management and flow state. Flow through tasks, achieve goals, reduce stress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 antialiased">
        <BrandProvider>
          <AppAuthProvider>
          {/* Clean Navigation Header */}
          <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16 relative">
                {/* Logo - Prominently Featured */}
                <div className="flex-1 flex justify-start">
                   <Link href="/" className="flex items-center gap-3 group">
                     <DynamicLogo size="lg" showText={true} className="hover:opacity-90 transition-all duration-300 group-hover:scale-105" />
                   </Link>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                   <Link href="/tasks">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
                      Tasks
                    </button>
                  </Link>
                  <Link href="#features">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
                      Features
                    </button>
                  </Link>
                  <Link href="/security">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
                      Security
                    </button>
                  </Link>
                  <Link href="/roadmap">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
                      Roadmap
                    </button>
                  </Link>
                  <Link href="/chatbot">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      AI Assistant
                    </button>
                  </Link>
                  <div className="relative group">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
                      Resources
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-slate-900 rounded-lg shadow-lg border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link href="/docs">
                        <span className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors first:rounded-t-lg">Documentation</span>
                      </Link>
                      <Link href="/help">
                        <span className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">Help Center</span>
                      </Link>
                      <Link href="/community">
                        <span className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">Community</span>
                      </Link>
                      <Link href="/api">
                        <span className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors last:rounded-b-lg">API</span>
                      </Link>
                    </div>
                  </div>
                  <div className="relative group">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
                      Company
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-slate-900 rounded-lg shadow-lg border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link href="/about">
                        <span className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors first:rounded-t-lg">About</span>
                      </Link>
                      <Link href="/blog">
                        <span className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">Blog</span>
                      </Link>
                      <Link href="/careers">
                        <span className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">Careers</span>
                      </Link>
                      <Link href="/contact">
                        <span className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors last:rounded-b-lg">Contact</span>
                      </Link>
                    </div>
                  </div>
                  <div className="relative group">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
                      Legal
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-slate-900 rounded-lg shadow-lg border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link href="/privacy">
                        <span className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors first:rounded-t-lg">Privacy</span>
                      </Link>
                      <Link href="/terms">
                        <span className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">Terms</span>
                      </Link>
                      <Link href="/cookies">
                        <span className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors last:rounded-b-lg">Cookies</span>
                      </Link>
                    </div>
                  </div>
                </nav>

                {/* User Actions */}
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <UserAuthStatus />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Development Tools - Only in development */}
          {process.env.NODE_ENV === 'development' && <DevToolsButton>Toggle DevTools</DevToolsButton>}

          {/* Chatbot Widget - Floating across all pages */}
          <ChatWidget />

          {/* Modern Footer */}
          <footer className="bg-slate-950 border-t border-slate-800 relative overflow-hidden mt-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="lg:col-span-2">
                  <Link href="/" className="flex items-center gap-3 mb-6 group">
                    <DynamicLogo size="xl" showText={true} className="hover:opacity-90 transition-all duration-300 group-hover:scale-105" />
                  </Link>
                  <DynamicFooterText />
                </div>

                {/* Links */}
                <div>
                  <h4 className="font-semibold mb-4 text-slate-200 text-sm uppercase tracking-wider">Product</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/tasks" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Tasks
                      </Link>
                    </li>
                    <li>
                      <Link href="#features" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link href="/security" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Security
                      </Link>
                    </li>
                    <li>
                      <Link href="/roadmap" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Roadmap
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-slate-200 text-sm uppercase tracking-wider">Resources</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/docs" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <Link href="/help" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link href="/community" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Community
                      </Link>
                    </li>
                    <li>
                      <Link href="/api" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        API
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-slate-200 text-sm uppercase tracking-wider">Company</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/about" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-slate-200 text-sm uppercase tracking-wider">Legal</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/privacy" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Terms
                      </Link>
                    </li>
                    <li>
                      <Link href="/cookies" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                        Cookies
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-slate-500">
                  © {new Date().getFullYear()} AuraFlow. All rights reserved.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>Crafted with</span>
                  <span className="text-indigo-500">♥</span>
                  <span>for high-performing teams</span>
                </div>
              </div>
            </div>
          </footer>
          </AppAuthProvider>
        </BrandProvider>
      </body>
    </html>
  );
}
