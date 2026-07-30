'use client'

import { m, useScroll, useSpring } from 'motion/react'

import { SPRING } from '@/lib/motion'
import { useMotionPrefs } from '@/lib/use-motion'

/**
 * G2 — thin bar pinned to the top whose scaleX tracks page scroll progress.
 *
 * scaleX (not width) so it composites on the GPU and never triggers layout
 * (§6.2). Under reduced motion the raw progress value is used instead of the
 * spring-smoothed one: the indicator itself is information, but its easing is
 * not, so the smoothing is what gets dropped.
 */
export function ScrollProgress() {
  const { reduced } = useMotionPrefs()
  const { scrollYProgress } = useScroll()
  const smoothed = useSpring(scrollYProgress, SPRING.scrollLinked)
  const scaleX = reduced ? scrollYProgress : smoothed

  return (
    <m.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: '0% 50%',
        background:
          'linear-gradient(to right, oklch(0.646 0.222 41.116), oklch(0.488 0.243 264.376))',
      }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] pointer-events-none"
    />
  )
}
