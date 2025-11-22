"use client"

import { useApp } from "@/lib/app-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getCategoryTotals, getMemberContributions, getSpendingOverTime, calculateMemberBalances } from "@/lib/calculations"
import { getCurrencySymbol } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Receipt, Users, Calendar, PieChart as PieChartIcon } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from "recharts"

const COLORS = [
  "#09bc8a", // Teal (primary)
  "#3b82f6", // Blue
  "#a855f7", // Purple
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#84cc16", // Lime
  "#f97316", // Orange
  "#8b5cf6", // Violet
]

const CHART_COLORS = {
  primary: "#09bc8a",     // Teal
  secondary: "#ef4444",   // Red
  accent: "#a855f7",      // Purple
  tertiary: "#f59e0b",    // Amber
  success: "#10b981",     // Emerald
  warning: "#f59e0b",     // Amber
  danger: "#ef4444",      // Red
}

export function AnalyticsTab() {
  const { activeGroup } = useApp()

  if (!activeGroup) return null

  const currencySymbol = getCurrencySymbol(activeGroup.currency)
  const categoryData = getCategoryTotals(activeGroup)
  const memberData = getMemberContributions(activeGroup)
  const timeData = getSpendingOverTime(activeGroup)
  const balances = calculateMemberBalances(activeGroup)

  if (activeGroup.expenses.length === 0) {
    return (
      <Card className="p-12">
        <CardContent className="flex flex-col items-center justify-center text-center">
          <p className="text-muted-foreground">Add some expenses to see analytics</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate key metrics
  const totalExpenses = activeGroup.expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const avgExpense = totalExpenses / activeGroup.expenses.length
  const avgPerPerson = totalExpenses / activeGroup.members.length
  const mostExpensiveCategory = categoryData.reduce((max, cat) => (cat.value > max.value ? cat : max), categoryData[0])
  const topExpenses = [...activeGroup.expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)

  // Calculate split type distribution
  const splitTypeData = activeGroup.expenses.reduce((acc, exp) => {
    const type = exp.splitType
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const splitTypeChartData = Object.entries(splitTypeData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    fill: COLORS[Object.keys(splitTypeData).indexOf(name) % COLORS.length],
  }))

  // Calculate member participation
  const memberParticipation = activeGroup.members.map((member) => {
    const participatedIn = activeGroup.expenses.filter((exp) =>
      exp.participants.includes(member.id) || exp.payerId === member.id
    ).length
    const percentage = (participatedIn / activeGroup.expenses.length) * 100
    return { name: member.name, count: participatedIn, percentage }
  })

  // Calculate daily average
  const dates = activeGroup.expenses.map((e) => new Date(e.date).getTime())
  const daySpan = dates.length > 0 ? (Math.max(...dates) - Math.min(...dates)) / (1000 * 60 * 60 * 24) + 1 : 1
  const dailyAvg = totalExpenses / Math.max(daySpan, 1)

  // Top payer and top ower
  const topPayer = balances.reduce((max, b) => (b.totalPaid > max.totalPaid ? b : max), balances[0])
  const topOwer = balances.reduce((max, b) => (b.totalOwed > max.totalOwed ? b : max), balances[0])

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currencySymbol}{totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">{activeGroup.expenses.length} transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Per Person
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currencySymbol}{avgPerPerson.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">{activeGroup.members.length} members</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Avg Expense
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{currencySymbol}{avgExpense.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">per transaction</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Daily Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{currencySymbol}{dailyAvg.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">over {Math.ceil(daySpan)} days</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Insights */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Top Payer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{topPayer?.memberName}</p>
                <p className="text-sm text-muted-foreground">Paid the most</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{currencySymbol}{topPayer?.totalPaid.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              Highest Spender
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{topOwer?.memberName}</p>
                <p className="text-sm text-muted-foreground">Owes the most</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{currencySymbol}{topOwer?.totalOwed.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Category Breakdown Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Expenses by Category</CardTitle>
            <CardDescription>
              Top category: <span className="font-semibold text-foreground">{mostExpensiveCategory?.name}</span>{" "}
              ({currencySymbol}{mostExpensiveCategory?.value.toFixed(2)})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${currencySymbol}${value.toFixed(2)}`}
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Split Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Split Methods Used</CardTitle>
            <CardDescription>How expenses are divided among members</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={splitTypeChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {splitTypeChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value} expenses`}
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Member Contributions Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Member Contributions</CardTitle>
            <CardDescription>Paid vs Owed comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={memberData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} width={90} />
                <Tooltip
                  formatter={(value: number) => `${currencySymbol}${value.toFixed(2)}`}
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="paid" fill={CHART_COLORS.primary} name="Paid" radius={[0, 4, 4, 0]} />
                <Bar dataKey="owed" fill={CHART_COLORS.secondary} name="Owes" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Member Participation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Member Participation</CardTitle>
            <CardDescription>Involvement in expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {memberParticipation.map((member, index) => (
              <div key={member.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{member.name}</span>
                  <span className="text-muted-foreground">
                    {member.count}/{activeGroup.expenses.length} ({member.percentage.toFixed(0)}%)
                  </span>
                </div>
                <Progress 
                  value={member.percentage} 
                  className="h-2"
                  style={{
                    // @ts-ignore
                    '--progress-background': COLORS[index % COLORS.length],
                  } as React.CSSProperties}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Spending Trend Area Chart */}
      {timeData.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Spending Trend Over Time</CardTitle>
            <CardDescription>Daily expense accumulation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timeData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  }
                />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => `${currencySymbol}${value.toFixed(2)}`}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#a855f7"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Top Expenses List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top 5 Expenses</CardTitle>
          <CardDescription>Highest individual transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topExpenses.map((expense, index) => {
              const payer = activeGroup.members.find((m) => m.id === expense.payerId)
              return (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{expense.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {expense.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Paid by {payer?.name || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      {currencySymbol}{expense.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown with Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detailed Category Breakdown</CardTitle>
          <CardDescription>Spending distribution across categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData
              .sort((a, b) => b.value - a.value)
              .map((category, index) => {
                const percentage = (category.value / totalExpenses) * 100
                const categoryExpenses = activeGroup.expenses.filter((e) => e.category === category.name)
                const colorIndex = index % COLORS.length
                return (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[colorIndex],
                          }}
                        />
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {categoryExpenses.length} expense{categoryExpenses.length !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{currencySymbol}{category.value.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2"
                      style={{
                        // @ts-ignore
                        '--progress-background': COLORS[colorIndex],
                      } as React.CSSProperties}
                    />
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
