"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent } from "@/components/ui/card"
import { Receipt, Users, TrendingUp, DollarSign } from "lucide-react"
import { getCurrencySymbol } from "@/lib/utils"

export function QuickStats() {
  const { activeGroup, getMemberBalance, totalSpent } = useApp()

  if (!activeGroup) return null

  const currencySymbol = getCurrencySymbol(activeGroup.currency)
  const totalMembers = activeGroup.members.length
  const totalExpenses = activeGroup.expenses.length
  
  // Calculate average expense
  const averageExpense = totalExpenses > 0 ? totalSpent / totalExpenses : 0
  
  // Find highest spender
  const memberBalances = activeGroup.members.map((member) => ({
    name: member.name,
    paid: activeGroup.expenses
      .filter((e) => e.payerId === member.id)
      .reduce((sum, e) => sum + e.amount, 0),
  }))
  const highestSpender = memberBalances.reduce(
    (max, m) => (m.paid > max.paid ? m : max),
    { name: "None", paid: 0 }
  )

  // Calculate unsettled amount
  const unsettledAmount = activeGroup.members.reduce((sum, member) => {
    const balance = getMemberBalance(member.id)
    return sum + Math.abs(balance)
  }, 0) / 2 // Divide by 2 because each debt is counted twice

  const stats = [
    {
      icon: Receipt,
      label: "Total Expenses",
      value: totalExpenses.toString(),
      subValue: `${currencySymbol}${totalSpent.toFixed(2)} spent`,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Users,
      label: "Group Members",
      value: totalMembers.toString(),
      subValue: totalMembers > 0 ? `${highestSpender.name} paid most` : "Add members",
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
    },
    {
      icon: TrendingUp,
      label: "Avg. Expense",
      value: `${currencySymbol}${averageExpense.toFixed(2)}`,
      subValue: totalExpenses > 0 ? "per transaction" : "No expenses yet",
      color: "text-orange-600",
      bgColor: "bg-orange-600/10",
    },
    {
      icon: DollarSign,
      label: "Unsettled",
      value: `${currencySymbol}${unsettledAmount.toFixed(2)}`,
      subValue: unsettledAmount > 0 ? "needs settlement" : "All settled!",
      color: "text-purple-600",
      bgColor: "bg-purple-600/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.subValue}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
