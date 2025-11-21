"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { calculateMemberBalances, getExpenseBreakdowns } from "@/lib/calculations"
import { FileText, Calculator, TrendingUp, TrendingDown, User, DollarSign, Calendar, Tag, Users, ArrowRightLeft, CheckCircle, Mail } from "lucide-react"
import { getCurrencySymbol } from "@/lib/utils"
import { notifications } from "@/lib/notifications"
import { useState } from "react"

export function BreakdownTab() {
  const { activeGroup } = useApp()
  const [sendingBreakdown, setSendingBreakdown] = useState(false)

  if (!activeGroup) return null

  const currencySymbol = getCurrencySymbol(activeGroup.currency)
  const balances = calculateMemberBalances(activeGroup)
  const breakdowns = getExpenseBreakdowns(activeGroup)

  const handleSendBreakdownToAll = async () => {
    if (!activeGroup) return

    // Filter members with email
    const membersWithEmail = activeGroup.members.filter(m => m.email)

    if (membersWithEmail.length === 0) {
      notifications.showError({
        title: "No Email Addresses",
        description: "None of the members have email addresses. Please add emails first.",
      })
      return
    }

    const membersWithoutEmail = activeGroup.members.length - membersWithEmail.length

    // Confirm if some members don't have emails
    if (membersWithoutEmail > 0) {
      const proceed = confirm(
        `${membersWithoutEmail} member${membersWithoutEmail > 1 ? 's' : ''} don't have email addresses and will be skipped. Continue?`
      )
      if (!proceed) return
    }

    setSendingBreakdown(true)

    let successCount = 0
    let failCount = 0

    // Calculate totals
    const totalExpenses = activeGroup.expenses.reduce((sum, exp) => sum + exp.amount, 0)
    const averageExpense = totalExpenses / activeGroup.expenses.length

    for (const member of membersWithEmail) {
      try {
        await fetch("/api/send-breakdown", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            memberEmail: member.email,
            memberName: member.name,
            groupName: activeGroup.name,
            currency: currencySymbol,
            balances: balances,
            expenses: breakdowns,
            totalExpenses: totalExpenses,
            averageExpense: averageExpense,
            createdBy: activeGroup.createdBy,
            createdByEmail: activeGroup.createdByEmail,
          }),
        })
        successCount++
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.error(`Failed to send to ${member.name}:`, error)
        failCount++
      }
    }

    setSendingBreakdown(false)

    if (failCount === 0) {
      notifications.showSuccess({
        title: "All Breakdowns Sent! 📧",
        description: `Successfully sent breakdown to ${successCount} member${successCount > 1 ? 's' : ''}.`,
      })
    } else if (successCount > 0) {
      notifications.showWarning({
        title: "Partially Sent",
        description: `Sent to ${successCount} member${successCount > 1 ? 's' : ''}, failed for ${failCount}.`,
      })
    } else {
      notifications.showError({
        title: "Failed to Send",
        description: "Could not send breakdown emails. Please check your email settings.",
      })
    }
  }

  if (activeGroup.expenses.length === 0) {
    return (
      <Card className="p-12">
        <CardContent className="flex flex-col items-center justify-center text-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-lg font-semibold text-foreground mb-2">No Expenses Yet</p>
          <p className="text-muted-foreground">Add some expenses to see detailed breakdowns and analysis</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate statistics
  const totalExpenses = activeGroup.expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const averageExpense = totalExpenses / activeGroup.expenses.length

  return (
    <div className="space-y-6">
      {/* Header with Send Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Expense Breakdown</h2>
          <p className="text-sm text-muted-foreground">Detailed analysis of all expenses and member balances</p>
        </div>
        <Button 
          onClick={handleSendBreakdownToAll}
          disabled={sendingBreakdown || activeGroup.members.filter(m => m.email).length === 0}
          className="gap-2"
        >
          <Mail className="h-4 w-4" />
          {sendingBreakdown ? "Sending..." : "Send Breakdown to All"}
        </Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold">{activeGroup.expenses.length}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground/20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">{currencySymbol}{totalExpenses.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground/20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Expense</p>
                <p className="text-2xl font-bold">{currencySymbol}{averageExpense.toFixed(2)}</p>
              </div>
              <Calculator className="h-8 w-8 text-muted-foreground/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Balance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Member Balance Summary
          </CardTitle>
          <CardDescription>
            Overview of how much each member has paid and owes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {balances.map((balance) => (
              <div key={balance.memberId} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                      balance.netBalance > 0.01 
                        ? "bg-primary/10 text-primary" 
                        : balance.netBalance < -0.01
                        ? "bg-destructive/10 text-destructive"
                        : "bg-accent text-muted-foreground"
                    }`}>
                      {balance.memberName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">{balance.memberName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {Math.abs(balance.netBalance) < 0.01 ? (
                          <Badge variant="outline" className="bg-accent">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Settled Up
                          </Badge>
                        ) : balance.netBalance > 0 ? (
                          <Badge variant="default">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            Gets back {currencySymbol}{balance.netBalance.toFixed(2)}
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <TrendingDown className="mr-1 h-3 w-3" />
                            Owes {currencySymbol}{Math.abs(balance.netBalance).toFixed(2)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-3" />
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Total Paid</p>
                    <p className="text-lg font-semibold text-primary">{currencySymbol}{balance.totalPaid.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Total Owes</p>
                    <p className="text-lg font-semibold text-muted-foreground">{currencySymbol}{balance.totalOwed.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Net Balance</p>
                    <p className={`text-lg font-semibold ${
                      balance.netBalance > 0.01 
                        ? "text-primary" 
                        : balance.netBalance < -0.01
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}>
                      {balance.netBalance > 0 ? "+" : ""}{currencySymbol}{balance.netBalance.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expense Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detailed Expense Breakdown
          </CardTitle>
          <CardDescription>
            Click on any expense to see how it was split among members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {breakdowns.map((expense, index) => {
              const expenseDetails = activeGroup.expenses.find(e => e.id === expense.expenseId)
              return (
                <AccordionItem key={expense.expenseId} value={expense.expenseId} className="border rounded-lg mb-3 px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="font-semibold">
                          #{index + 1}
                        </Badge>
                        <div className="text-left">
                          <p className="font-semibold text-foreground">{expense.title}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {expense.payerName}
                            </span>
                            {expenseDetails?.category && (
                              <span className="flex items-center gap-1">
                                <Tag className="h-3 w-3" />
                                {expenseDetails.category}
                              </span>
                            )}
                            {expenseDetails?.date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(expenseDetails.date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{currencySymbol}{expense.amount.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground mt-1">{expense.shares.length} members</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {/* Expense Info */}
                      <div className="grid grid-cols-2 gap-4 p-4 bg-accent/30 rounded-lg">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Paid By</p>
                          <p className="font-semibold text-foreground flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {expense.payerName}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Split Method</p>
                          <Badge variant="outline" className="capitalize">
                            <ArrowRightLeft className="mr-1 h-3 w-3" />
                            {expense.splitType}
                          </Badge>
                        </div>
                        {expenseDetails?.notes && (
                          <div className="col-span-2">
                            <p className="text-xs text-muted-foreground mb-1">Notes</p>
                            <p className="text-sm text-foreground italic">"{expenseDetails.notes}"</p>
                          </div>
                        )}
                      </div>

                      {/* Member Shares */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <p className="font-semibold text-foreground">Member Breakdown</p>
                        </div>
                        <div className="space-y-2">
                          {expense.shares.map((share) => {
                            const isPayer = share.memberId === expense.payerId
                            const percentage = ((share.amount / expense.amount) * 100).toFixed(1)
                            return (
                              <div key={share.memberId} className={`flex items-center justify-between p-3 rounded-lg border ${
                                isPayer ? "bg-primary/5 border-primary/20" : "bg-background"
                              }`}>
                                <div className="flex items-center gap-3">
                                  <div className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold text-sm ${
                                    isPayer ? "bg-primary/10 text-primary" : "bg-accent text-foreground"
                                  }`}>
                                    {share.memberName.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="font-medium text-foreground">{share.memberName}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {percentage}% of total expense
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-foreground">{currencySymbol}{share.amount.toFixed(2)}</p>
                                  {isPayer ? (
                                    <Badge variant="default" className="text-xs mt-1">
                                      <DollarSign className="mr-1 h-3 w-3" />
                                      Paid Full Amount
                                    </Badge>
                                  ) : (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Owes {expense.payerName}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Calculation Explanation */}
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-sm font-semibold text-foreground mb-1">💡 How was this calculated?</p>
                        <p className="text-sm text-muted-foreground">
                          {expense.splitType === "equal" && (
                            `Total amount of ${currencySymbol}${expense.amount.toFixed(2)} was split equally among ${expense.shares.length} members, resulting in ${currencySymbol}${(expense.amount / expense.shares.length).toFixed(2)} per person.`
                          )}
                          {expense.splitType === "exact" && (
                            `Each member's share was specified exactly. The total of all shares equals ${currencySymbol}${expense.amount.toFixed(2)}.`
                          )}
                          {expense.splitType === "percentage" && (
                            `Each member was assigned a percentage of the total ${currencySymbol}${expense.amount.toFixed(2)} expense.`
                          )}
                          {expense.splitType === "shares" && (
                            `The expense was divided based on share units assigned to each member, proportional to the total amount.`
                          )}
                          {expense.splitType === "itemized" && (
                            `Each member was assigned specific items or amounts from the total expense.`
                          )}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
