"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, Shield, Users, DollarSign, CheckCircle, PieChart, 
  Sparkles, Zap, Star, Crown, Globe, Lock
} from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

const floatingIcons = [
  { Icon: Users, delay: 0, duration: 3 },
  { Icon: DollarSign, delay: 1, duration: 4 },
]

const features = [
  { icon: Users, label: "Group Friendly", color: "from-blue-500 to-cyan-500" },
  { icon: Shield, label: "100% Private", color: "from-green-500 to-emerald-500" },
]

const testimonials = [
  { name: "Sarah M.", rating: 5, text: "Game changer for group trips!" },
  { name: "John D.", rating: 5, text: "So simple and intuitive to use" },
]

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 30])

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Simplified Animated Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        {/* Reduced animated gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 h-[300px] w-[300px] rounded-full bg-accent/20 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        
        {/* Simplified Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
      </div>

      {/* Cursor Follower */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(9, 188, 138, 0.05), transparent 80%)`,
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary backdrop-blur-sm border border-primary/30"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
              #1 Bill Splitting App
              <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
            </motion.div>

            {/* Main Heading - More Concise */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
              >
                <span className="block text-foreground">Split Bills</span>
                <span className="block bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                  Effortlessly ✨
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg"
              >
                The fastest, simplest way to split expenses with friends. 
                <span className="text-foreground font-semibold"> Private, instant, and beautifully simple.</span>
              </motion.p>
            </div>

            {/* Simplified Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-3 py-2 sm:px-4 sm:py-2.5 border border-green-500/20">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                <span className="text-xs sm:text-sm font-medium text-foreground">100% Private</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-3 py-2 sm:px-4 sm:py-2.5 border border-blue-500/20">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                <span className="text-xs sm:text-sm font-medium text-foreground">Instant Setup</span>
              </div>
            </motion.div>

            {/* CTA Buttons - Simplified */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Button size="lg" asChild className="group shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all text-base sm:text-lg px-6 py-5 sm:px-7 sm:py-6">
                <Link href="/app">
                  <Zap className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Start Free Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="group text-base sm:text-lg px-6 py-5 sm:px-7 sm:py-6 backdrop-blur-sm">
                <Link href="/how-it-works">
                  See How It Works
                </Link>
              </Button>
            </motion.div>

            {/* Simplified Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-background flex items-center justify-center text-xs font-bold text-primary"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">2,000+</span> users
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-500 text-yellow-500" />
                ))}
                <span className="ml-1 text-xs sm:text-sm font-semibold">4.9/5</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Cleaner Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ y: y1 }}
            className="relative"
          >
            {/* Simplified Main Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl rounded-3xl border border-border/50 shadow-xl p-6 sm:p-7 overflow-hidden"
            >
              {/* Shine Effect */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(9, 188, 138, 0.1), transparent 40%)",
                }}
              />

              <div className="relative z-10 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm sm:text-base text-muted-foreground">Active Group</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">Weekend Trip 🏖️</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                  >
                    <Globe className="h-5 w-5 text-primary" />
                  </motion.div>
                </div>

                {/* Simplified Step Items */}
                <div className="space-y-3">
                  <SimpleStepItem
                    icon={<Users className="h-4 w-4" />}
                    title="5 Members"
                    description="Sarah, John, Emma..."
                    color="from-blue-500 to-cyan-500"
                  />
                  <SimpleStepItem
                    icon={<DollarSign className="h-4 w-4" />}
                    title="$842 Total"
                    description="12 transactions"
                    color="from-green-500 to-emerald-500"
                  />
                  <SimpleStepItem
                    icon={<PieChart className="h-4 w-4" />}
                    title="Analytics Ready"
                    description="Spending breakdown"
                    color="from-purple-500 to-pink-500"
                  />
                </div>

                {/* Simplified Progress */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-primary font-bold">90%</span>
                  </div>
                  <div className="h-2 sm:h-2.5 rounded-full bg-accent/30 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary via-primary/80 to-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "90%" }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Simplified Testimonial */}
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-border/30"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center font-bold text-primary text-xs sm:text-sm">
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-xs sm:text-sm">{testimonials[currentTestimonial].name}</p>
                      <div className="flex gap-0.5">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground italic">"{testimonials[currentTestimonial].text}"</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Simplified Floating Feature Cards */}
            <div className="absolute -right-4 -top-4 hidden sm:block">
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.1, x: -5 }}
                className="p-3 rounded-xl bg-gradient-to-br from-blue-500/90 to-cyan-500/90 backdrop-blur-xl border border-white/20 shadow-lg"
              >
                <Users className="h-5 w-5 text-white" />
              </motion.div>
            </div>
            <div className="absolute -left-4 -bottom-4 hidden sm:block">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.1, x: 5 }}
                className="p-3 rounded-xl bg-gradient-to-br from-green-500/90 to-emerald-500/90 backdrop-blur-xl border border-white/20 shadow-lg"
              >
                <Shield className="h-5 w-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SimpleStepItem({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-accent/30 border border-border/50 transition-all"
    >
      <div className={`relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gradient-to-br ${color} text-white`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-foreground text-sm sm:text-base">{title}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}