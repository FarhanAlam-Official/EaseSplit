"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function CategoryManager() {
  const { getAvailableCategories, addCustomCategory, removeCustomCategory, activeGroup } = useApp()
  const [newCategory, setNewCategory] = useState("")
  
  if (!activeGroup) return null

  const allCategories = getAvailableCategories()
  const defaultCategories = ["Food", "Travel", "Accommodation", "Stay", "Shopping", "Entertainment", "Utilities", "Other", "Misc"]
  const customCategories = activeGroup.customCategories || []

  const handleAddCategory = () => {
    if (newCategory.trim() && !allCategories.includes(newCategory.trim())) {
      addCustomCategory(newCategory.trim())
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    // Check if category is in use
    const inUse = activeGroup.expenses.some((e) => e.category === category)
    if (inUse) {
      alert(`Cannot delete "${category}" - it's being used by existing expenses`)
      return
    }
    removeCustomCategory(category)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Tag className="h-4 w-4" />
          Expense Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Default Categories</Label>
          <div className="flex flex-wrap gap-2">
            {defaultCategories.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Custom Categories</Label>
          {customCategories.length === 0 ? (
            <p className="text-sm text-muted-foreground">No custom categories yet</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {customCategories.map((cat) => (
                <Badge key={cat} variant="outline" className="gap-1 pr-1">
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

        <div className="space-y-2">
          <Label htmlFor="new-category">Add New Category</Label>
          <div className="flex gap-2">
            <Input
              id="new-category"
              placeholder="e.g., Healthcare"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            />
            <Button onClick={handleAddCategory} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
