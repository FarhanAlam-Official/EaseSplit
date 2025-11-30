"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import GenericErrorPage from "@/components/error-pages/GenericErrorPage"
import NetworkErrorPage from "@/components/error-pages/NetworkErrorPage"
import NotFoundErrorPage from "@/components/error-pages/NotFoundErrorPage"
import ServerErrorPage from "@/components/error-pages/ServerErrorPage"
import { 
  ShieldAlert, 
  WifiOff, 
  FileQuestion, 
  ServerCrash,
  Home,
  Eye
} from "lucide-react"

type ErrorType = "generic" | "network" | "notfound" | "server" | null

export default function ErrorPagesDemo() {
  const [activeError, setActiveError] = useState<ErrorType>(null)

  if (activeError === "generic") {
    return (
      <div>
        <Button
          onClick={() => setActiveError(null)}
          className="fixed top-4 right-4 z-50"
          variant="outline"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Demo
        </Button>
        <GenericErrorPage
          error={new Error("This is a simulated error for testing purposes. The error stack trace would normally appear here with detailed debugging information.")}
          reset={() => setActiveError(null)}
          errorTitle="Something went wrong"
          errorMessage="An unexpected error occurred while processing your request."
        />
      </div>
    )
  }

  if (activeError === "network") {
    return (
      <div>
        <Button
          onClick={() => setActiveError(null)}
          className="fixed top-4 right-4 z-50"
          variant="outline"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Demo
        </Button>
        <NetworkErrorPage />
      </div>
    )
  }

  if (activeError === "notfound") {
    return (
      <div>
        <Button
          onClick={() => setActiveError(null)}
          className="fixed top-4 right-4 z-50"
          variant="outline"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Demo
        </Button>
        <NotFoundErrorPage />
      </div>
    )
  }

  if (activeError === "server") {
    return (
      <div>
        <Button
          onClick={() => setActiveError(null)}
          className="fixed top-4 right-4 z-50"
          variant="outline"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Demo
        </Button>
        <ServerErrorPage />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <ShieldAlert className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Error Pages Demo</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Preview all error pages with beautiful designs, animations, and helpful user guidance.
            Each error page is designed to be informative and user-friendly.
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="secondary">Beautiful Design</Badge>
            <Badge variant="secondary">Smooth Animations</Badge>
            <Badge variant="secondary">User-Friendly</Badge>
            <Badge variant="secondary">Framer Motion</Badge>
          </div>
        </div>

        <Separator />

        {/* Error Page Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Generic Error */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                <ShieldAlert className="w-6 h-6 text-red-500" />
              </div>
              <CardTitle>Generic Error</CardTitle>
              <CardDescription>
                Default error page for unexpected application errors with stack trace and debugging info
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Error details with digest</p>
                <p>✓ Copy error to clipboard</p>
                <p>✓ Report issue via email</p>
                <p>✓ Expandable stack trace</p>
              </div>
              <Button
                onClick={() => setActiveError("generic")}
                className="w-full"
                variant="outline"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Error Page
              </Button>
            </CardContent>
          </Card>

          {/* Network Error */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <WifiOff className="w-6 h-6 text-orange-500" />
              </div>
              <CardTitle>Network Error</CardTitle>
              <CardDescription>
                Connection error page shown when the app cannot reach the server
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Network status illustration</p>
                <p>✓ Retry connection button</p>
                <p>✓ Return to home option</p>
                <p>✓ Contact support link</p>
              </div>
              <Button
                onClick={() => setActiveError("network")}
                className="w-full"
                variant="outline"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Error Page
              </Button>
            </CardContent>
          </Card>

          {/* 404 Not Found */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <FileQuestion className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle>404 Not Found</CardTitle>
              <CardDescription>
                Page not found error with creative design and navigation options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Large 404 visual element</p>
                <p>✓ Friendly error message</p>
                <p>✓ Go home / Go back buttons</p>
                <p>✓ Smooth animations</p>
              </div>
              <Button
                onClick={() => setActiveError("notfound")}
                className="w-full"
                variant="outline"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Error Page
              </Button>
            </CardContent>
          </Card>

          {/* 500 Server Error */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                <ServerCrash className="w-6 h-6 text-purple-500" />
              </div>
              <CardTitle>500 Server Error</CardTitle>
              <CardDescription>
                Internal server error page with interactive elements and helpful guidance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Animated 500 display</p>
                <p>✓ Mouse hover effects</p>
                <p>✓ Report problem option</p>
                <p>✓ Floating orb animations</p>
              </div>
              <Button
                onClick={() => setActiveError("server")}
                className="w-full"
                variant="outline"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Error Page
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Design Features</CardTitle>
            <CardDescription>
              All error pages share these design principles and features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="text-2xl">🎨</div>
                <h3 className="font-semibold">Beautiful Design</h3>
                <p className="text-sm text-muted-foreground">
                  Modern, clean designs with gradient backgrounds and smooth color transitions
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">✨</div>
                <h3 className="font-semibold">Animations</h3>
                <p className="text-sm text-muted-foreground">
                  Framer Motion animations for smooth, professional user experiences
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🌓</div>
                <h3 className="font-semibold">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Full dark mode support with beautiful contrast and readability
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">📱</div>
                <h3 className="font-semibold">Responsive</h3>
                <p className="text-sm text-muted-foreground">
                  Mobile-first design that looks great on all screen sizes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Guide */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use in Your App</CardTitle>
            <CardDescription>
              Import and use these error pages throughout your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">For Generic Errors (error.tsx)</h4>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import GenericErrorPage from "@/components/error-pages/GenericErrorPage"

export default function Error({ error, reset }) {
  return <GenericErrorPage error={error} reset={reset} />
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">For 404 Pages (not-found.tsx)</h4>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import NotFoundErrorPage from "@/components/error-pages/NotFoundErrorPage"

export default function NotFound() {
  return <NotFoundErrorPage />
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Tip:</strong> All error pages include helpful actions to guide users back to working parts of the app.
              </p>
              <p className="text-sm text-muted-foreground">
                🎨 <strong>Design:</strong> Consistent design language with EaseSplit brand colors and components.
              </p>
              <p className="text-sm text-muted-foreground">
                ⚡ <strong>Built with:</strong> Framer Motion, Radix UI, and Tailwind CSS for maximum performance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
