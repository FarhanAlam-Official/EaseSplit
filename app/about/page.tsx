"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Heart, Users, Zap, Github, Mail, FileText, Sparkles, Paintbrush, Award, Download, Rocket, Shield, Globe, Code, Target, Lightbulb, Terminal } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

/**
 * About Page Component
 * 
 * This component renders the About page for EaseSplit, showcasing:
 * - Company mission and values
 * - Key features of the bill splitting platform
 * - Technology stack used in development
 * - Information about the team
 * 
 * The page utilizes framer-motion for smooth animations and interactive elements,
 * creating an engaging user experience that highlights the platform's capabilities.
 */
export default function About() {
  // Define features array for bill splitting capabilities
  // Each feature includes an icon, title, description, and color gradient
  const features = [
    {
      icon: FileText,
      title: "Track Expenses",
      description: "Easily record and categorize shared expenses with friends and family",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Paintbrush,
      title: "Smart Analytics",
      description: "Visualize spending patterns and get insights into your group's expenses",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "Fair Settlements",
      description: "Calculate optimal payment arrangements to settle debts efficiently",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Download,
      title: "Export Reports",
      description: "Generate detailed reports in PDF, CSV, or JSON formats for your records",
      color: "from-orange-500 to-red-500",
    },
  ]

  // Define company values with icons and descriptions
  // These represent the core principles behind EaseSplit's development
  const values = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "We believe your financial data is yours alone. That's why everything stays on your device.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Every feature is designed with real user needs in mind, not arbitrary complexity.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Zap,
      title: "Simplicity",
      description: "Complex problems deserve elegant solutions. We make bill splitting effortless.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Globe,
      title: "Accessible",
      description: "Works offline, no account needed, no installation required. Just open and use.",
      color: "from-green-500 to-emerald-500",
    },
  ]

  // Technology stack used in building EaseSplit
  // Displays the modern tools and frameworks powering the platform
  const techStack = [
    { icon: Code, label: "Next.js", color: "from-gray-700 to-gray-900" },
    { icon: Rocket, label: "Vercel", color: "from-black to-gray-800" },
    { icon: Shield, label: "Secure", color: "from-green-600 to-emerald-600" },
    { icon: Globe, label: "Modern Web", color: "from-blue-600 to-cyan-600" },
  ]

  // Mission/vision/commitment statements
  const team = [
    {
      role: "Mission",
      icon: Target,
      title: "Our Mission",
      description: "To make splitting bills as simple and stress-free as possible, without compromising on privacy or requiring any setup.",
    },
    {
      role: "Vision",
      icon: Lightbulb,
      title: "Our Vision",
      description: "A world where friends can share expenses without awkwardness, confusion, or complicated apps getting in the way.",
    },
    {
      role: "Commitment",
      icon: Award,
      title: "Our Commitment",
      description: "We're committed to keeping this tool free, private, and simple forever. No ads, no data collection, no premium tiers.",
    },
  ]

  // Animation variants for fade-in effects
  // Controls the entrance animation for page elements
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  // Stagger container for sequencing child animations
  // Creates a cascading effect when multiple elements animate in sequence
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Enhanced Background Elements */}
      {/* Animated gradient blobs that create a dynamic background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top-right animated gradient blob */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
        ></motion.div>
        {/* Bottom-left animated gradient blob */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tl from-accent/20 to-primary/20 rounded-full blur-3xl"
        ></motion.div>
        {/* Center animated gradient blob */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
        ></motion.div>
      </div>

      {/* Animated Grid Background */}
      {/* Subtle dot grid pattern for visual texture */}
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.05) 1px, transparent 0)" }}></div>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 pt-32">
        {/* Hero Section with Logo */}
        {/* Main introduction area with animated logo and tagline */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-4xl mx-auto mb-24"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center mb-12"
          >
            {/* Animated badge showing platform capabilities */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full mb-6 backdrop-blur-sm shadow-lg"
            >
              <motion.div
                animate={{ rotate: [0, 10] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm font-semibold text-primary">Privacy-First Bill Splitting</span>
            </motion.div>

            {/* Main title with animated logo */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-center flex flex-wrap items-center justify-center gap-3 md:gap-4 lg:gap-6"
            >
              <span>About </span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent flex items-center gap-3 md:gap-4 lg:gap-6">
                EaseSplit
                {/* Logo with Animation */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: [0, -5] }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-xl opacity-50"></div>
                  <motion.div
                    animate={{
                      scale: [1, 1.05],
                      rotate: [0, 5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl blur-xl" />
                    <Image
                      src="/logo.png"
                      alt="EaseSplit Logo"
                      width={96}
                      height={96}
                      className="relative w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-2xl"
                      priority
                    />
                  </motion.div>
                </motion.div>
              </span>
            </motion.h1>
          </motion.div>

          {/* Description paragraphs explaining the platform's purpose */}
          <motion.div
            variants={fadeInUp}
            className="prose prose-invert max-w-none space-y-6"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
              We created EaseSplit because splitting bills shouldn't require creating accounts,
              sharing personal data, or wrestling with complicated interfaces.
              It should just work.
            </p>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
              We built EaseSplit to be the fastest, most private way to split bills with friends.
              Track expenses, calculate fair settlements, and generate reports—all without
              compromising your privacy.
            </p>

            {/* Team attribution section */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 backdrop-blur-sm"
            >
              <p className="text-center text-muted-foreground">
                <span className="font-semibold text-foreground">Built with passion by the EaseSplit Team.</span> Version 1.0 • Built with Next.js & Vercel
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section - Showcases app achievements */}
        <section className="py-16 bg-background border-y border-border mb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Map through stats array to display each stat with animation */}
              {[
                { value: "500+", label: "Groups Created", color: "text-blue-500" },
                { value: "2,000+", label: "Expenses Split", color: "text-green-500" },
                { value: "100%", label: "Local Storage", color: "text-purple-500" },
                { value: "4.9/5", label: "User Rating", color: "text-orange-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className="text-center"
                >
                  <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section - Tells the origin story of EaseSplit */}
        <section className="py-24 bg-background mb-24">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
              </div>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  EaseSplit was born from a simple frustration: why is splitting bills so complicated?
                  Every existing solution required creating accounts, sharing personal information, or
                  navigating confusing interfaces.
                </p>

                {/* Team quote with animated entrance */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/20 border border-primary/20 my-12"
                >
                  <p className="text-xl font-semibold text-foreground mb-4">
                    "We wanted to create something different — a tool that respects your privacy,
                    works instantly, and doesn't get in your way."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">The EaseSplit Team</div>
                      <div className="text-sm text-muted-foreground">Founders</div>
                    </div>
                  </div>
                </motion.div>

                <p className="text-lg">
                  So we built EaseSplit with three core principles: privacy, simplicity, and speed.
                  Everything runs locally in your browser. No servers, no databases, no tracking.
                  Just you, your friends, and fair bill splits.
                </p>

                <p className="text-lg">
                  Today, hundreds of groups use EaseSplit for everything from splitting dinner bills
                  to managing complex trip expenses. And we're just getting started.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certificate Generation Features */}
        {/* Feature showcase section with animated cards */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Powerful Bill Splitting <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to manage shared expenses with friends and family.
            </p>
          </motion.div>

          {/* Feature cards grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="group relative p-8 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 hover:border-primary/50 transition-all hover:shadow-2xl overflow-hidden"
              >
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                
                {/* Feature icon with animated gradient background */}
                <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Feature title and description */}
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section - Highlights company core values */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/10 mb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we build
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Map through values array to display each value with hover effects */}
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Gradient background effect on hover */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                  {/* Value card with icon, title, and description */}
                  <div className="relative p-8 rounded-3xl bg-card border border-border group-hover:border-primary/40 transition-all duration-300 backdrop-blur-sm">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${value.color} text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <value.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission/Vision/Commitment Section - Details company direction */}
        <section className="py-24 bg-background mb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {/* Map through team statements to display each with animation */}
              {team.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center max-w-3xl mx-auto"
                >
                  {/* Icon with hover animation */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary mb-6"
                  >
                    <item.icon className="h-10 w-10" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Built with <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Modern Technology</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We use cutting-edge technologies to ensure the best performance and user experience.
            </p>
          </motion.div>

          {/* Tech stack badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {techStack.map((tech, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group relative px-6 py-4 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${tech.color} text-white`}>
                    <tech.icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-foreground">{tech.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Developer Section */}
        {/* Developer profile section with animated elements */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-24 pt-20 relative"
        >
          {/* Organic Background Elements - No Card Border */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Floating background elements for visual interest */}
            <motion.div
              animate={{
                x: [0, 40],
                y: [0, -30],
                scale: [1, 1.2],
                rotate: [0, 10],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent rounded-full blur-3xl"
            ></motion.div>
            <motion.div
              animate={{
                x: [0, -35],
                y: [0, 30],
                scale: [1, 0.9],
                rotate: [0, -15],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tl from-accent/15 via-primary/10 to-transparent rounded-full blur-3xl"
            ></motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {/* Asymmetric Layout - Text Left, Image Right */}
            <div className="relative grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
              {/* Content Section - Left Side */}
              <motion.div
                variants={fadeInUp}
                className="relative text-center md:text-left space-y-8 order-2 md:order-1"
              >
                {/* Developer role badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm mb-4"
                >
                  <Code className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Full-Stack Developer</span>
                </motion.div>

                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    Meet the <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Developer</span>
                  </h2>
                  {/* Animated divider line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full mb-6 md:mb-8"
                  ></motion.div>
                </div>
                
                {/* Developer bio paragraph */}
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                  Sendora was created by <span className="font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Farhan Alam</span>, a passionate
                  full-stack developer dedicated to building tools that solve real-world problems. With expertise in
                  modern web technologies and a keen interest in automation, Farhan designed Sendora to make bulk
                  certificate distribution simple, fast, and accessible to everyone.
                </p>

                {/* Social links for connecting with the developer */}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-6">
                  <motion.div
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="https://github.com/FarhanAlam-Official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Github className="w-5 h-5" />
                        <span>Visit GitHub</span>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="mailto:thefarhanalam01@gmail.com"
                      className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-primary/30 bg-background/80 backdrop-blur-sm hover:border-primary/60 hover:bg-primary/5 text-primary font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Get in Touch</span>
                    </Link>
                  </motion.div>
                </div>

                {/* Developer quote section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="relative pt-8"
                >
                  <div className="absolute left-0 md:left-8 top-0 text-6xl md:text-7xl font-serif text-primary/20 leading-none">"</div>
                  <p className="text-base md:text-lg text-muted-foreground italic pl-8 md:pl-16 pt-4 border-l-2 border-primary/20">
                    Building tools that make life easier, one line of code at a time.
                  </p>
                </motion.div>
              </motion.div>

              {/* Profile Picture - Floating Right */}
              <motion.div
                variants={fadeInUp}
                className="flex justify-center md:block order-1 md:order-2"
              >
                <div className="relative inline-block">
                  {/* Irregular SVG Background Shape - Larger & More Organic */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 0.95, 1],
                      rotate: [0, 5, -5, 0],
                      x: [0, 10, -5, 0],
                      y: [0, -5, 10, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -inset-16 md:-inset-20 -z-10"
                  >
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 400 400"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                          <stop offset="30%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                          <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
                        </linearGradient>
                        <filter id="blur">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                        </filter>
                        <radialGradient id="radialGradient" cx="50%" cy="50%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
                        </radialGradient>
                      </defs>
                      {/* Multiple organic shapes for depth */}
                      <path
                        d="M 100 80 Q 150 30 220 60 Q 280 40 320 100 Q 340 150 300 220 Q 250 280 180 260 Q 100 270 60 210 Q 40 160 70 110 Q 80 90 100 80 Z"
                        fill="url(#profileGradient)"
                        filter="url(#blur)"
                        style={{ transformOrigin: "center" }}
                      />
                      <ellipse
                        cx="200"
                        cy="200"
                        rx="180"
                        ry="170"
                        fill="url(#radialGradient)"
                        filter="url(#blur)"
                        opacity="0.6"
                      />
                    </svg>
                  </motion.div>
                  
                  {/* Profile Picture Container - More Dynamic with Blue Shadow */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="relative z-10 w-52 h-52 md:w-64 md:h-64 rounded-full"
                    style={{ boxShadow: "none" }}
                  >
                    {/* Outer Blue Glow/Smoke Effect - Multiple Layers */}
                    <motion.div
                      animate={{
                        opacity: [0.6, 1.0, 0.6],
                        scale: [0.95, 1.2, 0.95],
                        x: [0, 10, 0],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full -z-20"
                      style={{
                        background: "radial-gradient(circle at center, hsl(var(--primary) / 0.7) 0%, hsl(var(--primary) / 0.5) 30%, hsl(var(--primary) / 0.3) 60%, transparent 80%)",
                        filter: "blur(25px)",
                        boxShadow: "none",
                      }}
                    />
                    <motion.div
                      animate={{
                        opacity: [0.4, 0.9, 0.4],
                        scale: [1.05, 1.25, 1.05],
                        x: [0, -15, 0],
                        y: [0, 15, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="absolute inset-0 rounded-full -z-20"
                      style={{
                        background: "radial-gradient(circle at center, hsl(var(--accent) / 0.6) 0%, hsl(var(--accent) / 0.4) 40%, hsl(var(--accent) / 0.2) 70%, transparent 90%)",
                        filter: "blur(30px)",
                      }}
                    />
                    
                    {/* Profile Image with Glassmorphism Effect */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 20, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className="w-full h-full"
                      >
                        <Image
                          src="/user.png"
                          alt="EaseSplit Developer"
                          layout="fill"
                          objectFit="cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    </div>
                    
                    {/* Inner Glow Effect */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_#09bc8a40] pointer-events-none"></div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Developer CTA */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <Button size="lg" asChild className="group">
              <Link href="https://github.com/FarhanAlam-Official" target="_blank">
                View on GitHub
                <Github className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

      </section>

      <Footer />
    </main>
  )
}