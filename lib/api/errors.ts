/**
 * Typed errors for the API layer.
 * Callers can branch on the class rather than string-matching messages.
 */

export class ApiError extends Error {
  readonly status: number
  readonly endpoint: string
  /** Parsed response body, when the server sent one. */
  readonly body: unknown

  constructor(message: string, options: { status: number; endpoint: string; body?: unknown }) {
    super(message)
    this.name = 'ApiError'
    this.status = options.status
    this.endpoint = options.endpoint
    this.body = options.body
  }

  /** 4xx — the request itself was wrong; retrying will not help. */
  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500
  }

  /** 5xx — the server failed; a retry may succeed. */
  get isServerError(): boolean {
    return this.status >= 500
  }
}

export class ApiTimeoutError extends Error {
  readonly endpoint: string
  readonly timeoutMs: number

  constructor(endpoint: string, timeoutMs: number) {
    super(`Request to ${endpoint} timed out after ${timeoutMs}ms`)
    this.name = 'ApiTimeoutError'
    this.endpoint = endpoint
    this.timeoutMs = timeoutMs
  }
}

export class ApiNetworkError extends Error {
  readonly endpoint: string

  constructor(endpoint: string, cause?: unknown) {
    super(`Network request to ${endpoint} failed`)
    this.name = 'ApiNetworkError'
    this.endpoint = endpoint
    this.cause = cause
  }
}

/** A message safe to show a visitor, whatever went wrong underneath. */
export function toUserMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 429) return 'Too many requests. Please wait a moment and try again.'
    if (error.isClientError) return 'We could not process that. Please check your details and try again.'
    return 'Something went wrong on our end. Please try again, or call us on (512) 885-2020.'
  }
  if (error instanceof ApiTimeoutError) {
    return 'That took longer than expected. Please try again, or give us a call.'
  }
  if (error instanceof ApiNetworkError) {
    return 'We could not reach the server. Please check your connection and try again.'
  }
  return 'Something went wrong. Please try again, or call us on (512) 885-2020.'
}
