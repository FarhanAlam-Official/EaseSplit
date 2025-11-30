"use client"

import { useState } from "react"
import { notifications } from "@/lib/notifications"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Loader2, 
  Sparkles,
  Upload,
  Save,
  Trash2,
  Send
} from "lucide-react"

export default function ToastDemoPage() {
  const [customTitle, setCustomTitle] = useState("Custom Title")
  const [customDescription, setCustomDescription] = useState("This is a custom description for the toast notification.")
  const [customDuration, setCustomDuration] = useState(2500)

  // Simulate async operations
  const simulateUpload = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.3 ? resolve({ filename: "document.pdf" }) : reject(new Error("Network error"))
      }, 2000)
    })
  }

  const simulateSave = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id: 123 }), 1500)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Toast Notification Demo</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Test all types of toast notifications with beautiful animations, progress bars, and gradients.
            Built with Sonner and Tailwind CSS.
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="secondary">Beautiful Animations</Badge>
            <Badge variant="secondary">Progress Bars</Badge>
            <Badge variant="secondary">Gradient Styling</Badge>
            <Badge variant="secondary">Promise Support</Badge>
          </div>
        </div>

        <Separator />

        {/* Basic Toast Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Basic Toast Types
            </CardTitle>
            <CardDescription>
              Test the four main notification types with default settings
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              onClick={() => notifications.showSuccess("Operation completed successfully!")}
              variant="outline"
              className="h-24 flex flex-col gap-2 border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-950"
            >
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <span>Success</span>
            </Button>

            <Button
              onClick={() => notifications.showError({ description: "Something went wrong. Please try again." })}
              variant="outline"
              className="h-24 flex flex-col gap-2 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
            >
              <XCircle className="w-6 h-6 text-red-600" />
              <span>Error</span>
            </Button>

            <Button
              onClick={() => notifications.showWarning("This action cannot be undone!")}
              variant="outline"
              className="h-24 flex flex-col gap-2 border-yellow-200 hover:bg-yellow-50 dark:border-yellow-800 dark:hover:bg-yellow-950"
            >
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <span>Warning</span>
            </Button>

            <Button
              onClick={() => notifications.showInfo("New features are available!")}
              variant="outline"
              className="h-24 flex flex-col gap-2 border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950"
            >
              <Info className="w-6 h-6 text-blue-600" />
              <span>Info</span>
            </Button>
          </CardContent>
        </Card>

        {/* Detailed Toast Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Detailed Notifications
            </CardTitle>
            <CardDescription>
              Notifications with both title and description
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Button
              onClick={() =>
                notifications.showSuccess({
                  title: "Expense Added!",
                  description: "Your expense has been added to the group.",
                  duration: 3000,
                })
              }
              variant="default"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">Success with Details</div>
                <div className="text-xs opacity-80">Title + Description</div>
              </div>
            </Button>

            <Button
              onClick={() =>
                notifications.showError({
                  title: "Payment Failed",
                  description: "Unable to process payment. Please check your payment method.",
                  duration: 4000,
                })
              }
              variant="destructive"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <XCircle className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">Error with Details</div>
                <div className="text-xs opacity-80">Title + Description</div>
              </div>
            </Button>

            <Button
              onClick={() =>
                notifications.showWarning({
                  title: "Unsaved Changes",
                  description: "You have unsaved changes. Are you sure you want to leave?",
                  duration: 5000,
                })
              }
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <AlertTriangle className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">Warning with Details</div>
                <div className="text-xs opacity-80">Extended Duration (5s)</div>
              </div>
            </Button>

            <Button
              onClick={() =>
                notifications.showInfo({
                  title: "Update Available",
                  description: "Version 2.0 is now available. Click to learn more.",
                  duration: 6000,
                })
              }
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Info className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">Info with Details</div>
                <div className="text-xs opacity-80">Extended Duration (6s)</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Promise-based Toasts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="w-5 h-5" />
              Promise-based Notifications
            </CardTitle>
            <CardDescription>
              Async operations with loading, success, and error states
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Button
              onClick={() => {
                notifications.promise(simulateUpload(), {
                  loading: "Uploading file...",
                  success: (data: any) => `File uploaded: ${data.filename}`,
                  error: (err: any) => `Upload failed: ${err.message}`,
                })
              }}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Upload className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">File Upload</div>
                <div className="text-xs opacity-70">May succeed or fail</div>
              </div>
            </Button>

            <Button
              onClick={() => {
                notifications.promise(simulateSave(), {
                  loading: "Saving changes...",
                  success: "Changes saved successfully!",
                  error: "Failed to save changes",
                })
              }}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Save className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">Save Operation</div>
                <div className="text-xs opacity-70">Always succeeds</div>
              </div>
            </Button>

            <Button
              onClick={() => {
                const deletePromise = new Promise((_, reject) => {
                  setTimeout(() => reject(new Error("Permission denied")), 1500)
                })
                notifications.promise(deletePromise, {
                  loading: "Deleting item...",
                  success: "Item deleted",
                  error: (err: any) => `Delete failed: ${err.message}`,
                })
              }}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Trash2 className="w-5 h-5" />
              <div className="text-center">
                <div className="font-semibold">Delete Operation</div>
                <div className="text-xs opacity-70">Always fails</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Real-world Scenarios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Real-world Scenarios
            </CardTitle>
            <CardDescription>
              Common use cases in the EaseSplit app
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Button
              onClick={() => {
                notifications.showSuccess({
                  title: "Expense Added!",
                  description: "$45.50 added to Weekend Trip group",
                  duration: 3000,
                })
              }}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <div className="text-2xl">💰</div>
              <div className="text-center">
                <div className="font-semibold">Add Expense</div>
                <div className="text-xs opacity-70">Success notification</div>
              </div>
            </Button>

            <Button
              onClick={() => {
                notifications.showInfo({
                  title: "Settlement Request",
                  description: "John owes you $25.50. Click to send reminder.",
                  duration: 5000,
                })
              }}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <div className="text-2xl">📧</div>
              <div className="text-center">
                <div className="font-semibold">Settlement</div>
                <div className="text-xs opacity-70">Info notification</div>
              </div>
            </Button>

            <Button
              onClick={() => {
                notifications.showWarning({
                  title: "Low Balance",
                  description: "You owe $150 across 3 groups. Time to settle up!",
                  duration: 6000,
                })
              }}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <div className="text-2xl">⚠️</div>
              <div className="text-center">
                <div className="font-semibold">Balance Warning</div>
                <div className="text-xs opacity-70">Warning notification</div>
              </div>
            </Button>

            <Button
              onClick={() => {
                const exportPromise = new Promise((resolve) => {
                  setTimeout(() => resolve({ filename: "expenses_2024.pdf" }), 2000)
                })
                notifications.promise(exportPromise, {
                  loading: "Generating PDF...",
                  success: "PDF downloaded successfully!",
                  error: "Failed to generate PDF",
                })
              }}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <div className="text-2xl">📄</div>
              <div className="text-center">
                <div className="font-semibold">Export PDF</div>
                <div className="text-xs opacity-70">Promise notification</div>
              </div>
            </Button>

            <Button
              onClick={() => {
                notifications.showSuccess({
                  title: "Email Sent!",
                  description: "Settlement reminder sent to 3 members",
                  duration: 3000,
                })
              }}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <div className="text-2xl">✉️</div>
              <div className="text-center">
                <div className="font-semibold">Email Sent</div>
                <div className="text-xs opacity-70">Success notification</div>
              </div>
            </Button>

            <Button
              onClick={() => {
                notifications.showError({
                  title: "Network Error",
                  description: "Unable to sync data. Check your connection.",
                  duration: 4000,
                })
              }}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <div className="text-2xl">🌐</div>
              <div className="text-center">
                <div className="font-semibold">Sync Error</div>
                <div className="text-xs opacity-70">Error notification</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Custom Toast Builder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Custom Toast Builder
            </CardTitle>
            <CardDescription>
              Create your own custom toast notification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Enter title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (ms)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(Number(e.target.value))}
                  placeholder="2500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-4">
              <Button
                onClick={() =>
                  notifications.showSuccess({
                    title: customTitle,
                    description: customDescription,
                    duration: customDuration,
                  })
                }
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Success
              </Button>
              <Button
                onClick={() =>
                  notifications.showError({
                    title: customTitle,
                    description: customDescription,
                    duration: customDuration,
                  })
                }
                variant="destructive"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Error
              </Button>
              <Button
                onClick={() =>
                  notifications.showWarning({
                    title: customTitle,
                    description: customDescription,
                    duration: customDuration,
                  })
                }
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Warning
              </Button>
              <Button
                onClick={() =>
                  notifications.showInfo({
                    title: customTitle,
                    description: customDescription,
                    duration: customDuration,
                  })
                }
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Info className="w-4 h-4 mr-2" />
                Info
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Multiple Toasts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Multiple Notifications
            </CardTitle>
            <CardDescription>
              Test multiple toasts appearing simultaneously
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Button
              onClick={() => {
                notifications.showInfo("Starting batch operation...")
                setTimeout(() => notifications.showSuccess("Step 1 completed"), 500)
                setTimeout(() => notifications.showSuccess("Step 2 completed"), 1000)
                setTimeout(() => notifications.showSuccess("Step 3 completed"), 1500)
                setTimeout(() => notifications.showSuccess("All steps completed!"), 2000)
              }}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <div className="text-2xl">🎯</div>
              <div className="text-center">
                <div className="font-semibold">Sequential Toasts</div>
                <div className="text-xs opacity-70">4 toasts in sequence</div>
              </div>
            </Button>

            <Button
              onClick={() => {
                notifications.showSuccess("Success notification")
                notifications.showError({ description: "Error notification" })
                notifications.showWarning("Warning notification")
                notifications.showInfo("Info notification")
              }}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <div className="text-2xl">🎨</div>
              <div className="text-center">
                <div className="font-semibold">All Types at Once</div>
                <div className="text-xs opacity-70">4 toasts simultaneously</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Dismiss Button */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Dismiss All Notifications
            </CardTitle>
            <CardDescription>
              Clear all active toast notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => notifications.dismiss()}
              variant="destructive"
              className="w-full"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Dismiss All Toasts
            </Button>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Tip:</strong> All toasts feature animated progress bars that show remaining time.
              </p>
              <p className="text-sm text-muted-foreground">
                🎨 <strong>Design:</strong> Beautiful gradient styling with smooth animations and hover effects.
              </p>
              <p className="text-sm text-muted-foreground">
                ⚡ <strong>Built with:</strong> Sonner, Tailwind CSS, and Radix UI components.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
