"use client"

import { motion } from "framer-motion"
import { Github, Linkedin } from "lucide-react"
import Link from "next/link"

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            About <span className="text-primary">EaseSplit</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border p-8 mb-12"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            EaseSplit is a lightweight, privacy-first bill-splitting app designed to run entirely in the browser. Built
            with modern web UI patterns and a clean green money theme, it helps friends and groups split expenses
            without any accounts, servers, or complicated setup. Your data stays on your device.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border p-8 text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
              FA
            </div>
          </div>
          <h3 className="text-xl font-semibold text-foreground">Farhan Alam</h3>
          <p className="text-primary font-medium">Developer</p>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Creates student-focused web tools and teaching materials. Loves clean UI and small efficient apps.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Link
              href="https://github.com"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
