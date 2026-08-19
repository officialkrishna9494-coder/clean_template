import { Container } from '@/components/ui'

/**
 * Route-level loading state. Renders a skeleton matching the shape of a
 * typical page hero so navigation never flashes an empty viewport.
 */
export default function Loading() {
  return (
    <div className="bg-surface py-[var(--t-section-lg)]" role="status" aria-label="Loading">
      <Container className="flex flex-col items-center gap-5">
        <div className="h-4 w-28 animate-pulse rounded-full bg-border" />
        <div className="h-12 w-full max-w-2xl animate-pulse rounded-lg bg-border" />
        <div className="h-12 w-full max-w-xl animate-pulse rounded-lg bg-border" />
        <div className="h-4 w-full max-w-lg animate-pulse rounded-full bg-border" />
        <div className="h-4 w-full max-w-md animate-pulse rounded-full bg-border" />
      </Container>
    </div>
  )
}
