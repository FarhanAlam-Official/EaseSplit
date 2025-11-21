import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "EaseSplit — Split bills. Stay friends.",
    template: "%s | EaseSplit"
  },
  description: "Fast, local, and privacy-first bill splitting with beautiful visuals. Split expenses with friends and groups easily. No signup required.",
  keywords: ["bill splitting", "expense tracker", "split bills", "group expenses", "privacy-first", "local storage", "free bill splitter"],
  authors: [{ name: "EaseSplit Team" }],
  creator: "EaseSplit Team",
  publisher: "EaseSplit",
  generator: 'v0.app',
  applicationName: "EaseSplit",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL('https://easesplit.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://easesplit.app',
    title: 'EaseSplit — Split bills. Stay friends.',
    description: 'Fast, local, and privacy-first bill splitting with beautiful visuals. Split expenses with friends easily.',
    siteName: 'EaseSplit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EaseSplit — Split bills. Stay friends.',
    description: 'Fast, local, and privacy-first bill splitting with beautiful visuals.',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png' },
    ],
    shortcut: '/favicon/favicon-16x16.png',
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
