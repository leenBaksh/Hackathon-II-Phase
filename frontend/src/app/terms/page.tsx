import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - TaskFlow",
  description: "Terms of Service and User Agreement for TaskFlow.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Service</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: February 7, 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or using TaskFlow&apos;s services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              TaskFlow provides a web-based task management platform designed to help individuals and teams organize, track, and complete their work efficiently.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with reasonable notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              To use TaskFlow, you must create an account and provide accurate, complete information. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your account information remains accurate</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Copy, modify, or distribute any content without permission</li>
              <li>Use automated systems to access the service without authorization</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">5. User Content</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You retain ownership of all content you create, store, or share through TaskFlow (&quot;User Content&quot;). By using our services, you grant us a license to use, store, and process your content solely to provide our services.
            </p>
            <p className="text-gray-300 leading-relaxed">
              You are responsible for ensuring you have all necessary rights to share your User Content and that it does not infringe on any third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">6. Subscription and Payments</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Some features require a paid subscription. By subscribing, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Pay all fees associated with your chosen plan</li>
              <li>Automatic renewal unless cancelled before the renewal date</li>
              <li>Provide valid payment information and keep it updated</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              Refunds are available within 14 days of purchase for annual plans and 7 days for monthly plans.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              TaskFlow, including our logo, trademarks, website design, and software, are protected by intellectual property laws. You may not use our trademarks or copyrighted materials without express written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">8. Disclaimers</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We do not warrant that the service will be uninterrupted, timely, secure, or error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              IN NO EVENT SHALL TASKFLOW, ITS OFFICERS, DIRECTORS, OR EMPLOYERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
            <p className="text-gray-300 leading-relaxed">
              We may terminate or suspend your account at any time for violations of these Terms. Upon termination, your right to use the service will immediately cease. You may also cancel your account at any time through your account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the service. Continued use after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 bg-slate-800/50 border border-white/10 rounded-xl p-6">
              <p className="text-gray-300">
                <strong className="text-white">Email:</strong> legal@taskflow.example.com<br />
                <strong className="text-white">Address:</strong> 123 Productivity Way, San Francisco, CA 94102
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
