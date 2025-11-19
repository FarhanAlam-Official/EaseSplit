import type React from "react"
import { AppProvider } from "@/lib/app-context"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}
