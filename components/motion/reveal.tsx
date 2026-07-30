'use client'

/**
 * The shared reveal primitives (§6.1) — the *only* entrance pattern that
 * Skills, Services, Research and Contact are allowed to use. Reserving bespoke
 * treatments for Hero (§5.2) and Experience (§5.6) is the whole point of these
 * wrappers: if a "standard" section needs a unique animation, that is a signal
 * to reach for one of these instead.
 *
 * All three read the preference through `useMotionPrefs()`, so reduced motion is
 * handled in one place rather than per section (G5). All use
 * `viewport={{ once: true }}` per §4.
 */

import type { ReactNode } from 'react'
import { m } from 'motion/react'

import { STAGGER } from '@/lib/motion'
import { useMotionPrefs } from '@/lib/use-motion'

type Tag = 'div' | 'section' | 'span' | 'p' | 'ul' | 'li' | 'h2' | 'h3'

type RevealProps = {
  children: ReactNode
  className?: string
  as?: Tag
  /** Extra delay in seconds, on top of any parent stagger */
  delay?: number
  /** Slide travel in px; ignored under reduced motion */
  distance?: number
  /** Use the calmer 0.7s reveal — Contact's section entrance (C3) */
  calm?: boolean
  /** Fraction of the element that must be visible before revealing */
  amount?: number
}

/** Fade + slide-up on scroll into view. The house reveal. */
export function Reveal({
  children,
  className,
  as = 'div',
  delay = 0,
  distance,
  calm = false,
  amount,
}: RevealProps) {
  const { make, viewport } = useMotionPrefs()
  const Tag = m[as] as typeof m.div

  return (
    <Tag
      className={className}
      variants={make.fadeUp({ delay, distance, slow: calm })}
      initial="hidden"
      whileInView="visible"
      viewport={amount === undefined ? viewport : { once: true, amount }}
    >
      {children}
    </Tag>
  )
}

type RevealGroupProps = {
  children: ReactNode
  className?: string
  as?: Tag
  /** Seconds between children; defaults to the shared card step (~80ms) */
  each?: number
  /** Delay before the first child starts */
  delay?: number
  amount?: number
}

/**
 * Stagger parent. Children rendered as <RevealItem> (or any `m.*` element with
 * hidden/visible variants) inherit the animation label automatically.
 */
export function RevealGroup({
  children,
  className,
  as = 'div',
  each = STAGGER.card,
  delay = 0,
  amount,
}: RevealGroupProps) {
  const { stagger, viewport } = useMotionPrefs()
  const Tag = m[as] as typeof m.div

  return (
    <Tag
      className={className}
      variants={stagger(each, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={amount === undefined ? viewport : { once: true, amount }}
    >
      {children}
    </Tag>
  )
}

type RevealItemProps = {
  children: ReactNode
  className?: string
  as?: Tag
  /**
   * `fadeUp` — bullets, tags, copy rows.
   * `fadeScale` — cards (S1 / SV1).
   * `popIn` — icons and badges (SV2).
   */
  variant?: 'fadeUp' | 'fadeScale' | 'popIn'
  /** Apply the shared 4px hover lift (S2 / R2) */
  lift?: boolean
}

/** A child of <RevealGroup>. Must not set `initial`/`whileInView` itself. */
export function RevealItem({
  children,
  className,
  as = 'div',
  variant = 'fadeUp',
  lift = false,
}: RevealItemProps) {
  const { variants, lift: liftProps } = useMotionPrefs()
  const Tag = m[as] as typeof m.div

  return (
    <Tag
      className={className}
      variants={variants[variant]}
      {...(lift ? liftProps : null)}
    >
      {children}
    </Tag>
  )
}
