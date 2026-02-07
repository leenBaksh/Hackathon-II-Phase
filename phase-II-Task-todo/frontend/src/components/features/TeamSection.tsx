// frontend/src/components/features/TeamSection.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations';

interface TeamMember {
  id: string;
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
    role: 'UX Designer',
    avatar: 'SC',
    status: 'busy',
    email: 'sarah@taskflow.com',
    lastActive: '5 min ago'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Frontend Developer',
    avatar: 'MJ',
    status: 'online',
    email: 'mike@taskflow.com',
    lastActive: 'Active now'
  },
  {
    id: '4',
    name: 'Emily Davis',
    role: 'Backend Developer',
    avatar: 'ED',
    status: 'offline',
    email: 'emily@taskflow.com',
    lastActive: '2 hours ago'
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
];

interface TeamSectionProps {
  className?: string;
  title?: string;
  description?: string;
}

export default function TeamSection({ className = '', title, description }: TeamSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'collaboration'>('overview');

  const displayedMembers = showAll ? MOCK_TEAM : MOCK_TEAM.slice(0, 3);

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
            {(['overview', 'members', 'collaboration'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedMembers.map((member) => (
                  <StaggerItem key={member.id}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-blue-400/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {member.avatar}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{member.name}</h3>
                            <p className="text-gray-400 text-sm">{member.role}</p>
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(member.status)}`} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span className="text-blue-400">📧</span>
                          {member.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span className="text-green-400">🕒</span>
                          {member.lastActive}
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {MOCK_TEAM.length > 3 && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    {showAll ? 'Show Less' : `Show All (${MOCK_TEAM.length})`}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'members' && (
            <motion.div
              key="members"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Team Members</h3>
                <p className="text-gray-400">Detailed team member management coming soon</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'collaboration' && (
            <motion.div
              key="collaboration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Collaboration Tools</h3>
                <p className="text-gray-400">Real-time collaboration features coming soon</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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