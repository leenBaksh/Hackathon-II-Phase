'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, yearly: 0 },
      features: [
        "Up to 50 tasks",
        "3 projects",
        "Basic task management",
        "Email support",
        "Mobile app access",
      ],
      cta: "Get Started Free",
      href: "/auth/register",
      popular: false,
    },
    {
      name: "Pro",
      description: "For growing teams",
      price: { monthly: 12, yearly: 120 },
      features: [
        "Unlimited tasks",
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "Team collaboration",
        "Custom workflows",
        "API access",
        "Integrations",
      ],
      cta: "Start Pro Trial",
      href: "/auth/register",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: { monthly: 49, yearly: 490 },
      features: [
        "Everything in Pro",
        "SSO & SAML",
        "Advanced security",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "On-premise option",
        "Audit logs",
      ],
      cta: "Contact Sales",
      href: "/contact",
      popular: false,
    },
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
            <h1 className="bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold text-transparent text-5xl mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include a 14-day free trial with no credit card required.
            </p>
          </div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center items-center gap-4 mb-12"
          >
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-white/60'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 bg-white/10 rounded-full p-1 transition-colors"
            >
              <motion.div
                className="w-6 h-6 bg-blue-500 rounded-full"
                animate={{ x: billingCycle === 'yearly' ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-white/60'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-500/20 text-green-400 text-xs font-medium px-2 py-1 rounded-full">
                Save 17%
              </span>
            )}
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 ${
                  plan.popular
                    ? 'border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 text-sm">{plan.description}</p>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-white text-5xl font-bold">
                      ${plan.price[billingCycle]}
                    </span>
                    <span className="text-white/60">/month</span>
                  </div>
                  {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                    <p className="text-white/60 text-sm mt-2">
                      Billed annually (${plan.price.yearly}/year)
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-400 mr-3 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block w-full text-center font-medium py-3 rounded-lg transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "Can I change plans at any time?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any payments."
                },
                {
                  question: "What happens after the free trial?",
                  answer: "After your 14-day trial, you can choose to subscribe to a paid plan or continue with our free tier with limited features."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked."
                },
                {
                  question: "Is there a discount for nonprofits?",
                  answer: "Yes! We offer 50% off for verified nonprofit organizations. Contact our sales team for details."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-white/60 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-white/80 mb-8">
              Our team is here to help you find the perfect plan for your needs.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-lg border border-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
