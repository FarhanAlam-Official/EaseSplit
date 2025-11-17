"use client"

import { motion } from "framer-motion"
import { Users, Receipt, ArrowRightLeft } from "lucide-react"

const steps = [
  {
    step: 1,
    icon: Users,
    title: "Create a group",
    description: "Name the trip or event and choose your currency. Add all participants who will be sharing expenses.",
  },
  {
    step: 2,
    icon: Receipt,
    title: "Add members & expenses",
    description:
      "Add participants, record who paid, and choose how to split — equally, by shares, percentage, or custom amounts.",
  },
  {
    step: 3,
    icon: ArrowRightLeft,
    title: "Settle & export",
    description: "View minimal transfers needed to settle all debts, export a PDF summary, or copy to clipboard.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-accent/30">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground"
          >
            How It <span className="text-primary">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Three simple steps to split bills fairly
          </motion.p>
        </div>

        <div className="space-y-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex-shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-xl">
                  {item.step}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <item.icon className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
