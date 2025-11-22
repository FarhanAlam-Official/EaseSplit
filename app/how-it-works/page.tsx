// How It Works Page Component
// This page explains the step-by-step process of using EaseSplit in a clear and visual way
// Helps users understand how to effectively use the app for splitting bills

"use client"

import { Header } from "@/components/header"
// Shared header component for consistent navigation

import { Footer } from "@/components/footer"
// Shared footer component for consistent layout

import { motion } from "framer-motion"
// Animation library for smooth transitions and hover effects

import { Users, DollarSign, PieChart, CheckCircle, ArrowRight, Zap, Download, Share2 } from "lucide-react"
// Icon components for visual representation of each step and quick actions

import Link from "next/link"
// Next.js component for client-side navigation

import { Button } from "@/components/ui/button"
// Styled button component from UI library

// Step-by-step process data structure
const steps = [
  {
    number: "01",
    icon: Users,
    title: "Create Your Group",
    description: "Start by creating a new group and adding members. Give it a meaningful name like 'Weekend Trip' or 'Monthly Bills'.",
    details: [
      "Click 'Create New Group' from the dashboard",
      "Enter a descriptive group name",
      "Add members by typing their names",
      "Set group preferences (optional)",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: DollarSign,
    title: "Add Expenses",
    description: "Record expenses as they happen. Choose who paid and who should split the cost.",
    details: [
      "Click 'Add Expense' in your group",
      "Enter the amount and description",
      "Select who paid for the expense",
      "Choose split type: equal, custom, shares, or percentage",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    number: "03",
    icon: PieChart,
    title: "Track & Analyze",
    description: "View beautiful analytics showing who owes what, expense categories, and spending trends.",
    details: [
      "See real-time balance updates",
      "View expenses by category",
      "Analyze spending patterns over time",
      "Check individual contributions",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Settle Up",
    description: "Our smart algorithm calculates the minimum number of transfers needed to settle all balances.",
    details: [
      "Review suggested settlement plan",
      "See exactly who pays whom",
      "Copy or share settlement details",
      "Mark payments as completed",
    ],
    color: "from-orange-500 to-red-500",
  },
]

// Quick actions data structure
const quickActions = [
  {
    icon: Download,
    title: "Export Reports",
    description: "Download PDF summaries anytime",
  },
  {
    icon: Share2,
    title: "Share Details",
    description: "Send settlement info to group",
  },
  {
    icon: Zap,
    title: "Quick Split",
    description: "Split bills in seconds",
  },
]

/**
 * How It Works Page Component
 * Renders the step-by-step guide explaining how to use EaseSplit
 */
export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section - Introduces the how-it-works page with animated background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 pt-32 pb-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container mx-auto max-w-6xl px-4">
          {/* Animated introduction content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Badge showing purpose of the page */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-6 py-3 text-sm font-medium text-primary mb-6 backdrop-blur-sm border border-primary/30"
            >
              <Zap className="h-4 w-4" />
              Simple & Effective
            </motion.div>

            {/* Main headline with gradient effect on key words */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              How It
              <span className="block text-primary mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Actually Works
              </span>
            </h1>

            {/* Description of the page's purpose */}
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Split bills in four simple steps. No complicated setup, no confusing interfaces. 
              Just straightforward bill splitting that actually makes sense.
            </p>

            {/* Call-to-action button with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button size="lg" asChild className="group">
                <Link href="/app">
                  Try It Yourself
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section - Detailed explanation of the 4-step process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {/* Map through steps to display each with animation */}
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                {/* Step details card */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    {/* Gradient background effect on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20 group-hover:opacity-30 rounded-3xl blur-2xl transition-opacity duration-500`} />
                    {/* Step content with number, icon, title, description, and details */}
                    <div className="relative p-8 rounded-3xl bg-card border border-border group-hover:border-primary/40 transition-all duration-300 backdrop-blur-sm">
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white text-2xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {step.number}
                      </div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white`}>
                          <step.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-3xl font-bold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-white text-xs font-bold mt-0.5 flex-shrink-0`}>
                              {i + 1}
                            </div>
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                {/* Visual representation of the step */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 rounded-3xl blur-3xl`} />
                    <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-accent/50 to-accent/20 backdrop-blur-sm border border-border flex items-center justify-center">
                      <step.icon className={`h-32 w-32 text-primary opacity-20`} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions - Additional features available in the app */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header with animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Quick Actions Available
            </h2>
            <p className="text-xl text-muted-foreground">
              Additional features to make your life easier
            </p>
          </motion.div>

          {/* Quick actions grid with animation */}
          <div className="grid md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="p-8 rounded-3xl bg-card border border-border hover:border-primary/40 transition-all duration-300 text-center group"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent group-hover:bg-primary/20 transition-colors mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <action.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-muted-foreground">{action.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Final call to action to start using the app */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated CTA content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              It's free, fast, and works entirely on your device
            </p>
            <Button size="lg" asChild className="group">
              <Link href="/app">
                Start Splitting Now
                <Zap className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}