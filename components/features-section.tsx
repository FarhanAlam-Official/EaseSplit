"use client"

import { motion } from "framer-motion"
import { Users, DollarSign, FileText, Shield, BarChart3, Zap } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Create Groups",
    description: "Create named groups and invite friends locally for trips, events, or shared expenses.",
  },
  {
    icon: DollarSign,
    title: "Smart Splits",
    description: "Equal, shares, percentage, itemized, or custom splits — choose what works for you.",
  },
  {
    icon: FileText,
    title: "Export & Share",
    description: "Download PDF summary or copy settlement steps to share with your group.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All data stored locally on your device. Nothing is sent to external servers.",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Beautiful charts showing expenses by category, member, and over time.",
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description: "Smart algorithm suggests minimal transfers to settle all balances quickly.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground"
          >
            Powerful <span className="text-primary">Features</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Everything you need for hassle-free bill splitting
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent group-hover:bg-primary/10 transition-colors">
                <feature.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
