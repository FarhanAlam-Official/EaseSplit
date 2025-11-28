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
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover:blur-lg transition-all" />
            <img 
              src="/logo.png" 
              alt="EaseSplit Logo" 
              className="relative h-10 w-10 object-contain drop-shadow-lg"
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent group-hover:from-primary/90 group-hover:to-primary transition-all">
              EaseSplit
            </span>
            <span className="text-[10px] font-medium text-muted-foreground tracking-wider">
              Split bills. Stay friends.
            </span>
          </div>
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
                    hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary
                    ${active 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary' 
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
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-primary rounded-lg blur-md opacity-50"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Button 
              asChild 
              className="relative gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/40 hover:shadow-2xl hover:shadow-primary/60 transition-all duration-300 border border-primary/20 font-semibold"
              size="lg"
            >
              <Link href="/app" className="flex items-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                <span className="ml-2">Get Started</span>
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-2 ml-auto">
          {/* Mobile Theme Toggle */}
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

          {/* Mobile Menu Button */}
          <button 
            className="p-2 rounded-lg hover:bg-accent transition-colors" 
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
                        hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary
                        ${active 
                          ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
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
              
              {/* Mobile Get Started Button */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: (navLinks.length + 1) * 0.05 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-primary rounded-lg blur-md opacity-50"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Button 
                  asChild 
                  className="relative w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/40 border border-primary/20 font-semibold"
                  size="lg"
                >
                  <Link href="/app" onClick={() => setMobileMenuOpen(false)}>
                    <Sparkles className="h-4 w-4" />
                    Get Started Free
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
