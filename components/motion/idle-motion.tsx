'use client'

import type { ReactNode } from 'react'
import { useRef } from 'react'
import { m, useInView } from 'motion/react'

import { IDLE, IDLE_REST, TRANSITION, loop, type IdlePreset } from '@/lib/motion'
import { useMotionPrefs } from '@/lib/use-motion'

/**
 * Shared idle/looping motion wrapper — used by the About stat cards (A2) and the
 * Skills card icons (S3).
 *
 * §6.2 — the loop only runs while the element is on screen: `useInView` (without
 * `once`, since this needs to re-evaluate both ways) gates it, so nothing below
 * the fold burns frames.
 *
 * G5 — when reduced motion is on, `ambient` is false and the element renders at
 * its rest state with no animation at all.
 *
 * Give siblings different `duration`/`delay` values so they never move in
 * lockstep (A2 explicitly requires independent phase per card).
 */
export function IdleMotion({
  children,
  preset,
  duration,
  delay = 0,
  className,
}: {
  children: ReactNode
  preset: IdlePreset
  /** Loop length in seconds — take these from `LOOP` (§7: 15–40s) */
  duration: number
  delay?: number
  className?: string
}) {
  const { ambient } = useMotionPrefs()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.2 })

  const running = ambient && inView

  return (
    <m.div
      ref={ref}
      className={className}
      animate={running ? IDLE[preset] : IDLE_REST[preset]}
      transition={running ? loop(duration, delay) : TRANSITION.instant}
    >
      {children}
    </m.div>
  )
}
