// Features Page Component
// This page showcases all the key features of EaseSplit in an engaging and visually appealing way
// Users can learn about the app's capabilities before trying it out

"use client"

import { Header } from "@/components/header"
// Shared header component for consistent navigation

import { Footer } from "@/components/footer"
// Shared footer component for consistent layout

import { motion } from "framer-motion"
// Animation library for smooth transitions and hover effects

import { Users, DollarSign, FileText, Shield, BarChart3, Zap, Sparkles, TrendingUp, Clock } from "lucide-react"
// Icon components for visual representation of each feature

import Link from "next/link"
// Next.js component for client-side navigation

import { Button } from "@/components/ui/button"
// Styled button component from UI library

// Features data structure with icons, titles, descriptions, and details
const features = [
  {
    icon: Users,
    title: "Create Groups",
    description: "Create named groups and invite friends locally for trips, events, or shared expenses.",
    details: "Organize your expenses by creating dedicated groups for different occasions. Whether it's a weekend trip, monthly household bills, or a group dinner, keep everything separate and organized.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: DollarSign,
    title: "Smart Splits",
    description: "Equal, shares, percentage, itemized, or custom splits — choose what works for you.",
    details: "Flexible splitting options to match any scenario. Split bills equally, by custom amounts, percentages, or shares. Perfect for any situation from simple dinners to complex expenses.",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: FileText,
    title: "Export & Share",
    description: "Download PDF summary or copy settlement steps to share with your group.",
    details: "Generate professional PDF reports with all expense details, balances, and settlement suggestions. Share with your group via email or messaging apps.",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All data stored locally on your device. Nothing is sent to external servers.",
    details: "Your financial data stays on your device. No cloud storage, no data mining, no privacy concerns. You have complete control over your information.",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Beautiful charts showing expenses by category, member, and over time.",
    details: "Understand your spending patterns with interactive charts and graphs. See who spent what, track expenses by category, and analyze trends over time.",
    color: "from-indigo-500/20 to-blue-500/20",
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description: "Smart algorithm suggests minimal transfers to settle all balances quickly.",
    details: "Our intelligent algorithm calculates the most efficient way to settle debts with minimum number of transactions. Save time and simplify payments.",
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "See changes instantly as expenses are added or modified in your group.",
    details: "All calculations update in real-time. No need to refresh or recalculate. Everyone sees the latest balances immediately.",
    color: "from-teal-500/20 to-green-500/20",
  },
  {
    icon: TrendingUp,
    title: "Expense Tracking",
    description: "Track all expenses with timestamps, categories, and detailed breakdowns.",
    details: "Comprehensive expense history with search, filter, and sort capabilities. Never lose track of who paid what and when.",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: Sparkles,
    title: "Beautiful Interface",
    description: "Clean, modern design that makes bill splitting actually enjoyable.",
    details: "Thoughtfully designed interface with smooth animations and intuitive interactions. Makes managing shared expenses a pleasant experience.",
    color: "from-violet-500/20 to-purple-500/20",
  },
]

/**
 * Features Page Component
 * Renders the features page showcasing all key capabilities of EaseSplit
 */
export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section - Introduces the features page with animated background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 pt-32 pb-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
              <Sparkles className="h-4 w-4" />
              Powerful Features
            </motion.div>

            {/* Main headline with gradient effect on key words */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Everything You Need for
              <span className="block text-primary mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Perfect Bill Splits
              </span>
            </h1>

            {/* Description of the page's purpose */}
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Discover powerful features designed to make splitting bills effortless, accurate, and enjoyable. 
              From smart algorithms to beautiful analytics, we've got you covered.
            </p>

            {/* Call-to-action buttons with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button size="lg" asChild className="group">
                <Link href="/app">
                  Try All Features Free
                  <Zap className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/how-it-works">
                  See How It Works
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid - Displays all key features in an organized grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Map through features to display each with animation */}
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Gradient background effect on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                {/* Feature card with icon, title, description, and details */}
                <div className="relative p-8 rounded-3xl bg-card border border-border group-hover:border-primary/40 transition-all duration-300 h-full backdrop-blur-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent group-hover:bg-primary/20 transition-all duration-300 mb-6 group-hover:scale-110 group-hover:rotate-3">
                    <feature.icon className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">
                    {feature.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Final call to action to try the app */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated CTA content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Experience All Features?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of users who are splitting bills the smart way
            </p>
            <Button size="lg" asChild className="group">
              <Link href="/app">
                Get Started Now
                <Sparkles className="ml-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}