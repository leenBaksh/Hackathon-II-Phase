// frontend/src/components/features/TeamSection.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy' | 'available';
  email: string;
  lastActive: string;
}

const MOCK_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    role: 'Project Manager',
    avatar: 'AT',
    status: 'online',
    email: 'alex@taskflow.com',
    lastActive: 'Active now'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Senior Developer',
    avatar: 'SC',
    status: 'online',
    email: 'sarah@taskflow.com',
    lastActive: '2 hours ago'
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    role: 'Designer',
    avatar: 'MJ',
    status: 'offline',
    email: 'marcus@taskflow.com',
    lastActive: 'Yesterday'
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    role: 'Product Owner',
    avatar: 'ER',
    status: 'busy',
    email: 'emily@taskflow.com',
    lastActive: 'In a meeting'
  },
  {
    id: '5',
    name: 'David Kim',
    role: 'Full Stack Developer',
    avatar: 'DK',
    status: 'available',
    email: 'david@taskflow.com',
    lastActive: 'Never joined'
  }
  },
];

interface TeamSectionProps {
  className?: string;
  title?: string;
  description?: string;
}

export default function TeamSection({ className = '', title, description }: TeamSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'collaboration'>('overview');

  return (
    <AnimatedSection>
      <div className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 ${className}`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{title || 'Team Collaboration'}</h2>
            {description && (
              <p className="text-gray-300 text-lg leading-relaxed">
                {description}
              </p>
            )}
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'members', label: 'Members', icon: '👥' },
              { id: 'collaboration', label: 'Collaboration', icon: '🤝' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm">{tab.icon}</span>
                <span className="ml-2">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {activeTab === 'overview' && (
              <StaggerContainer className="space-y-6">
                <StaggerItem>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StaggerItem>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">Team Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-blue-400">{MOCK_TEAM.length}</div>
                            <div className="text-sm text-gray-300 mb-2">Team Members</div>
                          </div>
                          <div className="text-4xl font-bold text-purple-400">
                            {MOCK_TEAM.filter(m => m.status === 'online').length}
                          </div>
                          <div className="text-4xl font-bold text-green-400">
                            {MOCK_TEAM.filter(m => m.status === 'available').length}
                          </div>
                        </div>
                        <div className="text-4xl font-bold text-yellow-400">
                          {MOCK_TEAM.filter(m => m.status === 'busy').length}
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Stats */}
                      <StaggerItem>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                          <h3 className="text-xl font-semibold text-white mb-4">Productivity Metrics</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm text-gray-400">Tasks Today</div>
                                <div className="text-2xl font-bold text-white">24</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm text-gray-400">Completed</div>
                                <div className="text-2xl font-bold text-green-400">18</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm text-gray-400">In Progress</div>
                                <div className="text-2xl font-bold text-blue-400">6</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm text-gray-400">Efficiency Rate</div>
                                <div className="text-2xl font-bold text-purple-400">92%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                      
                      {/* Recent Activity */}
                      <StaggerItem>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                          <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                          <div className="space-y-3">
                            {MOCK_TEAM.map((member) => (
                              <div key={member.id} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-gray-200 hover:bg-gray-50 transition-colors">
                                <div className="relative">
                                  <div className={`w-10 h-10 rounded-full ${getStatusColor(member.status)}`}>
                                    {member.avatar}
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-white">{member.name}</div>
                                    <div className="text-xs text-gray-400 text-left">{member.role}</div>
                                  </div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300 opacity-20"></div>
                              </div>
                            ))}
                          )}
                        </StaggerItem>
                    </StaggerContainer>
                )}
              )}
            
            {activeTab === 'members' && (
              <StaggerContainer className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Team Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_TEAM.map((member, index) => (
                    <StaggerItem key={member.id}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 border border-white/20 transition-colors group"
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className={`w-12 h-12 rounded-full ${getStatusColor(member.status)}`}>
                              {member.avatar}
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 6L9 17l-4 11L3.66 13.5L2.34 2m0 11.58l2.34 2 0 12.58z" />
                              </svg>
                            </div>
                            </div>
                            <div className="ml-3">
                              <div>
                                <div className="text-sm font-medium text-white">{member.name}</div>
                                <div className="text-xs text-gray-400 text-left">{member.role}</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Online Status Indicator */}
                          <div className={`absolute top-0 right-0 w-3 h-3 rounded-full ${getStatusColor(member.status)} animate-pulse`}>
                            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                          
                          {/* Contact Options */}
                          <div className="flex gap-2">
                            <motion.button
                              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8m0-2l8 16m0 16h16m-16v32M4 6h11l-8 8 0 0-2z" />
                              </svg>
                            </motion.button>
                            <motion.button
                              className="p-1 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12v8h12M7 3v4h6h4H4a1 1 0 0110h4a1 1 0 0 010-4M9 3v18h-4z" />
                              </svg>
                            </motion.button>
                            
                            <motion.a
                              href={`mailto:${member.email}`}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8.05a8.05 0 0 1101.595-1.04l.3.402 2.417 0 004 0zm-1.804-.322 2.444-2.492 1.04-2.25 3.242 3.242a1 1 0 010-4M7 3v10.755m0 0l1 0-1.832l1.832 0-1.628z" />
                              </svg>
                            </motion.a>
                          </div>
                          </div>
                        </motion.div>
                      </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
              
              {/* Show All Members Button */}
              {!showAll && (
                <StaggerItem>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-center mt-8"
                  >
                    <motion.button
                      onClick={() => setShowAll(true)}
                      className="px-6 py-3 bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white transition-colors rounded-lg font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View All Members ({MOCK_TEAM.length})
                    </motion.button>
                  </motion.div>
                </StaggerItem>
              )}
              {showAll && (
                <div className="space-y-6">
                  <StaggerContainer>
                    {MOCK_TEAM.map((member) => (
                      <StaggerItem key={member.id}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 + Math.random() * 0.1, duration: 0.5 }}
                          className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className={`w-12 h-12 rounded-full ${getStatusColor(member.status)}`}>
                                {member.avatar}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-white">{member.name}</div>
                                <div className="text-xs text-gray-400 text-left">{member.role}</div>
                              </div>
                            </div>
                          
                          {/* Contact Options */}
                          <div className="flex gap-2">
                            <motion.button
                              className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8m0-2l8 16m0 16h16m-16v32M4 6h11l-8 8 0 0-2z" />
                              </svg>
                            </motion.button>
                            <motion.button
                              className="p-1 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12v8h12M7 3v4h6h4H4a1 1 0 0110h4a1 1 0 010-4M9 3v18h-4z" />
                              </svg>
                            </motion.button>
                            
                            <motion.a
                              href={`mailto:${member.email}`}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8.05a8.05 0 01101.595-1.04l3.402 2.417 0 004 0zm-1.804-.322 2.444-2.492 1.04-2.25 3.242 3.242a1 1 0 010-4M7 3v10.755m0 0l1 0-1.832l1.832 0-1.628z" />
                              </svg>
                            </motion.a>
                          </div>
                          </div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'online': return 'bg-green-500';
    case 'offline': return 'bg-gray-400';
    case 'busy': return 'bg-yellow-500';
    case 'available': return 'bg-blue-500';
    default: return 'bg-purple-500';
  }
}