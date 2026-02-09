import type { Metadata } from "next";
import "./globals.css";
import "./styles/devtools.css";
import AuthProvider from "./auth-provider";
import { BrandProvider } from "@/contexts/BrandContext";
import UserAuthStatus from "@/components/UserAuthStatus";
import Link from "next/link";
import { DevToolsButton } from "@/components/devtools";
import DynamicLogo from "@/components/DynamicLogo";
import DynamicFooterText from "@/components/DynamicFooterText";

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
      <body className="min-h-screen bg-slate-900 antialiased">
        <BrandProvider>
          <AuthProvider>
          {/* Clean Navigation Header */}
          <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
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
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                      Tasks
                    </button>
                  </Link>
                  <Link href="#features">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                      Features
                    </button>
                  </Link>
                  <Link href="/security">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                      Security
                    </button>
                  </Link>
                  <Link href="/roadmap">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                      Roadmap
                    </button>
                  </Link>
                  <div className="relative group">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                      Resources
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-slate-800 rounded-lg shadow-lg border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link href="/docs">
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors first:rounded-t-lg">Documentation</span>
                      </Link>
                      <Link href="/help">
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Help Center</span>
                      </Link>
                      <Link href="/community">
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Community</span>
                      </Link>
                      <Link href="/api">
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors last:rounded-b-lg">API</span>
                      </Link>
                    </div>
                  </div>
                  <div className="relative group">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                      Company
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-slate-800 rounded-lg shadow-lg border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link href="/about">
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors first:rounded-t-lg">About</span>
                      </Link>
                      <Link href="/blog">
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Blog</span>
                      </Link>
                      <Link href="/careers">
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Careers</span>
                      </Link>
                      <Link href="/contact">
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors last:rounded-b-lg">Contact</span>
                      </Link>
                    </div>
                  </div>
                  <div className="relative group">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                      Legal
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-slate-800 rounded-lg shadow-lg border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link href="/privacy">
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors first:rounded-t-lg">Privacy</span>
                      </Link>
                      <Link href="/terms">
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Terms</span>
                      </Link>
                      <Link href="/cookies">
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors last:rounded-b-lg">Cookies</span>
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

          {/* Modern Footer */}
          <footer className="bg-slate-900/50 border-t border-white/10 relative overflow-hidden mt-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="container mx-auto px-4 py-16 relative z-10">
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
                  <h4 className="font-semibold mb-4 text-white">Product</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/tasks" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Tasks
                      </Link>
                    </li>
                    <li>
                      <Link href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link href="/security" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Security
                      </Link>
                    </li>
                    <li>
                      <Link href="/roadmap" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Roadmap
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-white">Resources</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/docs" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <Link href="/help" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Help Center
                      </Link>
                    </li>
                    <li>
                      <Link href="/community" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Community
                      </Link>
                    </li>
                    <li>
                      <Link href="/api" className="text-gray-400 hover:text-white transition-colors text-sm">
                        API
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-white">Company</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-white">Legal</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Terms
                      </Link>
                    </li>
                    <li>
                      <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Cookies
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
<p className="text-sm text-gray-400">
                   &copy; {new Date().getFullYear()} AuraFlow. All rights reserved.
                 </p>
<div className="flex items-center gap-4 text-sm text-gray-400">
                   <span>Crafted with</span>
                   <span className="text-red-500">♥</span>
                   <span>for high-performing teams</span>
                 </div>
              </div>
            </div>
          </footer>
          </AuthProvider>
        </BrandProvider>
      </body>
    </html>
  );
}
