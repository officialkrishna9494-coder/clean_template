import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * The button recipe. Every clickable call to action on the site — button or
 * link — renders through this, so hover, focus, disabled and sizing behaviour
 * is defined exactly once.
 */
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-sans font-semibold tracking-tight',
    'rounded-button border border-transparent',
    'transition-[background-color,border-color,color,box-shadow,transform]',
    'duration-[var(--t-duration-fast)] ease-[var(--t-ease-standard)]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:opacity-55',
    'active:translate-y-px',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-ink hover:bg-primary-hover shadow-sm hover:shadow-md',
        accent: 'bg-accent text-accent-ink hover:bg-accent-hover shadow-sm hover:shadow-md',
        outline: 'border-border-strong bg-transparent text-ink hover:border-primary hover:text-primary',
        soft: 'bg-primary-soft text-primary hover:bg-primary hover:text-primary-ink',
        ghost: 'bg-transparent text-ink hover:bg-primary-soft hover:text-primary',
        link: 'rounded-none px-0 text-primary underline-offset-4 hover:underline',
        inverted: 'bg-background text-primary hover:bg-primary-soft shadow-sm',
        'inverted-outline':
          'border-ink-inverted/35 bg-transparent text-ink-inverted hover:border-ink-inverted hover:bg-white/10',
        danger: 'bg-danger text-white hover:opacity-90',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-13 px-7 text-base',
        xl: 'h-15 px-9 text-base',
        icon: 'size-11 p-0',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [{ variant: 'link', size: ['sm', 'md', 'lg', 'xl'], class: 'h-auto p-0' }],
    defaultVariants: { variant: 'primary', size: 'md', block: false },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

type CommonProps = ButtonVariantProps & {
  children: ReactNode
  className?: string
  /** Rendered before the label. */
  leadingIcon?: ReactNode
  /** Rendered after the label. */
  trailingIcon?: ReactNode
}

export type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
    /** Shows a spinner and blocks interaction. */
    loading?: boolean
  }

function Spinner() {
  return (
    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" className="opacity-25" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Button({
  children,
  className,
  variant,
  size,
  block,
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...props}
    >
      {loading ? <Spinner /> : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  )
}

export type ButtonLinkProps = CommonProps & {
  href: string
  /** Opens in a new tab with safe `rel`. */
  external?: boolean
  'aria-label'?: string
  prefetch?: boolean
  onClick?: () => void
}

/**
 * A link that looks like a button. Uses `next/link` for internal routes so
 * navigation stays client-side, and a plain anchor for external and
 * `tel:` / `mailto:` targets.
 */
export function ButtonLink({
  href,
  children,
  className,
  variant,
  size,
  block,
  leadingIcon,
  trailingIcon,
  external,
  prefetch,
  ...props
}: ButtonLinkProps) {
  const classes = cn(buttonVariants({ variant, size, block }), className)
  const content = (
    <>
      {leadingIcon}
      {children}
      {trailingIcon}
    </>
  )

  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href)

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} prefetch={prefetch} {...props}>
      {content}
    </Link>
  )
}
