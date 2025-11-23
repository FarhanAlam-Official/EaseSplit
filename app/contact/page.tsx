// Contact Page Component
// This page provides users with multiple ways to get in touch with the EaseSplit team
// Includes contact information cards, a contact form, and frequently asked questions

"use client"

import { Header } from "@/components/header"
// Shared header component for consistent navigation

import { Footer } from "@/components/footer"
// Shared footer component for consistent layout

import { motion } from "framer-motion"
// Animation library for smooth transitions and hover effects

import { Mail, MessageSquare, Send, MapPin, Phone, Clock, Github, Twitter, Linkedin } from "lucide-react"
// Icon components for visual representation of contact methods and social links

import { Button } from "@/components/ui/button"
// Styled button component from UI library

import { Input } from "@/components/ui/input"
// Styled input component for form fields

import { Textarea } from "@/components/ui/textarea"
// Styled textarea component for message field

import { useState } from "react"
// React hook for managing form state

// Contact information data structure
const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@easesplit.app",
    description: "We'll respond within 24 hours",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    value: "Available 9AM - 6PM EST",
    description: "Get instant support",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "San Francisco, CA",
    description: "Building the future",
    color: "from-purple-500 to-pink-500",
  },
]

// Social media links data structure
const socialLinks = [
  { icon: Github, label: "GitHub", href: "#", color: "hover:text-gray-900 dark:hover:text-gray-100" },
  { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-blue-400" },
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-blue-600" },
]

// Frequently asked questions data structure
const faqs = [
  {
    question: "How do I get started?",
    answer: "Simply click 'Get Started' and create your first group. No account or installation needed!",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely! All data is stored locally on your device. We never send anything to our servers.",
  },
  {
    question: "Can I export my data?",
    answer: "Yes! You can export PDF reports or copy settlement details anytime.",
  },
  {
    question: "Is it really free?",
    answer: "Yes! EaseSplit is completely free with no hidden costs or premium tiers.",
  },
]

/**
 * Contact Page Component
 * Renders the contact page with contact information, form, and FAQs
 */
export default function ContactPage() {
  // State for managing form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  /**
   * Handle form submission
   * @param e - Form event object
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section - Introduces the contact page with animated background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 pt-32 pb-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
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
              <MessageSquare className="h-4 w-4" />
              We're Here to Help
            </motion.div>

            {/* Main headline with gradient effect on key words */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Get in
              <span className="block text-primary mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>

            {/* Description of the page's purpose */}
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Have questions, feedback, or need help? We'd love to hear from you. 
              Our team is here to make your experience amazing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards - Displays various ways to contact the team */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Map through contact info to display each method with animation */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Gradient background effect on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                {/* Contact method card with icon, title, and details */}
                <div className="relative p-8 rounded-3xl bg-card border border-border group-hover:border-primary/40 transition-all duration-300 text-center backdrop-blur-sm">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${info.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{info.title}</h3>
                  <p className="text-lg text-primary font-semibold mb-2">{info.value}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form - Allows users to send messages directly */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact information and social links section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Fill out the form and we'll get back to you as soon as possible. 
                We typically respond within 24 hours.
              </p>

              {/* Support information cards */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Response Time</h4>
                    <p className="text-muted-foreground">We aim to respond within 24 hours on business days</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Support Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday, 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              </div>

              {/* Social media links section */}
              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-card border border-border hover:border-primary/40 transition-all ${social.color}`}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact form with animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Form for user messages */}
              <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-3xl bg-card border border-border backdrop-blur-sm">
                {/* Name input field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>

                {/* Email input field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>

                {/* Subject input field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>

                {/* Message textarea field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your question or feedback..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full"
                  />
                </div>

                {/* Submit button with animation */}
                <Button type="submit" size="lg" className="w-full group">
                  Send Message
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Answers to common questions */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Section header with animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions
            </p>
          </motion.div>

          {/* FAQ items with animation */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}