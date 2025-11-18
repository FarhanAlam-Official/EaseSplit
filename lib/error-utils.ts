/**
 * Error handling utilities for EaseSplit
 * 
 * These utilities help you trigger and handle different types of errors
 * throughout the application.
 */

/**
 * Throw a network error that will be caught by error boundaries
 */
export function throwNetworkError(message = "Network connection failed"): never {
  const error = new Error(message)
  error.name = "NetworkError"
  throw error
}

/**
 * Throw a server error that will be caught by error boundaries
 */
export function throwServerError(message = "Internal server error"): never {
  const error = new Error(message)
  error.name = "ServerError"
  throw error
}

/**
 * Navigate to 404 page programmatically
 */
export function navigateToNotFound() {
  if (typeof window !== "undefined") {
    window.location.href = "/404"
  }
}

/**
 * Check if an error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.name === "NetworkError" ||
      error.message.includes("network") ||
      error.message.includes("fetch") ||
      error.message.includes("connection")
    )
  }
  return false
}

/**
 * Check if an error is a server error
 */
export function isServerError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.name === "ServerError" ||
      error.message.includes("500") ||
      error.message.includes("server error")
    )
  }
  return false
}

/**
 * Format error for display
 */
export function formatError(error: unknown): {
  title: string
  message: string
} {
  if (error instanceof Error) {
    if (isNetworkError(error)) {
      return {
        title: "Network Error",
        message: "Unable to connect to the server. Please check your internet connection.",
      }
    }
    if (isServerError(error)) {
      return {
        title: "Server Error",
        message: "The server encountered an error. Please try again later.",
      }
    }
    return {
      title: "Error",
      message: error.message,
    }
  }
  return {
    title: "Unknown Error",
    message: "An unexpected error occurred.",
  }
}

/**
 * Higher-order function to wrap async functions with error handling
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options?: {
    onError?: (error: unknown) => void
    fallback?: () => void
  }
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error("Error caught by withErrorHandling:", error)
      if (options?.onError) {
        options.onError(error)
      }
      if (options?.fallback) {
        options.fallback()
      }
      throw error
    }
  }) as T
}
