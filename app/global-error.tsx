"use client"

import GenericErrorPage from "@/components/error-pages/GenericErrorPage"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <GenericErrorPage
          error={error}
          reset={reset}
          errorTitle="Critical Error"
          errorMessage="A critical error occurred in the application. Please refresh the page."
        />
      </body>
    </html>
  )
}
