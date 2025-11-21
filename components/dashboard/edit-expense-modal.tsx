"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ShareMap } from "@/lib/types"
import { getCurrencySymbol } from "@/lib/utils"
import { notifications } from "@/lib/notifications"

interface EditExpenseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expenseId: string | null
}

export function EditExpenseModal({ open, onOpenChange, expenseId }: EditExpenseModalProps) {
  const { activeGroup, updateExpense, getAvailableCategories } = useApp()

  if (!activeGroup) return null

  const currencySymbol = getCurrencySymbol(activeGroup.currency)

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [payerId, setPayerId] = useState("")
  const [participants, setParticipants] = useState<string[]>([])
  const [category, setCategory] = useState("Other")
  const [notes, setNotes] = useState("")
  const [splitType, setSplitType] = useState<"equal" | "exact" | "percentage" | "shares" | "itemized">("equal")
  const [customShares, setCustomShares] = useState<ShareMap>({})

  // Load expense data when modal opens
  useEffect(() => {
    if (open && expenseId && activeGroup) {
      const expense = activeGroup.expenses.find((e) => e.id === expenseId)
      if (expense) {
        setTitle(expense.title)
        setAmount(expense.amount.toString())
        setDate(expense.date)
        setPayerId(expense.payerId)
        setParticipants(expense.participants)
        setCategory(expense.category)
        setNotes(expense.notes || "")
        setSplitType(expense.splitType)
        setCustomShares(expense.shares || {})
      }
    }
  }, [open, expenseId, activeGroup])

  // Initialize custom shares when split type changes
  useEffect(() => {
    if (splitType !== "equal" && participants.length > 0) {
      const initialShares: ShareMap = {}
      participants.forEach((id) => {
        if (customShares[id] !== undefined) {
          initialShares[id] = customShares[id]
        } else if (splitType === "percentage") {
          initialShares[id] = Math.floor(100 / participants.length)
        } else if (splitType === "shares") {
          initialShares[id] = 1
        } else {
          initialShares[id] = 0
        }
      })
      setCustomShares(initialShares)
    }
  }, [splitType, participants])

  if (!activeGroup || !expenseId) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !amount || !payerId || participants.length === 0) {
      return
    }

    const shares: ShareMap = splitType === "equal" ? {} : customShares

    updateExpense(expenseId, {
      title,
      amount: Number.parseFloat(amount),
      date,
      payerId,
      participants,
      splitType,
      shares,
      category,
      notes: notes || undefined,
    })

    notifications.showSuccess({
      title: "Expense Updated!",
      description: `${title} has been updated successfully.`,
    })

    onOpenChange(false)
  }

  const toggleParticipant = (id: string) => {
    if (participants.includes(id)) {
      setParticipants(participants.filter((p) => p !== id))
    } else {
      setParticipants([...participants, id])
    }
  }

  const updateShare = (memberId: string, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setCustomShares({ ...customShares, [memberId]: numValue })
  }

  const getTotalShares = () => {
    return Object.values(customShares).reduce((sum, val) => sum + val, 0)
  }

  const isValidSplit = () => {
    if (splitType === "equal") return true
    if (splitType === "percentage") {
      const total = getTotalShares()
      return Math.abs(total - 100) < 0.01
    }
    if (splitType === "exact") {
      const total = getTotalShares()
      const expenseAmount = Number.parseFloat(amount)
      return Math.abs(total - expenseAmount) < 0.01
    }
    return true
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                placeholder="Lunch at restaurant"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-amount">Amount ({activeGroup.currency})</Label>
              <Input
                id="edit-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-date">Date</Label>
              <Input
                id="edit-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="edit-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableCategories().map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-payer">Paid by</Label>
            <Select value={payerId} onValueChange={setPayerId}>
              <SelectTrigger id="edit-payer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {activeGroup.members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Split between</Label>
            <div className="grid grid-cols-2 gap-2">
              {activeGroup.members.map((member) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-participant-${member.id}`}
                    checked={participants.includes(member.id)}
                    onCheckedChange={() => toggleParticipant(member.id)}
                  />
                  <label htmlFor={`edit-participant-${member.id}`} className="text-sm font-medium cursor-pointer">
                    {member.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Split type</Label>
            <Tabs value={splitType} onValueChange={(v) => setSplitType(v as typeof splitType)}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="equal">Equal</TabsTrigger>
                <TabsTrigger value="exact">Exact</TabsTrigger>
                <TabsTrigger value="percentage">%</TabsTrigger>
                <TabsTrigger value="shares">Shares</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {splitType !== "equal" && (
            <div className="space-y-2">
              <Label>Custom split</Label>
              <div className="space-y-2 p-3 bg-accent/50 rounded-lg">
                {participants.map((participantId) => {
                  const member = activeGroup.members.find((m) => m.id === participantId)
                  if (!member) return null
                  return (
                    <div key={participantId} className="flex items-center justify-between">
                      <span className="text-sm">{member.name}</span>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step={splitType === "percentage" ? "1" : "0.01"}
                          min="0"
                          value={customShares[participantId] || 0}
                          onChange={(e) => updateShare(participantId, e.target.value)}
                          className="w-24"
                        />
                        <span className="text-sm text-muted-foreground w-12">
                          {splitType === "percentage" ? "%" : splitType === "exact" ? activeGroup.currency : "shares"}
                        </span>
                      </div>
                    </div>
                  )
                })}
                <div className="pt-2 border-t flex items-center justify-between text-sm font-medium">
                  <span>Total:</span>
                  <span className={isValidSplit() ? "text-primary" : "text-destructive"}>
                    {getTotalShares().toFixed(splitType === "percentage" ? 0 : 2)}
                    {splitType === "percentage" ? "%" : splitType === "exact" ? ` ${activeGroup.currency}` : " shares"}
                  </span>
                </div>
                {!isValidSplit() && (
                  <p className="text-xs text-destructive">
                    {splitType === "percentage" && "Total must equal 100%"}
                    {splitType === "exact" && `Total must equal ${amount}`}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="edit-notes">Notes (optional)</Label>
            <Textarea
              id="edit-notes"
              placeholder="Add any additional details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValidSplit()}>
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
