"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Member {
  id: string
  name: string
  avatar?: string
}

export interface Expense {
  id: string
  title: string
  amount: number
  date: string
  payer: string
  participants: string[]
  splitType: "equal" | "shares" | "percentage" | "custom"
  category: string
  note?: string
}

export interface Group {
  id: string
  name: string
  currency: string
  members: Member[]
  expenses: Expense[]
}

interface GroupContextType {
  group: Group
  setGroup: (group: Group) => void
  addMember: (name: string) => void
  removeMember: (id: string) => void
  addExpense: (expense: Omit<Expense, "id">) => void
  removeExpense: (id: string) => void
  getBalance: (memberId: string) => number
  totalSpent: number
}

const defaultGroup: Group = {
  id: "1",
  name: "Trip to Bali",
  currency: "USD",
  members: [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
    { id: "4", name: "Diana" },
  ],
  expenses: [
    {
      id: "1",
      title: "Hotel Booking",
      amount: 400,
      date: "2024-01-15",
      payer: "1",
      participants: ["1", "2", "3", "4"],
      splitType: "equal",
      category: "Accommodation",
    },
    {
      id: "2",
      title: "Dinner at Restaurant",
      amount: 120,
      date: "2024-01-16",
      payer: "2",
      participants: ["1", "2", "3", "4"],
      splitType: "equal",
      category: "Food",
    },
    {
      id: "3",
      title: "Taxi to Airport",
      amount: 60,
      date: "2024-01-17",
      payer: "3",
      participants: ["1", "2", "3"],
      splitType: "equal",
      category: "Travel",
    },
    {
      id: "4",
      title: "Souvenir Shopping",
      amount: 80,
      date: "2024-01-17",
      payer: "1",
      participants: ["1", "4"],
      splitType: "equal",
      category: "Shopping",
    },
  ],
}

const GroupContext = createContext<GroupContextType | undefined>(undefined)

export function GroupProvider({ children }: { children: ReactNode }) {
  const [group, setGroup] = useState<Group>(defaultGroup)

  useEffect(() => {
    const stored = localStorage.getItem("easesplit_v1")
    if (stored) {
      try {
        setGroup(JSON.parse(stored))
      } catch {
        // Use default
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("easesplit_v1", JSON.stringify(group))
  }, [group])

  const addMember = (name: string) => {
    const newMember: Member = {
      id: Date.now().toString(),
      name,
    }
    setGroup((prev) => ({
      ...prev,
      members: [...prev.members, newMember],
    }))
  }

  const removeMember = (id: string) => {
    setGroup((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== id),
    }))
  }

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    }
    setGroup((prev) => ({
      ...prev,
      expenses: [...prev.expenses, newExpense],
    }))
  }

  const removeExpense = (id: string) => {
    setGroup((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((e) => e.id !== id),
    }))
  }

  const getBalance = (memberId: string): number => {
    let balance = 0

    group.expenses.forEach((expense) => {
      const share = expense.amount / expense.participants.length

      if (expense.payer === memberId) {
        balance += expense.amount
      }

      if (expense.participants.includes(memberId)) {
        balance -= share
      }
    })

    return Math.round(balance * 100) / 100
  }

  const totalSpent = group.expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <GroupContext.Provider
      value={{
        group,
        setGroup,
        addMember,
        removeMember,
        addExpense,
        removeExpense,
        getBalance,
        totalSpent,
      }}
    >
      {children}
    </GroupContext.Provider>
  )
}

export function useGroup() {
  const context = useContext(GroupContext)
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider")
  }
  return context
}
