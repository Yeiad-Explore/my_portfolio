'use client'

import { m } from 'motion/react'
import { ChevronDown } from 'lucide-react'

import { DELAY, DISTANCE, LOOP, TRANSITION, loop } from '@/lib/motion'
import { useMotionPrefs } from '@/lib/use-motion'

/**
 * H6 — scroll cue. Fades in ~1s after load, then loops a gentle bounce.
 *
 * Purely decorative (`aria-hidden`, non-interactive): the requirement is to
 * prompt scrolling, and the nav already provides the actual navigation, so this
 * adds no new interactive surface.
 *
 * The fade-in and the bounce live on separate elements so the entrance's y and
 * the loop's y never fight over the same transform. Under reduced motion the
 * entrance degrades to an opacity fade and the bounce is dropped entirely (G5).
 */
export function ScrollCue({ className }: { className?: string }) {
  const { ambient, make } = useMotionPrefs()

  return (
    <m.div
      aria-hidden="true"
      className={className}
      variants={make.fadeUp({ delay: DELAY.scrollCue, distance: 8 })}
      initial="hidden"
      animate="visible"
    >
      <m.span
        className="flex size-9 items-center justify-center rounded-full border border-border/50 bg-background/30 text-muted-foreground backdrop-blur-md"
        // Explicit rest state so SSR matches the client's first render once the
        // reduced-motion preference resolves (see lib/motion.ts).
        initial={{ y: 0 }}
        animate={ambient ? { y: DISTANCE.scrollCueBounce } : { y: 0 }}
        transition={ambient ? loop(LOOP.scrollCue) : TRANSITION.instant}
      >
        <ChevronDown className="size-4" />
      </m.span>
    </m.div>
  )
}
