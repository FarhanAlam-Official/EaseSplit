"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Users, CheckCircle } from "lucide-react"

interface GroupSelectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const currencies = ["USD", "EUR", "GBP", "INR", "NPR", "CAD", "AUD", "JPY"]

export function GroupSelectorModal({ open, onOpenChange }: GroupSelectorModalProps) {
  const { groups, activeGroup, setActiveGroup, createGroup, deleteGroup } = useApp()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupCurrency, setNewGroupCurrency] = useState("USD")

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      createGroup(newGroupName.trim(), newGroupCurrency)
      setNewGroupName("")
      setNewGroupCurrency("USD")
      setShowCreateForm(false)
    }
  }

  const handleSelectGroup = (groupId: string) => {
    setActiveGroup(groupId)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Groups</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {groups.length > 0 ? (
            <div className="space-y-2">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeGroup?.id === group.id ? "border-primary bg-primary/5" : "border-border hover:bg-accent/50"
                  }`}
                  onClick={() => handleSelectGroup(group.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{group.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {group.members.length} members &middot; {group.currency}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeGroup?.id === group.id && <CheckCircle className="h-5 w-5 text-primary" />}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteGroup(group.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No groups yet</p>
            </div>
          )}

          {showCreateForm ? (
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  placeholder="e.g., Trip to Bali"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={newGroupCurrency} onValueChange={setNewGroupCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleCreateGroup}>
                  Create Group
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4" />
              Create New Group
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
