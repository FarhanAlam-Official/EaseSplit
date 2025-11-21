"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Users, Search, Phone, Mail, Edit2, Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { getCurrencySymbol } from "@/lib/utils"

export function MembersTab() {
  const { activeGroup, addMember, removeMember, updateMember, getMemberBalance } = useApp()
  const [newMemberName, setNewMemberName] = useState("")
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")

  // Debug logging
  useEffect(() => {
    console.log("MembersTab - activeGroup:", activeGroup)
    console.log("MembersTab - members:", activeGroup?.members)
  }, [activeGroup])

  if (!activeGroup) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No active group selected</p>
        </CardContent>
      </Card>
    )
  }

  const members = activeGroup.members || []
  const currencySymbol = getCurrencySymbol(activeGroup.currency)

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      addMember(newMemberName.trim(), newMemberEmail.trim() || undefined)
      setNewMemberName("")
      setNewMemberEmail("")
    }
  }

  const handleEditMember = (member: any) => {
    setEditingMemberId(member.id)
    setEditName(member.name)
    setEditEmail(member.email || "")
  }

  const handleSaveEdit = () => {
    if (editingMemberId && editName.trim()) {
      updateMember(editingMemberId, {
        name: editName.trim(),
        email: editEmail.trim() || undefined,
      })
      setEditingMemberId(null)
      setEditName("")
      setEditEmail("")
    }
  }

  const handleCancelEdit = () => {
    setEditingMemberId(null)
    setEditName("")
    setEditEmail("")
  }

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (member.email && member.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const totalMembers = members.length
  const membersWithEmail = members.filter(m => m.email).length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">{totalMembers}</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Mail className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-foreground">{membersWithEmail}</p>
              <p className="text-sm text-muted-foreground">With Email</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 sm:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <Badge variant="outline" className="h-8 px-4 text-base">
                {activeGroup.currency}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">Currency</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Member Form */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" />
              Add New Member
            </h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Member name *"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddMember()}
                className="flex-1"
              />
              <Input
                placeholder="Email (optional)"
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddMember()}
                className="flex-1"
              />
              <Button onClick={handleAddMember} className="sm:w-auto w-full">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="sm:inline">Add Member</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search members by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Members List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">
          Members ({filteredMembers.length})
        </h3>

        <AnimatePresence mode="popLayout">
          {filteredMembers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center space-y-4">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <div>
                  <p className="text-muted-foreground mb-2">
                    {searchQuery ? "No members found matching your search" : "No members in this group yet"}
                  </p>
                  {!searchQuery && members.length === 0 && (
                    <p className="text-sm text-muted-foreground/70">
                      Use the form above to add your first member
                    </p>
                  )}
                </div>
                {/* Debug info */}
                <details className="text-xs text-left mx-auto max-w-md">
                  <summary className="cursor-pointer text-muted-foreground/50 hover:text-muted-foreground">
                    Debug Info
                  </summary>
                  <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                    {JSON.stringify({ 
                      totalMembers: members.length,
                      filteredMembers: filteredMembers.length,
                      searchQuery,
                      groupId: activeGroup.id,
                      groupName: activeGroup.name
                    }, null, 2)}
                  </pre>
                </details>
              </CardContent>
            </Card>
          ) : (
            filteredMembers.map((member, index) => {
              const balance = getMemberBalance(member.id)
              const isPositive = balance > 0
              const isNegative = balance < 0
              const isEditing = editingMemberId === member.id

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              placeholder="Member name"
                              autoFocus
                            />
                            <Input
                              value={editEmail}
                              type="email"
                              onChange={(e) => setEditEmail(e.target.value)}
                              placeholder="Email (optional)"
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                            <Button size="sm" onClick={handleSaveEdit}>
                              <Check className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-lg font-semibold text-primary flex-shrink-0">
                            {member.name.charAt(0).toUpperCase()}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-lg">
                              {member.name}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              {member.email ? (
                                <div className="flex items-center gap-2">
                                  <p className="text-sm text-muted-foreground">{member.email}</p>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:text-primary"
                                    onClick={() => window.open(`mailto:${member.email}`)}
                                    title="Send Email"
                                  >
                                    <Mail className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground">No email</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground mb-1">Balance</p>
                              <p
                                className={`text-lg font-bold ${
                                  isPositive
                                    ? "text-primary"
                                    : isNegative
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {isPositive ? "+" : ""}{currencySymbol}{balance.toFixed(2)}
                              </p>
                            </div>

                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-primary"
                                onClick={() => handleEditMember(member)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => {
                                  if (confirm(`Remove ${member.name} from the group?`)) {
                                    removeMember(member.id)
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
