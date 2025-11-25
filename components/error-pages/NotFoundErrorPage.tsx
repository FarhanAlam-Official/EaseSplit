"use client"

import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, Undo2, Receipt } from "lucide-react"

export default function NotFoundErrorPage() {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-background px-6 py-16">
      <GradientGrid />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col-reverse items-center gap-12 md:flex-row"
      >
        <div className="text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Lost in cyberspace
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-8xl md:text-9xl"
          >
            404
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 max-w-xl text-balance text-muted-foreground"
          >
            The page you are looking for doesn’t exist or has been relocated. Let’s
            get you back to a familiar orbit.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8 grid grid-cols-2 items-center justify-center gap-3 md:justify-start"
          >
            <Button asChild size="lg" className="group">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go home
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="group"
            >
              <Undo2 className="mr-2 h-4 w-4" />
              Go back
            </Button>
            <Button asChild variant="ghost" size="lg" className="group col-span-2">
              <Link href="/app">
                <Receipt className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="relative -mt-20 ml-14 h-[26rem] w-[26rem] sm:-mt-24 sm:ml-20 sm:h-[30rem] sm:w-[30rem] md:-mt-28 md:ml-28 md:h-[34rem] md:w-[34rem]">
          <FloatingAstronaut />
        </div>
      </motion.div>
      <FloatingOrbs />
      <Glow />
    </div>
  )
}

function GradientGrid() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(60rem_30rem_at_50%_110%,hsl(var(--primary)/0.15),transparent),linear-gradient(to_bottom,transparent,hsl(var(--foreground)/0.03))]" />
      <div className="absolute inset-0 [background:linear-gradient(to_right,hsl(var(--foreground)/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
    </div>
  )
}

function Glow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center">
      <div className="h-56 w-[40rem] rounded-full bg-primary/20 blur-3xl dark:bg-primary/25" />
    </div>
  )
}

function FloatingAstronaut() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 120, damping: 14, mass: 0.6 })
  const y = useSpring(my, { stiffness: 120, damping: 14, mass: 0.6 })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width
    const relY = (e.clientY - rect.top) / rect.height
    const range = 18
    mx.set((relX - 0.5) * range)
    my.set((relY - 0.5) * range)
  }

  function handleLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      className="absolute inset-0 translate-x-4 sm:translate-x-6 md:translate-x-8"
      style={{ x, y }}
      initial={{ rotate: -6, y: 8, scale: 0.98 }}
      animate={{ rotate: [-6, -12, -6], y: [10, -10, 10], scale: [0.98, 1.04, 0.98] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      drag
      dragConstraints={{ left: -24, right: 24, top: -24, bottom: 24 }}
      dragElastic={0.12}
    >
      {/* CSS Astronaut Illustration */}
      <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none drop-shadow-[0_14px_50px_rgba(0,0,0,0.3)]">
        {/* Astronaut Body */}
        <div className="relative">
          {/* Helmet */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
            {/* Glass/Visor */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-blue-600/40 backdrop-blur-sm border-4 border-slate-300 dark:border-slate-600" />
            {/* Reflection */}
            <div className="absolute top-6 left-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/40 blur-md" />
            {/* Face (simple emoji style) */}
            <div className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl">
              👨‍🚀
            </div>
          </div>
          
          {/* Body */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-600 dark:to-slate-800 rounded-2xl border-4 border-slate-300 dark:border-slate-500">
            {/* Chest Pack */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-16 sm:w-14 sm:h-18 bg-slate-800 dark:bg-slate-900 rounded-lg border-2 border-slate-600">
              <div className="flex flex-col gap-1 p-1">
                <div className="h-1 w-full bg-red-500 rounded" />
                <div className="h-1 w-full bg-green-500 rounded" />
                <div className="h-1 w-full bg-blue-500 rounded" />
              </div>
            </div>
          </div>

          {/* Left Arm */}
          <div className="absolute top-24 -left-8 sm:top-28 sm:-left-10 md:top-32 md:-left-12 w-6 h-20 sm:w-7 sm:h-24 md:w-8 md:h-28 bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-600 dark:to-slate-800 rounded-full border-2 border-slate-300 dark:border-slate-500 origin-top rotate-12" />
          
          {/* Right Arm */}
          <div className="absolute top-24 -right-8 sm:top-28 sm:-right-10 md:top-32 md:-right-12 w-6 h-20 sm:w-7 sm:h-24 md:w-8 md:h-28 bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-600 dark:to-slate-800 rounded-full border-2 border-slate-300 dark:border-slate-500 origin-top -rotate-12" />

          {/* Floating Particles */}
          <motion.div
            className="absolute -top-4 -right-8 w-2 h-2 bg-yellow-400 rounded-full"
            animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-8 -left-10 w-1.5 h-1.5 bg-blue-400 rounded-full"
            animate={{ y: [10, -10, 10], opacity: [1, 0.5, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-8 right-4 w-2.5 h-2.5 bg-purple-400 rounded-full"
            animate={{ y: [-5, 15, -5], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  )
}

function FloatingOrbs() {
  const orbs = [
    { size: 220, x: -280, y: -80, c: "var(--primary)" },
    { size: 140, x: 280, y: 40, c: "var(--foreground)" },
    { size: 90, x: -40, y: 160, c: "var(--muted-foreground)" },
  ] as const

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{
            width: o.size,
            height: o.size,
            left: `calc(50% + ${o.x}px)`,
            top: `calc(50% + ${o.y}px)`,
            background: `radial-gradient(circle, hsl(${o.c}/0.5), transparent 60%)`,
          }}
          initial={{ y: 0 }}
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}