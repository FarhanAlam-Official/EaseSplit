"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { AppData, Group, Member, Expense, SMTPConfig, Activity } from "./types"
import { loadAppData, saveAppData } from "./storage"
import { calculateMemberBalances, simplifyDebts } from "./calculations"
import { getCurrencySymbol } from "./utils"

interface AppContextType {
  data: AppData
  activeGroup: Group | null
  groups: Group[]

  // Group operations
  createGroup: (name: string, currency: string) => string
  updateGroup: (groupId: string, updates: Partial<Group>) => void
  deleteGroup: (groupId: string) => void
  setActiveGroup: (groupId: string) => void

  // Member operations
  addMember: (name: string, email?: string) => void
  updateMember: (memberId: string, updates: Partial<Member>) => void
  removeMember: (memberId: string) => void

  // Expense operations
  addExpense: (expense: Omit<Expense, "id">) => void
  updateExpense: (expenseId: string, updates: Partial<Expense>) => void
  removeExpense: (expenseId: string) => void

  // Balance and settlement
  getMemberBalance: (memberId: string) => number
  getSettlements: () => { from: string; to: string; amount: number }[]
  totalSpent: number

  // Data operations
  setData: (data: AppData) => void

  // SMTP config (in memory only)
  smtpConfig: SMTPConfig | null
  setSMTPConfig: (config: SMTPConfig | null) => void

  // Activity tracking
  addActivity: (type: Activity["type"], description: string) => void
  getRecentActivities: (limit?: number) => Activity[]

  // Custom categories
  addCustomCategory: (category: string) => void
  removeCustomCategory: (category: string) => void
  getAvailableCategories: () => string[]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const getDefaultData = (): AppData => ({
  groups: [],
  activeGroupId: null,
  meta: { lastUpdated: new Date().toISOString(), version: "1.0.0" },
})

const DEFAULT_CATEGORIES = ["Food", "Travel", "Accommodation", "Stay", "Shopping", "Entertainment", "Utilities", "Other", "Misc"]

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<AppData>(getDefaultData)
  const [smtpConfig, setSMTPConfig] = useState<SMTPConfig | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const loaded = loadAppData()
    if (loaded && Array.isArray(loaded.groups)) {
      setDataState(loaded)
    } else {
      setDataState(getDefaultData())
    }
    setIsHydrated(true)

    const handleStorage = () => {
      const fresh = loadAppData()
      if (fresh && Array.isArray(fresh.groups)) {
        setDataState(fresh)
      }
    }

    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const setData = useCallback((newData: AppData) => {
    if (newData && Array.isArray(newData.groups)) {
      setDataState(newData)
      saveAppData(newData)
    }
  }, [])

  const groups = data?.groups ?? []
  const activeGroup = groups.find((g) => g.id === data?.activeGroupId) || null

  const createGroup = useCallback(
    (name: string, currency: string): string => {
      const newGroup: Group = {
        id: `g_${Date.now()}`,
        name,
        currency,
        createdAt: new Date().toISOString(),
        members: [],
        expenses: [],
        settings: { simplifyDebts: true, rounding: "nearest-1" },
        customCategories: [],
        activities: [],
      }
      const newData: AppData = {
        ...data,
        groups: [...groups, newGroup],
        activeGroupId: newGroup.id,
        meta: data?.meta ?? { lastUpdated: new Date().toISOString(), version: "1.0.0" },
      }
      setData(newData)
      return newGroup.id
    },
    [data, groups, setData],
  )

  const updateGroup = useCallback(
    (groupId: string, updates: Partial<Group>) => {
      const newData: AppData = {
        ...data,
        groups: groups.map((g) => (g.id === groupId ? { ...g, ...updates } : g)),
        meta: data?.meta ?? { lastUpdated: new Date().toISOString(), version: "1.0.0" },
      }
      setData(newData)
    },
    [data, groups, setData],
  )

  const deleteGroup = useCallback(
    (groupId: string) => {
      const newGroups = groups.filter((g) => g.id !== groupId)
      const newActiveId = data?.activeGroupId === groupId ? newGroups[0]?.id || null : data?.activeGroupId
      setData({
        ...data,
        groups: newGroups,
        activeGroupId: newActiveId,
        meta: data?.meta ?? { lastUpdated: new Date().toISOString(), version: "1.0.0" },
      })
    },
    [data, groups, setData],
  )

  const setActiveGroup = useCallback(
    (groupId: string) => {
      setData({
        ...data,
        activeGroupId: groupId,
        meta: data?.meta ?? { lastUpdated: new Date().toISOString(), version: "1.0.0" },
      })
    },
    [data, setData],
  )

  const addMember = useCallback(
    (name: string, email?: string) => {
      if (!activeGroup) return
      const newMember: Member = { id: `m_${Date.now()}`, name, email }
      
      // Add activity
      const newActivity: Activity = {
        id: `a_${Date.now() + 1}`,
        type: "member_added",
        description: `${name} joined the group`,
        timestamp: new Date().toISOString(),
      }
      const activities = activeGroup.activities || []
      
      // Update both members and activities in one call
      updateGroup(activeGroup.id, { 
        members: [...activeGroup.members, newMember],
        activities: [newActivity, ...activities].slice(0, 50)
      })
    },
    [activeGroup, updateGroup],
  )

  const updateMember = useCallback(
    (memberId: string, updates: Partial<Member>) => {
      if (!activeGroup) return
      updateGroup(activeGroup.id, {
        members: activeGroup.members.map((m) => (m.id === memberId ? { ...m, ...updates } : m)),
      })
    },
    [activeGroup, updateGroup],
  )

  const removeMember = useCallback(
    (memberId: string) => {
      if (!activeGroup) return
      const member = activeGroup.members.find((m) => m.id === memberId)
      
      // Create activity
      const newActivity: Activity = {
        id: `a_${Date.now()}`,
        type: "member_removed",
        description: `${member?.name || 'Member'} left the group`,
        timestamp: new Date().toISOString(),
      }
      const activities = activeGroup.activities || []
      
      // Update members and activities together
      updateGroup(activeGroup.id, {
        members: activeGroup.members.filter((m) => m.id !== memberId),
        activities: member ? [newActivity, ...activities].slice(0, 50) : activities
      })
    },
    [activeGroup, updateGroup],
  )

  const addExpense = useCallback(
    (expense: Omit<Expense, "id">) => {
      if (!activeGroup) return
      const newExpense: Expense = { ...expense, id: `e_${Date.now()}` }
      const payer = activeGroup.members.find((m) => m.id === expense.payerId)
      const currencySymbol = getCurrencySymbol(activeGroup.currency)
      
      // Create activity
      const newActivity: Activity = {
        id: `a_${Date.now() + 1}`,
        type: "expense_added",
        description: `${payer?.name || "Someone"} added "${expense.title}" - ${currencySymbol}${expense.amount.toFixed(2)}`,
        timestamp: new Date().toISOString(),
      }
      const activities = activeGroup.activities || []
      
      // Update expenses and activities together
      updateGroup(activeGroup.id, { 
        expenses: [...activeGroup.expenses, newExpense],
        activities: [newActivity, ...activities].slice(0, 50)
      })
    },
    [activeGroup, updateGroup],
  )

  const updateExpense = useCallback(
    (expenseId: string, updates: Partial<Expense>) => {
      if (!activeGroup) return
      const expense = activeGroup.expenses.find((e) => e.id === expenseId)
      
      // Create activity
      const newActivity: Activity = {
        id: `a_${Date.now()}`,
        type: "expense_updated",
        description: `"${expense?.title || 'Expense'}" was updated`,
        timestamp: new Date().toISOString(),
      }
      const activities = activeGroup.activities || []
      
      // Update expenses and activities together
      updateGroup(activeGroup.id, {
        expenses: activeGroup.expenses.map((e) => (e.id === expenseId ? { ...e, ...updates } : e)),
        activities: expense ? [newActivity, ...activities].slice(0, 50) : activities
      })
    },
    [activeGroup, updateGroup],
  )

  const removeExpense = useCallback(
    (expenseId: string) => {
      if (!activeGroup) return
      const expense = activeGroup.expenses.find((e) => e.id === expenseId)
      
      // Create activity
      const newActivity: Activity = {
        id: `a_${Date.now()}`,
        type: "expense_deleted",
        description: `"${expense?.title || 'Expense'}" was deleted`,
        timestamp: new Date().toISOString(),
      }
      const activities = activeGroup.activities || []
      
      // Update expenses and activities together
      updateGroup(activeGroup.id, {
        expenses: activeGroup.expenses.filter((e) => e.id !== expenseId),
        activities: expense ? [newActivity, ...activities].slice(0, 50) : activities
      })
    },
    [activeGroup, updateGroup],
  )

  const getMemberBalance = useCallback(
    (memberId: string): number => {
      if (!activeGroup) return 0
      const balances = calculateMemberBalances(activeGroup)
      const balance = balances.find((b) => b.memberId === memberId)
      return balance?.netBalance || 0
    },
    [activeGroup],
  )

  const getSettlements = useCallback(() => {
    if (!activeGroup) return []
    const balances = calculateMemberBalances(activeGroup)
    return simplifyDebts(balances)
  }, [activeGroup])

  const totalSpent = activeGroup?.expenses.reduce((sum, e) => sum + e.amount, 0) || 0

  const addActivity = useCallback(
    (type: Activity["type"], description: string) => {
      if (!activeGroup) return
      const newActivity: Activity = {
        id: `a_${Date.now()}`,
        type,
        description,
        timestamp: new Date().toISOString(),
      }
      const activities = activeGroup.activities || []
      updateGroup(activeGroup.id, {
        activities: [newActivity, ...activities].slice(0, 50), // Keep last 50 activities
      })
    },
    [activeGroup, updateGroup],
  )

  const getRecentActivities = useCallback(
    (limit: number = 10): Activity[] => {
      if (!activeGroup) return []
      return (activeGroup.activities || []).slice(0, limit)
    },
    [activeGroup],
  )

  const addCustomCategory = useCallback(
    (category: string) => {
      if (!activeGroup) return
      const customCategories = activeGroup.customCategories || []
      if (!customCategories.includes(category) && !DEFAULT_CATEGORIES.includes(category)) {
        updateGroup(activeGroup.id, {
          customCategories: [...customCategories, category],
        })
      }
    },
    [activeGroup, updateGroup],
  )

  const removeCustomCategory = useCallback(
    (category: string) => {
      if (!activeGroup) return
      const customCategories = activeGroup.customCategories || []
      updateGroup(activeGroup.id, {
        customCategories: customCategories.filter((c) => c !== category),
      })
    },
    [activeGroup, updateGroup],
  )

  const getAvailableCategories = useCallback((): string[] => {
    if (!activeGroup) return DEFAULT_CATEGORIES
    return [...DEFAULT_CATEGORIES, ...(activeGroup.customCategories || [])]
  }, [activeGroup])

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <AppContext.Provider
      value={{
        data,
        activeGroup,
        groups,
        createGroup,
        updateGroup,
        deleteGroup,
        setActiveGroup,
        addMember,
        updateMember,
        removeMember,
        addExpense,
        updateExpense,
        removeExpense,
        getMemberBalance,
        getSettlements,
        totalSpent,
        setData,
        smtpConfig,
        setSMTPConfig,
        addActivity,
        getRecentActivities,
        addCustomCategory,
        removeCustomCategory,
        getAvailableCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
