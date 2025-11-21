"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Users, Edit2, Check, X, Download, Loader2, Phone, Mail } from "lucide-react"
import { downloadPDF } from "@/lib/pdf-generator"
import { getCurrencySymbol } from "@/lib/utils"
import { notifications } from "@/lib/notifications"

interface GroupSidebarProps {
  onAddExpense: () => void
}

export function GroupSidebar({ onAddExpense }: GroupSidebarProps) {
  const { activeGroup, addMember, removeMember, getMemberBalance, totalSpent, updateGroup } = useApp()
  const [newMemberName, setNewMemberName] = useState("")
  const [editingName, setEditingName] = useState(false)
  const [groupName, setGroupName] = useState(activeGroup?.name || "")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  if (!activeGroup) return null

  const currencySymbol = getCurrencySymbol(activeGroup.currency)

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      addMember(newMemberName.trim())
      setNewMemberName("")
    }
  }

  const handleSaveGroupName = () => {
    if (groupName.trim()) {
      updateGroup(activeGroup.id, { name: groupName.trim() })
      setEditingName(false)
    }
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await downloadPDF(activeGroup)
      notifications.showSuccess({
        title: "PDF Generated!",
        description: `${activeGroup.name} report downloaded successfully`,
      })
    } catch (error) {
      notifications.showError({
        title: "PDF Generation Failed",
        description: "Could not generate PDF report. Please try again.",
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <Input value={groupName} onChange={(e) => setGroupName(e.target.value)} className="h-8" autoFocus />
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleSaveGroupName}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditingName(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{activeGroup.name}</CardTitle>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => {
                      setGroupName(activeGroup.name)
                      setEditingName(true)
                    }}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <p className="text-sm text-muted-foreground">{activeGroup.currency}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-3 border-t border-border">
            <span className="text-muted-foreground">Total Spent</span>
            <span className="text-2xl font-bold text-primary">{currencySymbol}{totalSpent.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Members & Balances</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(activeGroup.members || []).map((member) => {
            const balance = getMemberBalance(member.id)
            const isPositive = balance > 0
            const isNegative = balance < 0

            return (
              <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-foreground block truncate">{member.name}</span>
                    {member.phone && (
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground truncate">{member.phone}</p>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 hover:text-primary"
                            onClick={() => window.open(`tel:${member.phone}`)}
                            title="Call"
                          >
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 hover:text-primary"
                            onClick={() => window.open(`sms:${member.phone}`)}
                            title="Send SMS"
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-semibold ${
                      isPositive ? "text-primary" : isNegative ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {isPositive ? "+" : ""}{currencySymbol}{balance.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    onClick={() => removeMember(member.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )
          })}

          <div className="flex gap-2 pt-2">
            <Input
              placeholder="Add member..."
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddMember()}
            />
            <Button size="icon" onClick={handleAddMember}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button className="w-full" onClick={onAddExpense}>
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          Download PDF Report
        </Button>
      </div>
    </div>
  )
}
