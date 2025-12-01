"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DollarSign, Home, Users, FileDown, Sparkles } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { motion } from "framer-motion"

interface DashboardHeaderProps {
  onGroupSelect: () => void
  onExportImport: () => void
}

export function DashboardHeader({ onGroupSelect, onExportImport }: DashboardHeaderProps) {
  const { activeGroup, groups } = useApp()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 max-w-[1600px] items-center justify-between px-3 sm:px-4 lg:px-6">
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
              Dashboard
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onGroupSelect} 
              className="gap-2 bg-transparent hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary h-9 border-border/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline max-w-[120px] truncate">{activeGroup ? activeGroup.name : "Select Group"}</span>
              {groups.length > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{groups.length}</span>
              )}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onExportImport} 
              className="gap-2 bg-transparent hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary h-9 border-border/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <FileDown className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary h-9 border-border/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}