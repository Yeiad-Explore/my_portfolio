'use client'

import { useEffect, useRef } from 'react'
import { animate, m, useInView, useMotionValue, useTransform } from 'motion/react'

import { TRANSITION } from '@/lib/motion'
import { useMotionPrefs } from '@/lib/use-motion'
import { cn } from '@/lib/utils'

/**
 * R1 — counts a stat up from 0 when it scrolls into view, once, over 1.2s with
 * an ease-out.
 *
 * Accessibility: the ticking digits are `aria-hidden` (a screen reader
 * announcing every intermediate value would be noise) and the final value is
 * exposed once as visually-hidden text.
 *
 * Layout: `tabular-nums` plus a `ch`-based `min-width` reserves the final
 * value's width up front, so growing from "0" to "2023" cannot shift the
 * dividers and labels beside it (§9 — no layout shift).
 *
 * G5 — under reduced motion the value is set immediately rather than counted.
 */
export function CountUp({
  value,
  suffix = '',
  className,
}: {
  value: number
  suffix?: string
  className?: string
}) {
  const { reduced } = useMotionPrefs()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    if (!inView) return

    if (reduced) {
      count.set(value)
      return
    }

    const controls = animate(count, value, TRANSITION.count)
    return () => controls.stop()
  }, [inView, reduced, value, count])

  return (
    <span
      ref={ref}
      className={cn('inline-block tabular-nums', className)}
      style={{ minWidth: `${String(value).length + suffix.length * 0.6}ch` }}
    >
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        <m.span>{rounded}</m.span>
        {suffix}
      </span>
    </span>
  )
}
