import type { AppData, Group } from "./types"

const STORAGE_KEY = "easesplit_v1"

const defaultData: AppData = {
  groups: [],
  activeGroupId: null,
  meta: {
    lastUpdated: new Date().toISOString(),
    version: "1.0.0",
  },
}

export function loadAppData(): AppData {
  if (typeof window === "undefined") return defaultData

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored) as AppData
      return data
    }
  } catch (e) {
    console.error("Failed to load app data:", e)
  }

  // Return empty data for first-time users - no demo data
  // Users will see the welcome screen instead
  return defaultData
}

export function saveAppData(data: AppData): void {
  if (typeof window === "undefined") return

  try {
    data.meta.lastUpdated = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    window.dispatchEvent(new Event("storage"))
  } catch (e) {
    console.error("Failed to save app data:", e)
  }
}

export function exportToJSON(data: AppData): string {
  return JSON.stringify(data, null, 2)
}

export function exportGroupToCSV(group: Group): string {
  const headers = ["Date", "Title", "Amount", "Paid By", "Category", "Split Type", "Participants", "Notes"]
  const rows = group.expenses.map((e) => {
    const payer = group.members.find((m) => m.id === e.payerId)?.name || "Unknown"
    const participants = e.participants
      .map((id) => group.members.find((m) => m.id === id)?.name || "Unknown")
      .join("; ")
    return [
      e.date,
      `"${e.title}"`,
      e.amount.toFixed(2),
      payer,
      e.category,
      e.splitType,
      `"${participants}"`,
      `"${e.notes || ""}"`,
    ].join(",")
  })

  return [headers.join(","), ...rows].join("\n")
}

export function importFromJSON(jsonString: string): AppData | null {
  try {
    const data = JSON.parse(jsonString) as AppData
    if (data.groups && data.meta) {
      return data
    }
    return null
  } catch {
    return null
  }
}
