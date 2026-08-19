import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export const cardVariants = cva(
  'relative flex flex-col rounded-card transition-[transform,box-shadow,border-color] duration-[var(--t-duration-normal)] ease-[var(--t-ease-standard)]',
  {
    variants: {
      variant: {
        /** Bordered, flat — the default for content cards. */
        outline: 'border border-border bg-elevated',
        /** Raised with a soft shadow. */
        elevated: 'border border-border/60 bg-elevated shadow-soft',
        /** Tinted, borderless — for feature grids on white backgrounds. */
        soft: 'bg-surface',
        /** Brand-tinted. */
        brand: 'bg-primary-soft',
        /** On dark bands. */
        inverted: 'border border-white/10 bg-white/5 backdrop-blur-sm',
        /** No chrome at all. */
        plain: '',
      },
      padding: {
        none: 'p-0',
        sm: 'p-5',
        md: 'p-6 sm:p-7',
        lg: 'p-7 sm:p-9',
      },
      /** Lift on hover — only for cards that are themselves links. */
      interactive: {
        true: 'hover:-translate-y-1 hover:shadow-lg hover:border-primary/30',
        false: '',
      },
    },
    defaultVariants: { variant: 'outline', padding: 'md', interactive: false },
  },
)

export type CardProps = VariantProps<typeof cardVariants> & {
  children: ReactNode
  className?: string
  as?: ElementType
  /** Turns the whole card into a link and enables the hover lift. */
  href?: string
}

export function Card({
  children,
  className,
  variant,
  padding,
  interactive,
  as: Component = 'div',
  href,
}: CardProps) {
  const classes = cn(
    cardVariants({ variant, padding, interactive: href ? true : interactive }),
    href && 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    className,
  )

  if (href) {
    return (
      <Link href={href} className={cn(classes, 'group')}>
        {children}
      </Link>
    )
  }

  return <Component className={classes}>{children}</Component>
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-1 flex-col gap-3', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mt-auto flex items-center gap-3 pt-5', className)}>{children}</div>
}
