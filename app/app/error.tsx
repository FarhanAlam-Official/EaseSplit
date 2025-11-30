"use client"

import GenericErrorPage from "@/components/error-pages/GenericErrorPage"

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <GenericErrorPage
      error={error}
      reset={reset}
      errorTitle="Dashboard Error"
      errorMessage="An error occurred in the dashboard. Your data is safe."
    />
  )
}
