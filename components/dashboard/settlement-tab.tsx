"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Copy, CheckCircle, DollarSign, Users, TrendingDown, TrendingUp, Info, Mail, Loader2 } from "lucide-react"
import { useState } from "react"
import { calculateMemberBalances } from "@/lib/calculations"
import { getCurrencySymbol } from "@/lib/utils"
import { notifications } from "@/lib/notifications"

export function SettlementTab() {
  const { activeGroup, getSettlements } = useApp()
  const [copied, setCopied] = useState(false)
  const [sendingEmail, setSendingEmail] = useState<number | null>(null)
  const [sendingAll, setSendingAll] = useState(false)

  if (!activeGroup) return null

  const currencySymbol = getCurrencySymbol(activeGroup.currency)

  const getMemberName = (id: string) => {
    return activeGroup.members.find((m) => m.id === id)?.name || "Unknown"
  }

  const getMemberInitial = (id: string) => {
    return getMemberName(id).charAt(0).toUpperCase()
  }

  const settlements = getSettlements()
  const balances = calculateMemberBalances(activeGroup)
  
  // Calculate summary statistics
  const totalOwed = balances.filter(b => b.netBalance < 0).reduce((sum, b) => sum + Math.abs(b.netBalance), 0)
  const totalOwing = balances.filter(b => b.netBalance > 0).reduce((sum, b) => sum + b.netBalance, 0)
  const settledMembers = balances.filter(b => Math.abs(b.netBalance) < 0.01).length

  const handleCopy = () => {
    const text = settlements
      .map((t) => `${getMemberName(t.from)} → ${getMemberName(t.to)}: ${currencySymbol}${t.amount.toFixed(2)}`)
      .join("\n")
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNotifyMember = async (transferIndex: number, transfer: any) => {
    const fromMember = activeGroup.members.find(m => m.id === transfer.from)
    const toMember = activeGroup.members.find(m => m.id === transfer.to)

    if (!fromMember?.email) {
      notifications.showError({
        title: "No Email Address",
        description: `${fromMember?.name || "Member"} doesn't have an email address. Add it in the Members tab.`,
      })
      return
    }

    setSendingEmail(transferIndex)

    try {
      const response = await fetch("/api/send-settlement-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: fromMember.email,
          fromName: fromMember.name,
          toName: toMember?.name || "Unknown",
          amount: transfer.amount,
          currency: activeGroup.currency,
          groupName: activeGroup.name,
          createdBy: activeGroup.createdBy,
        }),
      })

      if (response.ok) {
        notifications.showSuccess({
          title: "Email Sent!",
          description: `Settlement reminder sent to ${fromMember.name}`,
        })
      } else {
        notifications.showError({
          title: "Failed to Send",
          description: "Could not send email. Please try again.",
        })
      }
    } catch (error) {
      notifications.showError({
        title: "Error",
        description: "Failed to send email notification.",
      })
    } finally {
      setSendingEmail(null)
    }
  }

  const handleNotifyAll = async () => {
    // Filter transfers where the payer has an email
    const transfersWithEmail = settlements.filter(transfer => {
      const fromMember = activeGroup.members.find(m => m.id === transfer.from)
      return fromMember?.email
    })

    if (transfersWithEmail.length === 0) {
      notifications.showError({
        title: "No Email Addresses",
        description: "None of the members who owe money have email addresses. Add them in the Members tab.",
      })
      return
    }

    const membersWithoutEmail = settlements.length - transfersWithEmail.length
    
    if (membersWithoutEmail > 0) {
      const confirmed = confirm(
        `${membersWithoutEmail} member(s) don't have email addresses and will be skipped. Continue sending to ${transfersWithEmail.length} member(s)?`
      )
      if (!confirmed) return
    }

    setSendingAll(true)

    let successCount = 0
    let failCount = 0

    for (const transfer of transfersWithEmail) {
      const fromMember = activeGroup.members.find(m => m.id === transfer.from)
      const toMember = activeGroup.members.find(m => m.id === transfer.to)

      try {
        const response = await fetch("/api/send-settlement-notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: fromMember!.email,
            fromName: fromMember!.name,
            toName: toMember?.name || "Unknown",
            amount: transfer.amount,
            currency: activeGroup.currency,
            groupName: activeGroup.name,
            createdBy: activeGroup.createdBy,
          }),
        })

        if (response.ok) {
          successCount++
        } else {
          failCount++
        }
      } catch (error) {
        failCount++
      }

      // Small delay between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    setSendingAll(false)

    if (successCount > 0 && failCount === 0) {
      notifications.showSuccess({
        title: "All Emails Sent!",
        description: `Successfully sent ${successCount} settlement reminder${successCount !== 1 ? 's' : ''}.`,
      })
    } else if (successCount > 0 && failCount > 0) {
      notifications.showWarning({
        title: "Partially Sent",
        description: `Sent ${successCount} email${successCount !== 1 ? 's' : ''}, but ${failCount} failed.`,
      })
    } else {
      notifications.showError({
        title: "Failed to Send",
        description: "Could not send any emails. Please try again.",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Owed</p>
                <p className="text-2xl font-bold text-destructive">{currencySymbol}{totalOwed.toFixed(2)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-destructive/20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Owed To</p>
                <p className="text-2xl font-bold text-primary">{currencySymbol}{totalOwing.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Settled Members</p>
                <p className="text-2xl font-bold">{settledMembers}/{activeGroup.members.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Balances */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-5 w-5" />
            Individual Balances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {balances.map((balance) => (
              <div key={balance.memberId} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full font-semibold text-lg ${
                    balance.netBalance > 0.01 
                      ? "bg-primary/10 text-primary" 
                      : balance.netBalance < -0.01
                      ? "bg-destructive/10 text-destructive"
                      : "bg-accent text-muted-foreground"
                  }`}>
                    {balance.memberName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{balance.memberName}</p>
                    <p className="text-sm text-muted-foreground">
                      Paid {currencySymbol}{balance.totalPaid.toFixed(2)} • Owes {currencySymbol}{balance.totalOwed.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {Math.abs(balance.netBalance) < 0.01 ? (
                    <Badge variant="outline" className="bg-accent">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Settled
                    </Badge>
                  ) : balance.netBalance > 0 ? (
                    <div>
                      <Badge variant="default" className="mb-1">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Gets Back
                      </Badge>
                      <p className="text-lg font-bold text-primary">{currencySymbol}{balance.netBalance.toFixed(2)}</p>
                    </div>
                  ) : (
                    <div>
                      <Badge variant="destructive" className="mb-1">
                        <TrendingDown className="mr-1 h-3 w-3" />
                        Owes
                      </Badge>
                      <p className="text-lg font-bold text-destructive">{currencySymbol}{Math.abs(balance.netBalance).toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settlement Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Settlement Plan
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Optimized transfers to settle all balances
              </p>
            </div>
            {settlements.length > 0 && (
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleNotifyAll}
                  disabled={sendingAll}
                >
                  {sendingAll ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Notify All
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy All
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {settlements.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-xl font-semibold text-foreground mb-2">All settled up!</p>
              <p className="text-muted-foreground">Everyone's balances are even. No transfers needed.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <Info className="h-4 w-4 text-primary" />
                <p className="text-sm text-foreground">
                  <strong>{settlements.length}</strong> optimized transfer{settlements.length !== 1 ? "s" : ""} will settle all debts
                </p>
              </div>
              {settlements.map((transfer, index) => {
                const fromName = getMemberName(transfer.from)
                const toName = getMemberName(transfer.to)
                const fromMember = activeGroup.members.find(m => m.id === transfer.from)
                const hasEmail = !!fromMember?.email
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between p-5 rounded-lg bg-gradient-to-r from-accent/30 to-accent/50 border">
                      <div className="flex items-center gap-4 flex-1">
                        <Badge variant="secondary" className="font-semibold">
                          #{index + 1}
                        </Badge>
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex flex-col items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20 text-destructive font-bold text-lg border-2 border-destructive/40">
                              {getMemberInitial(transfer.from)}
                            </div>
                            <p className="text-xs font-medium text-muted-foreground mt-1">Payer</p>
                          </div>
                          
                          <div className="flex flex-col items-center gap-1 px-4">
                            <ArrowRight className="h-6 w-6 text-primary" />
                            <p className="text-xs font-medium text-primary">pays</p>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-lg border-2 border-primary/40">
                              {getMemberInitial(transfer.to)}
                            </div>
                            <p className="text-xs font-medium text-muted-foreground mt-1">Receiver</p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator orientation="vertical" className="mx-4 h-16" />
                      
                      <div className="text-right space-y-2">
                        <div>
                          <p className="text-2xl font-bold text-foreground mb-1">{currencySymbol}{transfer.amount.toFixed(2)}</p>
                          <p className="text-sm font-medium text-muted-foreground">
                            {fromName} → {toName}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant={hasEmail ? "default" : "outline"}
                          className="w-full"
                          onClick={() => handleNotifyMember(index, transfer)}
                          disabled={!hasEmail || sendingEmail === index}
                        >
                          {sendingEmail === index ? (
                            <>
                              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Mail className="mr-2 h-3 w-3" />
                              {hasEmail ? "Notify" : "No Email"}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-primary/20">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">How Settlement Works</p>
              <p className="text-sm text-muted-foreground">
                The settlement algorithm uses a greedy approach to minimize the number of transactions needed. 
                It matches the person who owes the most with the person who is owed the most, continuing until 
                all balances reach zero. This ensures at most <strong>n-1 transfers</strong> for n members, 
                making settlements as simple as possible.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
