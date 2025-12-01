// Footer Component
// This component provides the site-wide footer with navigation links, contact information,
// newsletter signup, social media links, and developer options

"use client"

import Link from "next/link"
// Next.js component for client-side navigation

import { motion } from "framer-motion"
// Animation library for smooth transitions and hover effects

import { 
  Mail, MapPin, Phone, Github, Twitter, Linkedin, Facebook, 
  Instagram, Heart, ArrowRight, Shield, Zap, Users,
  Code, Terminal, Database, Cpu
} from "lucide-react"
// Icon components for visual representation of contact info, social links, and features

import { Button } from "@/components/ui/button"
// Styled button component from UI library

// Footer navigation links organized by category
const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Support", href: "#" },
    { label: "Community", href: "#" },
    { label: "Status", href: "#" },
  ],
  developers: [
    { label: "API Documentation", href: "#" },
    { label: "GitHub Repository", href: "#" },
    { label: "Developer Blog", href: "#" },
    { label: "Contribution Guide", href: "#" },
  ],
}

// Social media links with icons and hover effects
const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-blue-400" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/farhanalam930", color: "hover:text-blue-600" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/farhan.alam.01", color: "hover:text-pink-500" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/farhan-alam-aa56b2309", color: "hover:text-blue-700" },
  { icon: Github, label: "GitHub", href: "https://github.com/FarhanAlam-Official", color: "hover:text-gray-900 dark:hover:text-gray-100" },
]

// Key features highlighted in the footer
const features = [
  { icon: Shield, label: "100% Private" },
  { icon: Zap, label: "Lightning Fast" },
  { icon: Users, label: "Group Friendly" },
]

// Developer tools and resources
const developerTools = [
  { icon: Code, label: "Open Source" },
  { icon: Terminal, label: "CLI Tools" },
  { icon: Database, label: "API Access" },
  { icon: Cpu, label: "Self-Hosted" },
]

/**
 * Footer Component
 * Renders the site-wide footer with navigation links, contact information,
 * newsletter signup, social media links, and developer options
 * 
 * @component
 * @returns {JSX.Element} Rendered footer component
 */
export function Footer() {
  return (
    <footer className="relative border-t border-border bg-gradient-to-br from-background via-primary/5 to-accent/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-7 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 space-y-6">
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover:blur-lg transition-all" />
                  <img 
                    src="/logo.png" 
                    alt="EaseSplit Logo" 
                    className="relative h-12 w-12 object-contain drop-shadow-lg"
                  />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    EaseSplit
                  </span>
                  <span className="text-xs font-medium text-muted-foreground tracking-wider">
                    Split bills. Stay friends.
                  </span>
                </div>
              </Link>
              <p className="text-muted-foreground leading-relaxed max-w-xs">
                The smartest way to split bills with friends. Fast, private, and beautifully simple.
              </p>
              
              {/* Quick Features */}
              <div className="flex flex-wrap gap-2">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                  >
                    <feature.icon className="h-3.5 w-3.5" />
                    {feature.label}
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:thefarhanalam01@gmail.com" className="hover:text-foreground transition-colors">
                    thefarhanalam01@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              © {new Date().getFullYear()} EaseSplit. Made with 
              <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" /> 
              by <a href="https://github.com/FarhanAlam-Official" target="_blank" rel="noopener noreferrer" className="font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:from-primary/90 hover:to-primary transition-all no-underline">Farhan Alam</a>
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border hover:border-primary/40 transition-all ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Additional Links */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}