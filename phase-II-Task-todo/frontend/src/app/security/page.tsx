'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function Security() {
  const securityFeatures = [
    {
      icon: "🔐",
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your sensitive information is protected at every layer."
    },
    {
      icon: "🛡️",
      title: "SOC 2 Type II Compliant",
      description: "We undergo regular third-party audits to maintain SOC 2 Type II compliance, ensuring your data is handled according to the highest security standards."
    },
    {
      icon: "🔍",
      title: "Regular Security Audits",
      description: "Our infrastructure and codebase undergo continuous penetration testing and vulnerability assessments by leading security firms."
    },
    {
      icon: "📋",
      title: "GDPR & CCPA Compliant",
      description: "We respect your privacy rights. Full compliance with GDPR, CCPA, and other global privacy regulations. Export or delete your data anytime."
    },
    {
      icon: "🔑",
      title: "Advanced Authentication",
      description: "Support for SSO, SAML 2.0, and multi-factor authentication (MFA). Enterprise-grade access control with role-based permissions."
    },
    {
      icon: "💾",
      title: "Automated Backups",
      description: "Your data is backed up daily with point-in-time recovery. We maintain 99.99% uptime with redundant infrastructure across multiple regions."
    }
  ];

  const certifications = [
    { name: "SOC 2 Type II", status: "Certified" },
    { name: "ISO 27001", status: "Certified" },
    { name: "GDPR", status: "Compliant" },
    { name: "CCPA", status: "Compliant" },
    { name: "HIPAA", status: "Enterprise" },
    { name: "PCI DSS", status: "Level 1" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block bg-green-500/20 rounded-full p-4 mb-6"
            >
              <span className="text-4xl">🔒</span>
            </motion.div>
            <h1 className="bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold text-transparent text-5xl mb-4">
              Security First
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
              Your data security is our top priority. TaskFlow employs enterprise-grade security measures to protect your information at every level.
            </p>
          </div>

          {/* Security Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Certifications & Compliance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                  className="text-center"
                >
                  <div className="bg-white/10 rounded-lg p-4 mb-2">
                    <span className="text-green-400 text-2xl">✓</span>
                  </div>
                  <h4 className="font-semibold text-white text-sm">{cert.name}</h4>
                  <p className="text-white/60 text-xs">{cert.status}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Data Protection Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Data Protection</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">Zero Data Sharing</h4>
                    <p className="text-white/60 text-sm">We never sell or share your data with third parties.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">Data Portability</h4>
                    <p className="text-white/60 text-sm">Export all your data anytime in standard formats.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">Right to Deletion</h4>
                    <p className="text-white/60 text-sm">Request complete data deletion at any time.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Infrastructure Security</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">Multi-Region Hosting</h4>
                    <p className="text-white/60 text-sm">Data centers in US, EU, and Asia-Pacific regions.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">DDoS Protection</h4>
                    <p className="text-white/60 text-sm">Enterprise-grade DDoS mitigation and rate limiting.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">24/7 Monitoring</h4>
                    <p className="text-white/60 text-sm">Continuous security monitoring and incident response.</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Security Report Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Security Transparency
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                We believe in transparency. Download our latest security reports and compliance documentation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg border border-white/20 transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  SOC 2 Report
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg border border-white/20 transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Penetration Test
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg border border-white/20 transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Privacy Policy
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Security Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Report a Security Issue
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Found a vulnerability? We appreciate your help in keeping TaskFlow secure. Report security issues to our team.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/contact"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors"
              >
                Contact Security Team
              </Link>
              <a
                href="mailto:security@taskflow.com"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-lg border border-white/20 transition-colors"
              >
                security@taskflow.com
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
