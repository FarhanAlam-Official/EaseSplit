"use client"

import GenericErrorPage from "@/components/error-pages/GenericErrorPage"

export default function Error({
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
      errorTitle="Something went wrong"
      errorMessage="An unexpected error occurred. Please try again."
    />
  )
}
