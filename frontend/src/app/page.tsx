"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Clock,
  Users,
  CheckCircle,
  ChevronRight
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">OnboardAI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-slate-400 hover:text-white transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-slate-400 hover:text-white transition-colors">How it Works</Link>
              <Link href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/dashboard">
                <Button>
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-slate-300">AI-Powered Onboarding Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              <span className="gradient-text">Intelligent</span> Client{" "}
              <br className="hidden md:block" />
              Onboarding at Scale
            </h1>

            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Adaptive workflows that understand your clients. AI-driven automation
              that reduces onboarding time by 70%. Zero-code orchestration for modern B2B teams.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link href="/dashboard">
                <Button size="xl">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="xl" variant="outline">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
              {[
                { value: "70%", label: "Faster Onboarding" },
                { value: "< 10min", label: "To First Value" },
                { value: "99.9%", label: "Uptime SLA" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="glass rounded-2xl p-2 glow">
              <div className="bg-slate-950 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="p-8 min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-slate-400">Dashboard Preview</p>
                    <p className="text-sm text-slate-600">Real-time onboarding analytics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything you need for <span className="gradient-text">intelligent onboarding</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From AI-generated workflows to real-time risk scoring, OnboardAI handles the complexity
              so you can focus on delighting your clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI-Generated Workflows",
                description: "Answer a few questions and our AI creates personalized onboarding checklists based on industry and client needs.",
                color: "from-violet-500 to-purple-500"
              },
              {
                icon: Zap,
                title: "Smart Automation",
                description: "Automated reminders, task assignments, and escalations. Never let an onboarding fall through the cracks.",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Risk Scoring",
                description: "ML-powered risk assessment highlights at-risk onboardings before they become problems.",
                color: "from-emerald-500 to-teal-500"
              },
              {
                icon: BarChart3,
                title: "Real-time Dashboard",
                description: "Unified view of all active onboardings with progress tracking, bottleneck detection, and analytics.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Clock,
                title: "Progress Timeline",
                description: "Visual timeline showing completed steps, current tasks, and upcoming milestones for every client.",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: Users,
                title: "Client Portal",
                description: "Branded self-service portal where clients track progress, upload documents, and communicate with your team.",
                color: "from-indigo-500 to-violet-500"
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="glass rounded-xl p-6 glass-hover group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Get started in <span className="gradient-text">3 simple steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Template",
                description: "Use our no-code builder to design onboarding workflows. Add stages, tasks, and automation rules."
              },
              {
                step: "02",
                title: "Invite Your Client",
                description: "Send a personalized invite. AI generates a custom checklist based on client intake responses."
              },
              {
                step: "03",
                title: "Track & Optimize",
                description: "Monitor progress in real-time. Get AI-powered insights to continuously improve your process."
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-bold text-slate-800/50 absolute -top-8 -left-4">{item.step}</div>
                <div className="relative z-10 pt-10">
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
                {i < 2 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-slate-700" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-12 glow">
            <h2 className="text-4xl font-bold mb-4">
              Ready to transform your <span className="gradient-text">client onboarding</span>?
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Join forward-thinking B2B companies using OnboardAI to deliver exceptional
              onboarding experiences. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="xl">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">OnboardAI</span>
            </div>
            <div className="text-sm text-slate-500">
              © 2026 OnboardAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
