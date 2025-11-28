"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, Tag, Trash2, Settings, Globe, Bell, Shield, Palette, Moon, Sun, Database, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { notifications } from "@/lib/notifications"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export function SettingsTab() {
  const { 
    activeGroup, 
    getAvailableCategories, 
    addCustomCategory, 
    removeCustomCategory,
    updateGroup,
    deleteGroup
  } = useApp()
  const [newCategory, setNewCategory] = useState("")
  const [groupName, setGroupName] = useState(activeGroup?.name || "")
  const [createdBy, setCreatedBy] = useState(activeGroup?.createdBy || "")
  const { theme, setTheme } = useTheme()
  
  if (!activeGroup) return null

  const allCategories = getAvailableCategories()
  const defaultCategories = ["Food", "Travel", "Accommodation", "Stay", "Shopping", "Entertainment", "Utilities", "Other", "Misc"]
  const customCategories = activeGroup.customCategories || []

  const handleAddCategory = () => {
    if (newCategory.trim() && !allCategories.includes(newCategory.trim())) {
      addCustomCategory(newCategory.trim())
      notifications.showSuccess({
        title: "Category Added!",
        description: `"${newCategory}" has been added to your categories.`,
      })
      setNewCategory("")
    } else if (allCategories.includes(newCategory.trim())) {
      notifications.showWarning({
        title: "Category Exists",
        description: "This category already exists.",
      })
    }
  }

  const handleRemoveCategory = (category: string) => {
    const inUse = activeGroup.expenses.some((e) => e.category === category)
    if (inUse) {
      notifications.showWarning({
        title: "Cannot Delete",
        description: `"${category}" is being used by existing expenses.`,
      })
      return
    }
    removeCustomCategory(category)
    notifications.showSuccess({
      title: "Category Removed",
      description: `"${category}" has been removed.`,
    })
  }

  const handleUpdateGroupInfo = () => {
    if (!groupName.trim()) {
      notifications.showError({
        title: "Invalid Name",
        description: "Group name cannot be empty.",
      })
      return
    }

    updateGroup(activeGroup.id, {
      ...activeGroup,
      name: groupName,
      createdBy: createdBy || undefined,
    })

    notifications.showSuccess({
      title: "Group Updated!",
      description: "Group information has been saved successfully.",
    })
  }

  const handleDeleteGroup = () => {
    deleteGroup(activeGroup.id)
    notifications.showSuccess({
      title: "Group Deleted",
      description: "The group has been permanently deleted.",
    })
  }

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "NPR", symbol: "Rs.", name: "Nepalese Rupee" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  ]

  // Get the most recent activity date
  const getLastUpdatedDate = () => {
    if (activeGroup.activities && activeGroup.activities.length > 0) {
      const sortedActivities = [...activeGroup.activities].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      return new Date(sortedActivities[0].timestamp).toLocaleDateString()
    }
    
    // Fallback to most recent expense date
    if (activeGroup.expenses.length > 0) {
      const sortedExpenses = [...activeGroup.expenses].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      return new Date(sortedExpenses[0].date).toLocaleDateString()
    }
    
    // Ultimate fallback to creation date
    return new Date(activeGroup.createdAt).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 p-1 bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm">
            <TabsTrigger 
              value="general" 
              className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300 hover:bg-primary/10 hover:scale-105"
            >
              <Settings className="h-4 w-4 mr-2 hidden sm:inline" />
              General
            </TabsTrigger>
            <TabsTrigger 
              value="categories" 
              className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300 hover:bg-primary/10 hover:scale-105"
            >
              <Tag className="h-4 w-4 mr-2 hidden sm:inline" />
              Categories
            </TabsTrigger>
            <TabsTrigger 
              value="preferences" 
              className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300 hover:bg-primary/10 hover:scale-105"
            >
              <Palette className="h-4 w-4 mr-2 hidden sm:inline" />
              Preferences
            </TabsTrigger>
            <TabsTrigger 
              value="danger" 
              className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-300 hover:bg-primary/10 hover:scale-105"
            >
              <Shield className="h-4 w-4 mr-2 hidden sm:inline" />
              Danger Zone
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Group Information
                </CardTitle>
                <CardDescription>
                  Update your group's basic information and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="group-name">Group Name</Label>
                  <Input
                    id="group-name"
                    placeholder="e.g., Europe Trip 2024"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="created-by">Created By (Optional)</Label>
                  <Input
                    id="created-by"
                    placeholder="Your name"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={activeGroup.currency}
                    onValueChange={(value) => {
                      updateGroup(activeGroup.id, {
                        ...activeGroup,
                        currency: value,
                      })
                      notifications.showSuccess({
                        title: "Currency Updated",
                        description: `Currency changed to ${value}`,
                      })
                    }}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          {curr.symbol} {curr.code} - {curr.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleUpdateGroupInfo} className="w-full">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Group Statistics
                </CardTitle>
                <CardDescription>
                  Overview of your group's activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Members</p>
                    <p className="text-2xl font-bold text-foreground">{activeGroup.members.length}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                    <p className="text-2xl font-bold text-foreground">{activeGroup.expenses.length}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Created On</p>
                    <p className="text-sm font-semibold text-foreground">
                      {new Date(activeGroup.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
                    <p className="text-sm font-semibold text-foreground">
                      {getLastUpdatedDate()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Settings */}
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Expense Categories
                </CardTitle>
                <CardDescription>
                  Manage your expense categories for better organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Default Categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {defaultCategories.map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-semibold mb-3 block">Custom Categories</Label>
                  {customCategories.length === 0 ? (
                    <div className="text-center py-8 bg-muted rounded-lg">
                      <Tag className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                      <p className="text-sm text-muted-foreground">No custom categories yet</p>
                      <p className="text-xs text-muted-foreground mt-1">Add your first category below</p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {customCategories.map((cat) => (
                        <Badge key={cat} variant="outline" className="gap-1 pr-1 text-xs">
                          {cat}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleRemoveCategory(cat)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="new-category">Add New Category</Label>
                  <div className="flex gap-2">
                    <Input
                      id="new-category"
                      placeholder="e.g., Healthcare, Education, Gifts"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                    />
                    <Button onClick={handleAddCategory} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Custom categories will be available when adding expenses
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Settings */}
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="theme-toggle">Theme</Label>
                    <p className="text-xs text-muted-foreground">
                      Choose between light, dark, or system theme
                    </p>
                  </div>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme-toggle" className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notification-sound">Sound Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Play a sound when actions are completed
                    </p>
                  </div>
                  <Switch id="notification-sound" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notification-toast">Toast Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Show toast messages for important updates
                    </p>
                  </div>
                  <Switch id="notification-toast" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Danger Zone */}
          <TabsContent value="danger" className="space-y-4">
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                  <Shield className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm">Delete This Group</h4>
                      <p className="text-xs text-muted-foreground">
                        Once you delete a group, there is no going back. All expenses, members, and settlements will be permanently removed.
                      </p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="flex-shrink-0">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Group
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the group
                            <strong> "{activeGroup.name}"</strong> and remove all associated data including:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>{activeGroup.expenses.length} expenses</li>
                              <li>{activeGroup.members.length} members</li>
                              <li>All settlement history</li>
                            </ul>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteGroup}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Yes, Delete Group
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
