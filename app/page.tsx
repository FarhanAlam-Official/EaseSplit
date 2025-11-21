"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { 
  Zap, Shield, Users, TrendingUp, Award, Target, 
  ArrowRight, CheckCircle, Sparkles, Globe, Lock,
  DollarSign, PieChart, FileText, BarChart3
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const quickFeatures = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Split bills in seconds, not minutes",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "100% Private",
    description: "Your data never leaves your device",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Group Friendly",
    description: "Perfect for any group size",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Visual insights into spending",
    color: "from-purple-500 to-pink-500",
  },
]

const steps = [
  {
    number: "01",
    title: "Create Group",
    description: "Add members and give your group a name",
    icon: Users,
  },
  {
    number: "02",
    title: "Add Expenses",
    description: "Record who paid and split the cost",
    icon: DollarSign,
  },
  {
    number: "03",
    title: "Track Everything",
    description: "View analytics and expense breakdown",
    icon: PieChart,
  },
  {
    number: "04",
    title: "Settle Up",
    description: "Minimize transfers with smart suggestions",
    icon: CheckCircle,
  },
]

const benefits = [
  "No account required - start instantly",
  "Works completely offline",
  "Export to PDF anytime",
  "Multiple split methods",
  "Smart settlement algorithm",
  "Beautiful visual analytics",
]

const stats = [
  { label: "Active Users", value: "2,000+", icon: Users, color: "text-blue-500" },
  { label: "Bills Split", value: "5,000+", icon: DollarSign, color: "text-green-500" },
  { label: "User Rating", value: "4.9/5", icon: Award, color: "text-yellow-500" },
  { label: "Countries", value: "50+", icon: Globe, color: "text-purple-500" },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />

      {/* Quick Features Section */}
      <section className="py-24 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose <span className="text-primary">EaseSplit?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Built with speed, privacy, and simplicity in mind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                <div className="relative p-6 rounded-3xl bg-card border border-border group-hover:border-primary/40 transition-all duration-300 text-center h-full backdrop-blur-sm">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-6 py-3 text-sm font-semibold text-primary mb-6 backdrop-blur-sm border border-primary/30">
              <Target className="h-4 w-4" />
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Four Simple Steps
            </h2>
            <p className="text-xl text-muted-foreground">
              From creating a group to settling up in minutes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border group-hover:border-primary/40 transition-all duration-300 h-full">
                  <div className="text-6xl font-black text-primary/10 mb-4">{step.number}</div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all mb-6 group-hover:scale-110 group-hover:rotate-3">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <ArrowRight className="h-6 w-6 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" asChild className="group">
              <Link href="/how-it-works">
                Learn More About The Process
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-6 py-3 text-sm font-semibold text-primary mb-6 backdrop-blur-sm border border-primary/30">
                <Sparkles className="h-4 w-4" />
                Everything You Need
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Built for Real People
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We've packed EaseSplit with features that make bill splitting effortless, 
                while keeping it simple and intuitive.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all cursor-pointer group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 group-hover:bg-primary text-primary group-hover:text-primary-foreground transition-all flex-shrink-0 group-hover:scale-110 group-hover:rotate-6">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <Button size="lg" asChild className="group">
                  <Link href="/features">
                    Explore All Features
                    <Sparkles className="ml-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl" />
                <div className="relative p-12 space-y-6">
                  {[
                    { icon: Lock, label: "Private & Secure", value: "100%" },
                    { icon: Zap, label: "Split Speed", value: "< 10s" },
                    { icon: FileText, label: "Export Ready", value: "PDF" },
                    { icon: TrendingUp, label: "Analytics", value: "Live" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="flex items-center justify-between p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 group-hover:bg-primary text-primary group-hover:text-primary-foreground transition-all group-hover:rotate-12">
                          <item.icon className="h-6 w-6" />
                        </div>
                        <span className="font-semibold text-foreground">{item.label}</span>
                      </div>
                      <span className="text-2xl font-bold text-primary">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/40 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-muted-foreground">
              Join our growing community of smart bill splitters
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative text-center p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border group-hover:border-primary/40 transition-all">
                  <stat.icon className={`h-12 w-12 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                  <div className={`text-4xl md:text-5xl font-black ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
            <div className="relative p-12 md:p-16 text-center text-white">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm mb-8"
              >
                <Sparkles className="h-10 w-10" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Split Bills Smarter?
              </h2>
              <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                Join thousands of users who have simplified their shared expenses. 
                Start splitting bills in seconds, completely free.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-white rounded-lg blur-md opacity-60"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 0.8, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <Button size="lg" variant="secondary" asChild className="relative group shadow-2xl font-semibold">
                    <Link href="/app" className="flex items-center">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Sparkles className="h-5 w-5" />
                      </motion.div>
                      <span className="ml-2">Get Started Free</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
                <Button size="lg" variant="outline" asChild className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
