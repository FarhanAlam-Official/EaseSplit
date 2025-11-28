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

import { Mail, MessageSquare, Send, MapPin, Phone, Clock, Github, Twitter, Linkedin, Facebook, Instagram } from "lucide-react"
// Icon components for visual representation of contact methods and social links

import { Button } from "@/components/ui/button"
// Styled button component from UI library

import { Input } from "@/components/ui/input"
// Styled input component for form fields

import { Textarea } from "@/components/ui/textarea"
// Styled textarea component for message field

import { useState } from "react"
// React hook for managing form state

import { notifications } from "@/lib/notifications"
// Notification system for user feedback

// Contact information data structure
const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "easesplit.tool@gmail.com",
    description: "We'll respond within 24 hours",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    value: "Available 9AM - 6PM NPT",
    description: "Get instant support",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Bharatpur-03, Chitwan",
    description: "Nepal",
    color: "from-purple-500 to-pink-500",
  },
]

// Social media links data structure
const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/FarhanAlam-Official", color: "hover:text-gray-900 dark:hover:text-gray-100" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/farhanalam930", color: "hover:text-blue-600" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/farhan.alam.01", color: "hover:text-pink-500" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/farhan-alam-aa56b2309", color: "hover:text-blue-700" },
  { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-blue-400" },
]

// Frequently asked questions data structure
const faqs = [
  {
    question: "How do I get started?",
    answer: "Simply click 'Get Started' and create your first group. No account or installation needed! You can add members, track expenses, and settle debts instantly.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely! All data is stored locally on your device using browser storage. We never send anything to our servers, ensuring complete privacy and security.",
  },
  {
    question: "Can I export my data?",
    answer: "Yes! You can export detailed PDF reports with expense breakdowns, copy settlement details, or export/import your entire group data as JSON files for backup purposes.",
  },
  {
    question: "Is it really free?",
    answer: "Yes! EaseSplit is completely free with no hidden costs, premium tiers, or subscription fees. All features are available to everyone, forever.",
  },
  {
    question: "How does the settlement calculation work?",
    answer: "Our smart algorithm calculates the minimum number of transactions needed to settle all debts. It analyzes who owes what and provides the most efficient payment plan.",
  },
  {
    question: "Can I use EaseSplit offline?",
    answer: "Yes! Since all data is stored locally, you can use EaseSplit completely offline. However, you'll need an internet connection for features like email notifications.",
  },
  {
    question: "How many groups can I create?",
    answer: "There's no limit! You can create as many groups as you need and manage multiple groups simultaneously. Perfect for different friend circles, trips, or household expenses.",
  },
  {
    question: "Can I edit or delete expenses after adding them?",
    answer: "Absolutely! You can edit any expense details including amount, description, category, or split method. You can also delete expenses if they were added by mistake.",
  },
  {
    question: "What expense splitting methods are supported?",
    answer: "We support equal split, custom amounts, percentages, and shares. You can also mark specific members who participated in each expense for accurate tracking.",
  },
  {
    question: "How do I share group data with others?",
    answer: "You can export your group as a JSON file and share it with members. They can import it into their EaseSplit to see the same data and continue managing expenses.",
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

  // State for tracking submission status
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // State for managing FAQ interactions
  const [hoveredFaqIndex, setHoveredFaqIndex] = useState<number | null>(null)
  const [clickedFaqIndex, setClickedFaqIndex] = useState<number | null>(null)

  /**
   * Handle FAQ click to toggle open/close state
   * @param index - Index of the clicked FAQ
   */
  const handleFaqClick = (index: number) => {
    if (clickedFaqIndex === index) {
      // If already clicked, close it
      setClickedFaqIndex(null)
    } else {
      // Open the clicked FAQ
      setClickedFaqIndex(index)
    }
  }

  /**
   * Check if FAQ should be open (either hovered or clicked)
   * @param index - Index of the FAQ
   */
  const isFaqOpen = (index: number) => {
    return clickedFaqIndex === index || (hoveredFaqIndex === index && clickedFaqIndex !== index)
  }

  /**
   * Handle form submission
   * @param e - Form event object
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Show success message
      notifications.showSuccess({
        title: "Message Sent!",
        description: data.message || "We'll get back to you within 24 hours.",
      })

      // Reset form and set submitted state
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitted(true)

      // Reset submitted state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      // Show error message
      notifications.showError({
        title: "Failed to Send",
        description: error instanceof Error ? error.message : "Please try again later or contact us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
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
              <span className="text-primary ml-2 mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
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
                    <p className="text-muted-foreground">Monday - Friday, 9:00 AM - 6:00 PM NPT</p>
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
                {/* Success message after submission */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-primary"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="font-medium">Message sent successfully!</p>
                    </div>
                  </motion.div>
                )}

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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    rows={6}
                    className="w-full"
                  />
                </div>

                {/* Submit button with animation and loading state */}
                <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
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

          {/* FAQ items with animation and interactive hover/click */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredFaqIndex(index)}
                onMouseLeave={() => setHoveredFaqIndex(null)}
                onClick={() => handleFaqClick(index)}
                className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 cursor-pointer group"
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-6">
                  {/* Question with arrow indicator */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 flex-1">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ 
                        rotate: isFaqOpen(index) ? 180 : 0,
                        scale: isFaqOpen(index) ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0 mt-1"
                    >
                      <svg 
                        className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Answer with smooth expand/collapse animation */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isFaqOpen(index) ? "auto" : 0,
                      opacity: isFaqOpen(index) ? 1 : 0,
                      marginTop: isFaqOpen(index) ? 12 : 0,
                    }}
                    transition={{ 
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>

                  {/* Locked state indicator */}
                  {clickedFaqIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-3 right-12 flex items-center gap-1 text-xs text-primary font-medium"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional help section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border backdrop-blur-sm">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Feel free to reach out to our support team.
              </p>
              <Button 
                size="lg" 
                className="group"
                onClick={() => {
                  // Scroll to contact form
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Contact Support
                <MessageSquare className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}