'use client';

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations";
import AnimatedParticles from "@/components/AnimatedParticles";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SmoothScroll from "@/components/ui/SmoothScroll";

import { SkeletonCard, SkeletonStats, SkeletonWelcome } from "@/components/ui/Skeleton";
import DynamicLogo from "@/components/DynamicLogo";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const features = [
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Lightning Fast",
      description: "Experience zero latency with our optimized real-time sync technology. Your tasks update instantly across all devices.",
      color: "from-yellow-400 to-orange-500",
      delay: 0,
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Enterprise Security",
      description: "Bank-grade encryption protects your data. Two-factor authentication and SSO integration keep your workspace secure.",
      color: "from-green-400 to-emerald-500",
      delay: 0.1,
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Team Collaboration",
      description: "Work together seamlessly with shared workspaces, real-time editing, and smart notifications for your team.",
      color: "from-blue-400 to-indigo-500",
      delay: 0.2,
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Mobile First",
      description: "Full-featured mobile app with offline support. Stay productive whether you're online or offline.",
      color: "from-purple-400 to-pink-500",
      delay: 0.3,
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Smart Organization",
      description: "AI-powered categorization and smart filters help you find what you need instantly.",
      color: "from-cyan-400 to-blue-500",
      delay: 0.4,
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "Beautiful Design",
      description: "A stunning interface that's a joy to use. Dark mode, custom themes, and accessibility baked in.",
      color: "from-pink-400 to-rose-500",
      delay: 0.5,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Tasks",
      description: "Quickly add tasks with our intuitive interface. Set priorities, due dates, and categories in seconds.",
    },
    {
      number: "02",
      title: "Organize",
      description: "Use smart filters, categories, and labels to keep everything organized. Drag and drop to reorder.",
    },
    {
      number: "03",
      title: "Track Progress",
      description: "Monitor your productivity with detailed analytics and visual progress indicators.",
    },
  ];

  const testimonials = [
    {
      quote: "AuraFlow transformed how our team manages projects. The real-time collaboration is a game-changer.",
      author: "Sarah Chen",
      role: "Product Manager at TechCorp",
      avatar: "SC",
    },
    {
      quote: "The most intuitive task management tool I've ever used. Beautiful design meets powerful features.",
      author: "Marcus Johnson",
      role: "Freelance Designer",
      avatar: "MJ",
    },
    {
      quote: "Finally, a tool that understands how modern teams work. AuraFlow is now essential to our daily workflow.",
      author: "Emily Rodriguez",
      role: "Engineering Lead at StartupX",
      avatar: "ER",
    },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      <SmoothScroll />
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Animated particles background */}
      <AnimatedParticles />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 md:pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto hero-responsive relative z-10"
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* AuraFlow Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 mb-8 backdrop-blur-sm"
            >
              <motion.div
                className="w-2 h-2 bg-purple-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-white/90 font-medium">Achieve Flow State</span>
            </motion.div>

            {/* Logo Display */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-8"
            >
              <DynamicLogo size="xl" showText={true} className="hover:scale-105 transition-all duration-300" />
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="text-display mb-6 spacing-tight"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent animate-gradient">
                Flow Through Tasks
              </span>
              <br />
              <motion.span
                className="text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Achieve Your Goals
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-body text-white/70 mb-10 max-w-3xl mx-auto reading-optimized"
            >
              AuraFlow helps you achieve flow state while managing tasks. Designed for productive teams who value wellbeing. Beautiful, intuitive, and powerful.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link href="/tasks">
                <motion.button
                  className="mobile-button inline-flex items-center justify-center whitespace-nowrap text-lg font-medium transition-all h-14 rounded-xl px-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white w-full sm:w-auto group shadow-lg shadow-purple-500/25 mobile-touch"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                  <motion.svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                  </motion.svg>
                </motion.button>
              </Link>
              <Link href="/auth/login">
                <motion.button
                  className="mobile-button inline-flex items-center justify-center whitespace-nowrap text-lg font-medium h-14 rounded-xl px-10 border border-purple-400/30 text-white backdrop-blur-sm w-full sm:w-auto glass mobile-touch"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.15)", borderColor: "rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  See How It Works
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            >
              {[
                { value: "10M+", label: "Tasks Completed" },
                { value: "500K+", label: "Active Users" },
                { value: "99.9%", label: "Uptime" },
                { value: "4.9/5", label: "User Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center p-4 rounded-xl glass"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm md:text-base text-white/70 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-responsive relative">
        <div className="container mx-auto hero-responsive">
          <ScrollReveal className="text-center mb-16" delay={100}>
            <h2 className="text-responsive-section font-bold mb-6 text-white">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Succeed
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Powerful features designed to help you stay organized, focused, and productive.
            </p>
          </ScrollReveal>

<StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.1}>
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <motion.div
                  className="mobile-card rounded-2xl border border-white/20 backdrop-blur-md p-6 md:p-8 h-full bg-white/5 glass hover:shadow-xl hover:shadow-blue-500/10 mobile-touch"
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg mobile-touch`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="mobile-title text-xl md:text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-body text-white/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-responsive relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
        <div className="container mx-auto hero-responsive relative z-10">
          <ScrollReveal className="text-center mb-16" delay={200}>
            <h2 className="text-responsive-section font-bold mb-6 text-white">
              How It{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Get started in three simple steps
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 0.2} direction="up">
                <motion.div
                  className="relative text-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                  )}
                  
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg shadow-blue-500/30"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {step.number}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-responsive relative">
        <div className="container mx-auto hero-responsive">
          <ScrollReveal className="text-center mb-16" delay={300}>
            <h2 className="text-responsive-section font-bold mb-6 text-white">
              Loved by Thousands of{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Productive Teams
              </span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto" staggerDelay={0.15}>
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.author}>
                <motion.div
                  className="rounded-2xl border border-white/10 backdrop-blur-md p-6 bg-white/5 h-full glass hover:shadow-xl hover:shadow-blue-500/10"
                  whileHover={{
                    scale: 1.02,
                    y: -8,
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                  }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
                >
                  {/* Quote icon */}
                  <div className="text-4xl text-blue-400/30 mb-4">"</div>
                  <p className="text-white/80 mb-6 leading-relaxed text-body">{testimonial.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.author}</div>
                      <div className="text-white/50 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-responsive relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="container mx-auto hero-responsive relative z-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <motion.div
              className="rounded-3xl border border-white/20 backdrop-blur-sm p-12 bg-white/5"
              whileHover={{
                borderColor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 0 60px rgba(59, 130, 246, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Get{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Started?
                </span>
              </h2>
<p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                 Join thousands of teams already using AuraFlow to organize their work and achieve their goals.
               </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <motion.button
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium h-12 rounded-md px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create Free Account
                  </motion.button>
                </Link>
                <Link href="/tasks">
                  <motion.button
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium h-12 rounded-md px-8 border border-white/20 text-white backdrop-blur-sm"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try Demo
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      </main>
  );
}
