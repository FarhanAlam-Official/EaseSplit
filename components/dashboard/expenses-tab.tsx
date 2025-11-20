"use client"

import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Receipt, Search, Filter, X, Edit2, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { getCurrencySymbol } from "@/lib/utils"

interface ExpensesTabProps {
  onAddExpense: () => void
  onEditExpense?: (expenseId: string) => void
}

const categoryEmojis: Record<string, string> = {
  Food: "🍔",
  Travel: "✈️",
  Accommodation: "🏨",
  Stay: "🏨",
  Shopping: "🛍️",
  Entertainment: "🎬",
  Utilities: "💡",
  Other: "💰",
  Misc: "📦",
}

export function ExpensesTab({ onAddExpense, onEditExpense }: ExpensesTabProps) {
  const { activeGroup, removeExpense, getAvailableCategories } = useApp()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedMember, setSelectedMember] = useState<string>("all")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [selectedExpenses, setSelectedExpenses] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  if (!activeGroup) return null

  const currencySymbol = getCurrencySymbol(activeGroup.currency)

  const getMemberName = (id: string) => {
    return activeGroup.members.find((m) => m.id === id)?.name || "Unknown"
  }

  const getSplitLabel = (expense: (typeof activeGroup.expenses)[0]) => {
    switch (expense.splitType) {
      case "equal":
        return `Split equally (${expense.participants.length} people)`
      case "exact":
        return "Split by exact amounts"
      case "percentage":
        return "Split by percentage"
      case "shares":
        return "Split by shares"
      case "itemized":
        return "Itemized split"
      default:
        return "Custom split"
    }
  }

  // Filter and search expenses
  const filteredExpenses = useMemo(() => {
    return activeGroup.expenses.filter((expense) => {
      // Search filter
      const matchesSearch = 
        expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getMemberName(expense.payerId).toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory

      // Member filter (payer)
      const matchesMember = selectedMember === "all" || expense.payerId === selectedMember

      // Date range filter
      const expenseDate = new Date(expense.date)
      const matchesDateRange = 
        (!dateRange.from || expenseDate >= dateRange.from) &&
        (!dateRange.to || expenseDate <= dateRange.to)

      return matchesSearch && matchesCategory && matchesMember && matchesDateRange
    })
  }, [activeGroup.expenses, searchQuery, selectedCategory, selectedMember, dateRange])

  const handleSelectExpense = (expenseId: string) => {
    const newSelected = new Set(selectedExpenses)
    if (newSelected.has(expenseId)) {
      newSelected.delete(expenseId)
    } else {
      newSelected.add(expenseId)
    }
    setSelectedExpenses(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedExpenses.size === filteredExpenses.length) {
      setSelectedExpenses(new Set())
    } else {
      setSelectedExpenses(new Set(filteredExpenses.map((e) => e.id)))
    }
  }

  const handleDeleteSelected = () => {
    if (confirm(`Delete ${selectedExpenses.size} expense(s)?`)) {
      selectedExpenses.forEach((id) => removeExpense(id))
      setSelectedExpenses(new Set())
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedMember("all")
    setDateRange({})
  }

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || selectedMember !== "all" || dateRange.from || dateRange.to

  if (activeGroup.expenses.length === 0) {
    return (
      <Card className="p-12">
        <CardContent className="flex flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent mb-4">
            <Receipt className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No expenses yet</h3>
          <p className="text-muted-foreground mb-6">
            Add your first expense to start tracking your group{"'"}s spending.
          </p>
          <Button onClick={onAddExpense}>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant={showFilters ? "default" : "outline"}
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={onAddExpense}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getAvailableCategories().map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {categoryEmojis[cat] || "💰"} {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger>
                <SelectValue placeholder="All Members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                {activeGroup.members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM d, yyyy")
                    )
                  ) : (
                    "Date Range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                  numberOfMonths={2}
                />
                {(dateRange.from || dateRange.to) && (
                  <div className="p-3 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => setDateRange({})}
                    >
                      Clear dates
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </motion.div>
        )}

        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              {filteredExpenses.length} of {activeGroup.expenses.length} expenses
            </Badge>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-3 w-3 mr-1" />
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Batch Actions */}
      {selectedExpenses.size > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-3 flex items-center justify-between">
            <span className="text-sm font-medium">
              {selectedExpenses.size} expense{selectedExpenses.size !== 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedExpenses(new Set())}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Expenses List Header */}
      {filteredExpenses.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedExpenses.size === filteredExpenses.length && filteredExpenses.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-muted-foreground">
              {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      )}

      {/* Expenses List */}
      {filteredExpenses.length === 0 ? (
        <Card className="p-8">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No expenses match your filters</p>
            <Button variant="link" onClick={clearFilters}>
              Clear filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <AnimatePresence>
          {filteredExpenses
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.04 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedExpenses.has(expense.id)}
                        onCheckedChange={() => handleSelectExpense(expense.id)}
                      />
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                        <span className="text-lg">{categoryEmojis[expense.category] || "💰"}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground">{expense.title}</h4>
                        <p className="text-sm text-muted-foreground truncate">
                          Paid by {getMemberName(expense.payerId)} &middot; {expense.date}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{getSplitLabel(expense)}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">{currencySymbol}{expense.amount.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{expense.category}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          {onEditExpense && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-primary"
                              onClick={() => onEditExpense(expense.id)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeExpense(expense.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {expense.notes && (
                      <p className="mt-3 ml-[60px] text-sm text-muted-foreground bg-accent/50 p-2 rounded-lg">
                        {expense.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  )
}
