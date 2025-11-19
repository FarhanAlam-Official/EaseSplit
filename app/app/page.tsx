// Main App Dashboard Page Component
// This is the primary dashboard page where users manage their groups, expenses, and settlements
// It includes multiple tabs for different functionalities and responsive layout for all devices

"use client"

import { useState } from "react"
// React hook for managing component state

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
// Header component for the dashboard with group selection and export/import options

import { GroupSidebar } from "@/components/dashboard/group-sidebar"
// Sidebar component showing group information and quick actions

import { ExpensesTab } from "@/components/dashboard/expenses-tab"
// Tab component for viewing and managing expenses

import { AnalyticsTab } from "@/components/dashboard/analytics-tab"
// Tab component for viewing spending analytics and charts

import { SettlementTab } from "@/components/dashboard/settlement-tab"
// Tab component for viewing settlement recommendations

import { BreakdownTab } from "@/components/dashboard/breakdown-tab"
// Tab component for detailed expense breakdowns

import { AddExpenseModal } from "@/components/dashboard/add-expense-modal"
// Modal component for adding new expenses

import { EditExpenseModal } from "@/components/dashboard/edit-expense-modal"
// Modal component for editing existing expenses

import { GroupSelectorModal } from "@/components/dashboard/group-selector-modal"
// Modal component for selecting or creating groups

import { ExportImportModal } from "@/components/dashboard/export-import-modal"
// Modal component for importing/exporting data

import { QuickStats } from "@/components/dashboard/quick-stats"
// Component showing quick summary statistics for the active group

import { RecentActivity } from "@/components/dashboard/recent-activity"
// Component showing recent activity in the group

import { CategoryManager } from "@/components/dashboard/category-manager"
// Component for managing expense categories

import { Header } from "@/components/header"
// Shared header component for consistent navigation

import { Footer } from "@/components/footer"
// Shared footer component for consistent layout

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// UI component for tabbed navigation

import { Button } from "@/components/ui/button"
// Styled button component from UI library

import { Card } from "@/components/ui/card"
// Styled card component for content containers

import { Receipt, PieChart, ArrowRightLeft, FileText, Settings, Users, Sparkles, TrendingUp, DollarSign, CheckCircle, Download, Shield, Clock } from "lucide-react"
// Icon components for visual representation of features and tabs

import { useApp } from "@/lib/app-context"
// Custom hook for accessing global app state and context

import { motion } from "framer-motion"
// Animation library for smooth transitions and hover effects

import { MembersTab } from "@/components/dashboard/members-tab"
// Tab component for managing group members

/**
 * Main App Dashboard Page Component
 * Renders the primary dashboard interface with tabs for different functionalities
 * Handles state for modals and group selection
 */
export default function AppPage() {
  // Access the active group from app context
  const { activeGroup } = useApp()
  
  // State variables for managing modal visibility
  const [expenseModalOpen, setExpenseModalOpen] = useState(false)
  const [editExpenseId, setEditExpenseId] = useState<string | null>(null)
  const [groupSelectorOpen, setGroupSelectorOpen] = useState(false)
  const [exportImportOpen, setExportImportOpen] = useState(false)

  /**
   * Handler function for editing an expense
   * @param expenseId - ID of the expense to edit
   */
  const handleEditExpense = (expenseId: string) => {
    setEditExpenseId(expenseId)
  }

  // Render welcome screen when no group is selected
  if (!activeGroup) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          <div className="relative overflow-hidden">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-1/3 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
            
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
              {/* Hero Section - Welcome message and call-to-action buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16"
              >
                <div className="inline-flex items-center justify-center gap-3 mb-4 sm:mb-6">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1.1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                    className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-xl shadow-primary/20"
                  >
                    <Receipt className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
                    <motion.div
                      className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-20 blur-md"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight"
                  >
                    Welcome to{" "}
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      EaseSplit
                    </span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
                  >
                    Create your first group and start tracking expenses with friends in seconds. 
                    <span className="block mt-2 font-medium text-foreground/80">Split bills. Stay friends.</span>
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
                >
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                    onClick={() => setGroupSelectorOpen(true)}
                  >
                    <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                    Create Your First Group
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 hover:scale-105 hover:border-primary/50 transition-all duration-300 group"
                    onClick={() => setExportImportOpen(true)}
                  >
                    <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-0.5 transition-transform" />
                    Import Existing Data
                  </Button>
                </motion.div>
              </motion.div>

              {/* Features Grid - Highlights key app features */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 px-4"
              >
                {[
                  {
                    icon: Receipt,
                    title: "Track Expenses",
                    description: "Add and manage expenses with flexible split options",
                    color: "from-primary/20 to-primary/5",
                    iconColor: "text-primary",
                    hoverColor: "hover:shadow-primary/20"
                  },
                  {
                    icon: PieChart,
                    title: "View Analytics",
                    description: "Get insights on spending patterns and categories",
                    color: "from-blue-500/20 to-blue-500/5",
                    iconColor: "text-blue-600",
                    hoverColor: "hover:shadow-blue-500/20"
                  },
                  {
                    icon: TrendingUp,
                    title: "Smart Splitting",
                    description: "Split bills equally, by percentage, or custom amounts",
                    color: "from-purple-500/20 to-purple-500/5",
                    iconColor: "text-purple-600",
                    hoverColor: "hover:shadow-purple-500/20"
                  },
                  {
                    icon: CheckCircle,
                    title: "Easy Settlement",
                    description: "Minimize payments with optimized settlement plans",
                    color: "from-green-500/20 to-green-500/5",
                    iconColor: "text-green-600",
                    hoverColor: "hover:shadow-green-500/20"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <Card className={`p-5 sm:p-6 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 group cursor-pointer ${feature.hoverColor}`}>
                      <motion.div 
                        className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <feature.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${feature.iconColor}`} />
                      </motion.div>
                      <h3 className="font-semibold text-base sm:text-lg text-foreground mb-2">{feature.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Trust Indicators - Highlights app benefits and guarantees */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-12 sm:mb-16 px-4"
              >
                {[
                  { icon: Shield, text: "100% Private & Secure" },
                  { icon: Clock, text: "Lightning Fast" },
                  { icon: Users, text: "Unlimited Groups" }
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* How It Works - Step-by-step explanation of using the app */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 md:p-12 mx-4 sm:mx-0"
              >
                <div className="text-center mb-8 sm:mb-12">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-3"
                  >
                    How EaseSplit Works
                  </motion.h2>
                  <p className="text-muted-foreground text-base sm:text-lg">Getting started is quick and easy</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {[
                    {
                      step: "01",
                      icon: Users,
                      title: "Create a Group",
                      description: "Start by creating a group and inviting members who'll share expenses"
                    },
                    {
                      step: "02",
                      icon: DollarSign,
                      title: "Add Expenses",
                      description: "Record expenses as they happen with customizable split options"
                    },
                    {
                      step: "03",
                      icon: ArrowRightLeft,
                      title: "Settle Up",
                      description: "View who owes what and settle debts with optimized payment plans"
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 + index * 0.15 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <div className="text-center space-y-4">
                        <div className="relative inline-flex items-center justify-center">
                          <motion.div 
                            className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                          />
                          <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                            <step.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                          </div>
                          <motion.span 
                            className="absolute -top-2 -right-2 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {step.step}
                          </motion.span>
                        </div>
                        <h3 className="font-semibold text-lg sm:text-xl text-foreground">{step.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
                      </div>
                      {index < 2 && (
                        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2" />
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.7 }}
                  className="text-center mt-8 sm:mt-12"
                >
                  <Button 
                    size="lg" 
                    className="group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => setGroupSelectorOpen(true)}
                  >
                    Get Started Now
                    <Sparkles className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
        
        {/* Modals for group selection and data import/export */}
        <GroupSelectorModal open={groupSelectorOpen} onOpenChange={setGroupSelectorOpen} />
        <ExportImportModal open={exportImportOpen} onOpenChange={setExportImportOpen} />
      </div>
    )
  }

  // Render main dashboard when a group is selected
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard header with group selection and export/import options */}
      <DashboardHeader
        onGroupSelect={() => setGroupSelectorOpen(true)}
        onExportImport={() => setExportImportOpen(true)}
      />

      <div className="w-full">
        {/* Quick Stats - Full Width with Container */}
        <div className="border-b border-border/40 bg-card/30">
          <div className="container mx-auto max-w-[1600px] px-3 sm:px-4 lg:px-6 py-4 sm:py-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <QuickStats />
            </motion.div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto max-w-[1600px] px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-4 sm:gap-5 lg:gap-6"
          >
            {/* Left Sidebar - Group information and recent activity */}
            <aside className="space-y-4 sm:space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="sticky top-20"
              >
                <div className="space-y-4 sm:space-y-5">
                  <GroupSidebar onAddExpense={() => setExpenseModalOpen(true)} />
                  <div className="hidden lg:block">
                    <RecentActivity />
                  </div>
                </div>
              </motion.div>
            </aside>

            {/* Main Content - Tabbed interface for different functionalities */}
            <motion.main 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="min-w-0"
            >
              {/* Tabbed navigation for different dashboard sections */}
              <Tabs defaultValue="expenses" className="w-full">
                {/* Compact Tab Navigation */}
                <div className="sticky top-20 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 pb-3 sm:pb-4 mb-4 sm:mb-5 border-b border-border/40">
                  <TabsList className="w-full h-auto p-1 bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm">
                    <div className="grid w-full grid-cols-3 sm:grid-cols-6 gap-1">
                      <TabsTrigger 
                        value="expenses" 
                        className="gap-1.5 flex items-center justify-center py-2.5 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300 text-xs sm:text-sm font-medium hover:bg-primary/10 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                        <Receipt className="h-4 w-4 flex-shrink-0 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="hidden sm:inline relative z-10">Expenses</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="members" 
                        className="gap-1.5 flex items-center justify-center py-2.5 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300 text-xs sm:text-sm font-medium hover:bg-primary/15 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                        <Users className="h-4 w-4 flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                        <span className="hidden sm:inline relative z-10">Members</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="analytics" 
                        className="gap-1.5 flex items-center justify-center py-2.5 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300 text-xs sm:text-sm font-medium hover:bg-accent/60 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                        <PieChart className="h-4 w-4 flex-shrink-0 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="hidden sm:inline relative z-10">Analytics</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="settlement" 
                        className="gap-1.5 flex items-center justify-center py-2.5 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300 text-xs sm:text-sm font-medium hover:bg-primary/12 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/22 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                        <ArrowRightLeft className="h-4 w-4 flex-shrink-0 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        <span className="hidden sm:inline relative z-10">Settlement</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="breakdown" 
                        className="gap-1.5 flex items-center justify-center py-2.5 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300 text-xs sm:text-sm font-medium hover:bg-secondary hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                        <FileText className="h-4 w-4 flex-shrink-0 relative z-10 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300" />
                        <span className="hidden sm:inline relative z-10">Breakdown</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="settings" 
                        className="gap-1.5 flex items-center justify-center py-2.5 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300 text-xs sm:text-sm font-medium hover:bg-muted hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-muted/0 via-muted to-muted/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                        <Settings className="h-4 w-4 flex-shrink-0 relative z-10 group-hover:rotate-90 transition-transform duration-500" />
                        <span className="hidden sm:inline relative z-10">Settings</span>
                      </TabsTrigger>
                    </div>
                  </TabsList>
                </div>

                {/* Tab Content - Different sections of the dashboard */}
                <div className="w-full">
                  <TabsContent value="expenses" className="mt-0 space-y-0">
                    <ExpensesTab 
                      onAddExpense={() => setExpenseModalOpen(true)}
                      onEditExpense={handleEditExpense}
                    />
                  </TabsContent>

                  <TabsContent value="members" className="mt-0 space-y-0">
                    <MembersTab />
                  </TabsContent>

                  <TabsContent value="analytics" className="mt-0 space-y-0">
                    <AnalyticsTab />
                  </TabsContent>

                  <TabsContent value="settlement" className="mt-0 space-y-0">
                    <SettlementTab />
                  </TabsContent>

                  <TabsContent value="breakdown" className="mt-0 space-y-0">
                    <BreakdownTab />
                  </TabsContent>

                  <TabsContent value="settings" className="mt-0 space-y-0">
                    <CategoryManager />
                  </TabsContent>
                </div>
              </Tabs>

              {/* Recent Activity - Mobile - Shows recent activity on mobile devices */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="lg:hidden mt-4 sm:mt-5"
              >
                <RecentActivity />
              </motion.div>
            </motion.main>
          </motion.div>
        </div>
      </div>

      {/* Modals for various actions */}
      <AddExpenseModal open={expenseModalOpen} onOpenChange={setExpenseModalOpen} />
      <EditExpenseModal 
        open={editExpenseId !== null} 
        onOpenChange={(open) => !open && setEditExpenseId(null)}
        expenseId={editExpenseId}
      />
      <GroupSelectorModal open={groupSelectorOpen} onOpenChange={setGroupSelectorOpen} />
      <ExportImportModal open={exportImportOpen} onOpenChange={setExportImportOpen} />
    </div>
  )
}