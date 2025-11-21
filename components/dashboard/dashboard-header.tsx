"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DollarSign, Home, Users, FileDown } from "lucide-react"
import { useApp } from "@/lib/app-context"

interface DashboardHeaderProps {
  onGroupSelect: () => void
  onExportImport: () => void
}

export function DashboardHeader({ onGroupSelect, onExportImport }: DashboardHeaderProps) {
  const { activeGroup, groups } = useApp()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-14 max-w-[1600px] items-center justify-between px-3 sm:px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2 group hover:opacity-90 transition-all">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg shadow-md group-hover:shadow-lg transition-all">
            <img 
              src="/logo.png" 
              alt="EaseSplit Logo" 
              className="h-8 w-8 object-contain"
            />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">EaseSplit</span>
            <span className="hidden sm:block text-[9px] font-medium text-muted-foreground tracking-wider">Dashboard</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onGroupSelect} className="gap-2 bg-transparent hover:bg-accent h-9">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline max-w-[120px] truncate">{activeGroup ? activeGroup.name : "Select Group"}</span>
            {groups.length > 0 && (
              <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{groups.length}</span>
            )}
          </Button>

          <Button variant="outline" size="sm" onClick={onExportImport} className="gap-2 bg-transparent hover:bg-accent h-9">
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Button variant="outline" size="sm" asChild className="hover:bg-accent h-9">
            <Link href="/">
              <Home className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
