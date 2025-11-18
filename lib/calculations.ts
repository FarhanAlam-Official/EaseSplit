import type { Group, Expense, MemberBalance, Transfer, ExpenseBreakdown, ShareMap } from "./types"

export function calculateShares(
  expense: Pick<Expense, "amount" | "splitType" | "participants" | "shares">,
  participantIds: string[],
): ShareMap {
  const { amount, splitType, shares } = expense
  const result: ShareMap = {}

  switch (splitType) {
    case "equal": {
      const share = amount / participantIds.length
      participantIds.forEach((id) => {
        result[id] = share
      })
      break
    }
    case "exact": {
      participantIds.forEach((id) => {
        result[id] = shares[id] || 0
      })
      break
    }
    case "percentage": {
      participantIds.forEach((id) => {
        const pct = shares[id] || 0
        result[id] = (pct / 100) * amount
      })
      break
    }
    case "shares": {
      const totalShares = participantIds.reduce((sum, id) => sum + (shares[id] || 0), 0)
      participantIds.forEach((id) => {
        const share = shares[id] || 0
        result[id] = totalShares > 0 ? (share / totalShares) * amount : 0
      })
      break
    }
    case "itemized": {
      participantIds.forEach((id) => {
        result[id] = shares[id] || 0
      })
      break
    }
    default: {
      const share = amount / participantIds.length
      participantIds.forEach((id) => {
        result[id] = share
      })
    }
  }

  return result
}

export function calculateMemberBalances(group: Group): MemberBalance[] {
  const balances: Map<string, MemberBalance> = new Map()

  group.members.forEach((member) => {
    balances.set(member.id, {
      memberId: member.id,
      memberName: member.name,
      totalPaid: 0,
      totalOwed: 0,
      netBalance: 0,
    })
  })

  group.expenses.forEach((expense) => {
    const payerBalance = balances.get(expense.payerId)
    if (payerBalance) {
      payerBalance.totalPaid += expense.amount
    }

    const shares = calculateShares(expense, expense.participants)
    Object.entries(shares).forEach(([memberId, amount]) => {
      const memberBalance = balances.get(memberId)
      if (memberBalance) {
        memberBalance.totalOwed += amount
      }
    })
  })

  balances.forEach((balance) => {
    balance.netBalance = Math.round((balance.totalPaid - balance.totalOwed) * 100) / 100
  })

  return Array.from(balances.values())
}

export function simplifyDebts(balances: MemberBalance[]): Transfer[] {
  const creditors: { id: string; name: string; bal: number }[] = []
  const debtors: { id: string; name: string; bal: number }[] = []

  balances.forEach((b) => {
    if (b.netBalance > 0.01) {
      creditors.push({ id: b.memberId, name: b.memberName, bal: b.netBalance })
    } else if (b.netBalance < -0.01) {
      debtors.push({ id: b.memberId, name: b.memberName, bal: -b.netBalance })
    }
  })

  creditors.sort((a, b) => b.bal - a.bal)
  debtors.sort((a, b) => b.bal - a.bal)

  const transfers: Transfer[] = []

  while (creditors.length > 0 && debtors.length > 0) {
    const creditor = creditors[0]
    const debtor = debtors[0]
    const amount = Math.min(creditor.bal, debtor.bal)

    if (amount > 0.01) {
      transfers.push({
        from: debtor.id,
        to: creditor.id,
        amount: Math.round(amount * 100) / 100,
      })
    }

    creditor.bal -= amount
    debtor.bal -= amount

    if (creditor.bal < 0.01) creditors.shift()
    if (debtor.bal < 0.01) debtors.shift()
  }

  return transfers
}

export function getExpenseBreakdowns(group: Group): ExpenseBreakdown[] {
  return group.expenses.map((expense) => {
    const payer = group.members.find((m) => m.id === expense.payerId)
    const shares = calculateShares(expense, expense.participants)

    return {
      expenseId: expense.id,
      title: expense.title,
      amount: expense.amount,
      payerName: payer?.name || "Unknown",
      payerId: expense.payerId,
      splitType: expense.splitType,
      shares: expense.participants.map((memberId) => {
        const member = group.members.find((m) => m.id === memberId)
        return {
          memberId,
          memberName: member?.name || "Unknown",
          amount: shares[memberId] || 0,
        }
      }),
    }
  })
}

export function getCategoryTotals(group: Group): { name: string; value: number }[] {
  const categories: Map<string, number> = new Map()

  group.expenses.forEach((expense) => {
    const current = categories.get(expense.category) || 0
    categories.set(expense.category, current + expense.amount)
  })

  return Array.from(categories.entries()).map(([name, value]) => ({ name, value }))
}

export function getMemberContributions(group: Group): { name: string; paid: number; owed: number }[] {
  const balances = calculateMemberBalances(group)
  return balances.map((b) => ({
    name: b.memberName,
    paid: Math.round(b.totalPaid * 100) / 100,
    owed: Math.round(b.totalOwed * 100) / 100,
  }))
}

export function getSpendingOverTime(group: Group): { date: string; amount: number }[] {
  const dateMap: Map<string, number> = new Map()

  group.expenses.forEach((expense) => {
    const current = dateMap.get(expense.date) || 0
    dateMap.set(expense.date, current + expense.amount)
  })

  return Array.from(dateMap.entries())
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
