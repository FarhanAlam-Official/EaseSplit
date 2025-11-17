"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  DollarSign, 
  Menu, 
  X, 
  Home,
  Sparkles,
  Lightbulb,
  Users,
  Mail,
  Moon,
  Sun
} from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/features", label: "Features", icon: Sparkles },
  { href: "/how-it-works", label: "How It Works", icon: Lightbulb },
  { href: "/about", label: "About", icon: Users },
  { href: "/contact", label: "Contact", icon: Mail },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <img src="/logo.png" alt="EaseSplit" className="h-10 w-10 object-contain" />
          </motion.div>
          <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            EaseSplit
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-lg
                    transition-all duration-300 ease-in-out
                    flex items-center gap-2 group
                    hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-950 dark:hover:text-green-400
                    ${active 
                      ? 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400' 
                      : 'text-muted-foreground'
                    }
                  `}
                >
                  <motion.div
                    initial={false}
                    animate={{ 
                      scale: active ? 1.1 : 1,
                      rotate: active ? 360 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg hover:bg-accent"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.div>
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Get Started Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              asChild 
              className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
              size="lg"
            >
              <Link href="/app">
                <DollarSign className="h-4 w-4" />
                Get Started
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors ml-auto" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileMenuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const Icon = link.icon
                const active = isActive(link.href)
                return (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-lg
                        transition-all duration-200
                        flex items-center gap-2
                        hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-950 dark:hover:text-green-400
                        ${active 
                          ? 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400'
                          : 'text-muted-foreground'
                        }
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
              
              {/* Mobile Theme Toggle */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" />
                      Dark Mode
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Mobile Get Started Button */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: (navLinks.length + 1) * 0.05 }}
              >
                <Button 
                  asChild 
                  className="w-full gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  size="lg"
                >
                  <Link href="/app">
                    <DollarSign className="h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
