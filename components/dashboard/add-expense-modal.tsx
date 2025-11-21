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
import { calculateShares } from "@/lib/calculations"
import type { ShareMap } from "@/lib/types"
import { getCurrencySymbol } from "@/lib/utils"
import { notifications } from "@/lib/notifications"

interface AddExpenseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddExpenseModal({ open, onOpenChange }: AddExpenseModalProps) {
  const { activeGroup, addExpense, getAvailableCategories } = useApp()

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [payerId, setPayerId] = useState("")
  const [participants, setParticipants] = useState<string[]>([])
  const [category, setCategory] = useState("Other")
  const [notes, setNotes] = useState("")
  const [splitType, setSplitType] = useState<"equal" | "exact" | "percentage" | "shares" | "itemized">("equal")
  const [customShares, setCustomShares] = useState<ShareMap>({})

  useEffect(() => {
    if (open && activeGroup && activeGroup.members.length > 0) {
      setParticipants(activeGroup.members.map((m) => m.id))
      if (!payerId || !activeGroup.members.find(m => m.id === payerId)) {
        setPayerId(activeGroup.members[0].id)
      }
    }
  }, [activeGroup, open, payerId])

  useEffect(() => {
    if (splitType !== "equal") {
      const initialShares: ShareMap = {}
      participants.forEach((id) => {
        if (splitType === "percentage") {
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

  if (!activeGroup) return null

  const currencySymbol = getCurrencySymbol(activeGroup.currency)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !amount || !payerId || participants.length === 0) {
      return
    }

    const shares: ShareMap = splitType === "equal" ? {} : customShares

    addExpense({
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
      title: "Expense Added!",
      description: `${title} - ${currencySymbol}${Number.parseFloat(amount).toFixed(2)} has been added successfully.`,
    })

    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setTitle("")
    setAmount("")
    setDate(new Date().toISOString().split("T")[0])
    setPayerId(activeGroup.members[0]?.id || "")
    setParticipants(activeGroup.members.map((m) => m.id))
    setCategory("Other")
    setNotes("")
    setSplitType("equal")
    setCustomShares({})
  }

  const toggleParticipant = (id: string) => {
    setParticipants((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const updateCustomShare = (memberId: string, value: number) => {
    setCustomShares((prev) => ({ ...prev, [memberId]: value }))
  }

  const previewShares = calculateShares(
    { amount: Number.parseFloat(amount) || 0, splitType, participants, shares: customShares },
    participants,
  )

  const totalPercentage = splitType === "percentage" ? Object.values(customShares).reduce((sum, v) => sum + v, 0) : 100

  const totalExact =
    splitType === "exact" ? Object.values(customShares).reduce((sum, v) => sum + v, 0) : Number.parseFloat(amount) || 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>

        {activeGroup.members.length === 0 ? (
          <div className="py-8 text-center space-y-4">
            <p className="text-muted-foreground">
              You need to add members to your group before creating expenses.
            </p>
            <Button 
              type="button" 
              onClick={() => onOpenChange(false)}
              variant="outline"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Dinner at Restaurant"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ({activeGroup.currency})</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payer">Paid by</Label>
              <Select value={payerId} onValueChange={setPayerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select who paid" />
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
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableCategories().map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Participants</Label>
            <div className="grid grid-cols-2 gap-2">
              {activeGroup.members.map((member) => (
                <label
                  key={member.id}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer"
                >
                  <Checkbox
                    checked={participants.includes(member.id)}
                    onCheckedChange={() => toggleParticipant(member.id)}
                  />
                  <span className="text-sm">{member.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Split Type</Label>
            <Tabs value={splitType} onValueChange={(v) => setSplitType(v as typeof splitType)}>
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="equal" className="text-xs">
                  Equal
                </TabsTrigger>
                <TabsTrigger value="exact" className="text-xs">
                  Exact
                </TabsTrigger>
                <TabsTrigger value="percentage" className="text-xs">
                  %
                </TabsTrigger>
                <TabsTrigger value="shares" className="text-xs">
                  Shares
                </TabsTrigger>
                <TabsTrigger value="itemized" className="text-xs">
                  Items
                </TabsTrigger>
              </TabsList>

              {splitType !== "equal" && (
                <div className="mt-4 space-y-2">
                  {participants.map((memberId) => {
                    const member = activeGroup.members.find((m) => m.id === memberId)
                    return (
                      <div key={memberId} className="flex items-center gap-3 p-2 rounded-lg bg-accent/30">
                        <span className="w-24 text-sm font-medium truncate">{member?.name}</span>
                        <Input
                          type="number"
                          step={splitType === "exact" ? "0.01" : "1"}
                          min="0"
                          value={customShares[memberId] || 0}
                          onChange={(e) => updateCustomShare(memberId, Number.parseFloat(e.target.value) || 0)}
                          className="w-24"
                        />
                        <span className="text-sm text-muted-foreground">
                          {splitType === "percentage" && "%"}
                          {splitType === "exact" && activeGroup.currency}
                          {splitType === "shares" && "shares"}
                          {splitType === "itemized" && activeGroup.currency}
                        </span>
                        <span className="ml-auto text-sm font-medium text-primary">
                          = {currencySymbol}{(previewShares[memberId] || 0).toFixed(2)}
                        </span>
                      </div>
                    )
                  })}

                  {splitType === "percentage" && totalPercentage !== 100 && (
                    <p className="text-sm text-destructive">Total: {totalPercentage}% (should be 100%)</p>
                  )}
                  {splitType === "exact" && Math.abs(totalExact - (Number.parseFloat(amount) || 0)) > 0.01 && (
                    <p className="text-sm text-destructive">
                      Total: {currencySymbol}{totalExact.toFixed(2)} (should be {currencySymbol}{(Number.parseFloat(amount) || 0).toFixed(2)})
                    </p>
                  )}
                </div>
              )}
            </Tabs>
          </div>

          {splitType === "equal" && participants.length > 0 && amount && (
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-sm text-muted-foreground">
                Each person pays:{" "}
                <span className="font-semibold text-primary">
                  {currencySymbol}{(Number.parseFloat(amount) / participants.length).toFixed(2)}
                </span>
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <Button type="submit" className="w-full">
            Save Expense
          </Button>
        </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
