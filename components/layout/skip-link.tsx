/**
 * Lets keyboard users jump past the header straight to the page content.
 * Visually hidden until focused.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only-focusable fixed top-4 left-4 z-toast rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-ink shadow-lg"
    >
      Skip to content
    </a>
  )
}
