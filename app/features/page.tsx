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
          {/* Floating elements for visual interest */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-xl"
          ></motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/3 left-1/3 w-16 h-16 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 blur-xl"
          ></motion.div>
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
              Split Bills <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Smartly</span> with Ease
              <span className="block text-primary mt-2">
                Perfect Bill Splits
              </span>
            </h1>

            {/* Description of the page's purpose */}
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
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
              <Button size="lg" asChild className="group px-8 py-6 text-lg font-semibold">
                <Link href="/app">
                  Try All Features Free
                  <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 py-6 text-lg font-semibold">
                <Link href="/how-it-works">
                  See How It Works
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Timeline - Displays all key features in a timeline layout */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Powerful <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to manage shared expenses with friends and family, designed with privacy and simplicity in mind.
            </p>
          </motion.div>
          
          {/* Timeline Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central Timeline Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/20 to-accent/20 rounded-full origin-top md:left-1/2"
            ></motion.div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col space-y-6 md:space-y-0 md:space-x-8 group`}
                >
                  {/* Timeline Dot */}
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    animate={{ 
                      y: [0, -5, 0],
                      transition: { 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.2
                      } 
                    }}
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg z-10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300 md:left-1/2"
                  >
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} text-center w-full`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground mb-3">{feature.description}</p>
                      <p className="text-sm text-muted-foreground/80">{feature.details}</p>
                    </motion.div>
                  </div>
                  
                  {/* Icon */}
                  <div className={`md:w-5/12 flex justify-center ${index % 2 === 0 ? 'md:justify-start md:pl-8' : 'md:justify-end md:pr-8'} w-full`}>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <feature.icon className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Final call to action to try the app */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/10 relative overflow-hidden">
        {/* Background elements for visual interest */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tl from-accent/20 to-primary/20 rounded-full blur-3xl opacity-50"></div>
        </div>
        
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Animated CTA content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-6 py-3 text-sm font-medium text-primary mb-6 backdrop-blur-sm border border-primary/30"
            >
              <Sparkles className="h-4 w-4" />
              Get Started
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Experience All Features?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Join thousands of users who are splitting bills the smart way. No account needed, completely free.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-block"
            >
              <motion.div
                className="absolute inset-0 bg-primary rounded-lg blur-md opacity-50"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Button size="lg" asChild className="relative group bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/40 border border-primary/20 font-semibold px-8 py-6 text-lg">
                <Link href="/app" className="flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Zap className="h-5 w-5" />
                  </motion.div>
                  <span className="ml-2">Get Started Free</span>
                </Link>
              </Button>
            </motion.div>
            
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required. Start splitting bills in seconds.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}