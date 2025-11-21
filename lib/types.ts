export interface Member {
  id: string
  name: string
  email?: string
  avatar?: string
}

export interface ShareMap {
  [memberId: string]: number
}

export interface Expense {
  id: string
  title: string
  amount: number
  date: string
  payerId: string
  participants: string[]
  splitType: "equal" | "exact" | "percentage" | "shares" | "itemized"
  shares: ShareMap
  category: string
  notes?: string
  receipt?: string
}

export interface GroupSettings {
  simplifyDebts: boolean
  rounding: "nearest-1" | "nearest-0.5" | "none"
}

export interface Activity {
  id: string
  type: "expense_added" | "expense_updated" | "expense_deleted" | "member_added" | "member_removed" | "group_updated"
  description: string
  timestamp: string
  userId?: string
}

export interface Group {
  id: string
  name: string
  currency: string
  createdAt: string
  createdBy?: string // Name of the person who created the group
  createdByEmail?: string // Email of the person who created the group
  members: Member[]
  expenses: Expense[]
  settings: GroupSettings
  customCategories?: string[]
  activities?: Activity[]
}

export interface AppData {
  groups: Group[]
  activeGroupId: string | null
  meta: {
    lastUpdated: string
    version: string
  }
}

export interface Transfer {
  from: string
  to: string
  amount: number
}

export interface MemberBalance {
  memberId: string
  memberName: string
  totalPaid: number
  totalOwed: number
  netBalance: number
}

export interface ExpenseBreakdown {
  expenseId: string
  title: string
  amount: number
  payerName: string
  payerId: string
  splitType: string
  shares: { memberId: string; memberName: string; amount: number }[]
}

export interface SMTPConfig {
  host: string
  port: number
  secure: boolean
  user: string
  password: string
}
