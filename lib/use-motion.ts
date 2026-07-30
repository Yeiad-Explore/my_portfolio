'use client'

/**
 * The single motion-preference hook for the whole site (PRD §4, G5, G6).
 *
 * Every animated component calls `useMotionPrefs()` rather than reading
 * `prefers-reduced-motion` or sniffing touch support itself. It returns:
 *
 *  - `reduced`         — user asked for reduced motion
 *  - `isTouch`         — coarse pointer, no hover
 *  - `pointerEffects`  — may we run mouse-position effects? (parallax, magnetic,
 *                        3D tilt) — false under reduced motion *or* touch (G6)
 *  - `ambient`         — may we run idle/looping decoration? (blobs, floats) — G5
 *  - `variants`        — the shared reveal variants, pre-bound to `reduced`
 *  - `stagger`         — stagger-parent factory, pre-bound to `reduced`
 *  - `lift` / `tap`    — the shared hover/tap recipes
 */

import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import {
  barGrow,
  charIn,
  fadeScale,
  fadeUp,
  hoverLift,
  loop,
  popIn,
  slideFade,
  staggerParent,
  tapScale,
  STAGGER,
  VIEWPORT,
  VIEWPORT_EARLY,
} from './motion'

/** Coarse-pointer / hover-less device check (G6). SSR-safe: starts `false`. */
function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (!window.matchMedia) return
    const query = window.matchMedia('(hover: none) and (pointer: coarse)')
    const update = () => setIsTouch(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isTouch
}

/**
 * Whether the tab is currently visible (§6.2).
 *
 * This is the meaningful "off-screen" test for the gradient blobs: they are
 * `position: fixed` background elements, so they never scroll below the fold and
 * `whileInView` would always be true. Note that browsers already suspend
 * requestAnimationFrame in hidden tabs, so this is an explicit belt-and-braces
 * gate rather than the only thing stopping the work.
 */
export function usePageVisible(): boolean {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const update = () => setVisible(document.visibilityState === 'visible')
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  return visible
}

export function useMotionPrefs() {
  const prefersReduced = useReducedMotion()
  const reduced = prefersReduced === true
  const isTouch = useIsTouchDevice()

  return useMemo(() => {
    return {
      reduced,
      isTouch,
      /** Mouse-position driven effects allowed? (G5 + G6) */
      pointerEffects: !reduced && !isTouch,
      /** Idle / looping decorative animation allowed? (G5) */
      ambient: !reduced,

      viewport: VIEWPORT,
      viewportEarly: VIEWPORT_EARLY,

      variants: {
        fadeUp: fadeUp(reduced),
        fadeUpCalm: fadeUp(reduced, { slow: true }),
        fadeScale: fadeScale(reduced),
        popIn: popIn(reduced),
        charIn: charIn(reduced),
        barGrow: barGrow(reduced),
      },

      /** Escape hatches for the few places that need a custom delay/distance. */
      make: {
        fadeUp: (opts?: Parameters<typeof fadeUp>[1]) => fadeUp(reduced, opts),
        fadeScale: (opts?: Parameters<typeof fadeScale>[1]) =>
          fadeScale(reduced, opts),
        popIn: (opts?: Parameters<typeof popIn>[1]) => popIn(reduced, opts),
        slideFade: (opts?: Parameters<typeof slideFade>[1]) =>
          slideFade(reduced, opts),
      },

      stagger: (each: number = STAGGER.card, delayChildren = 0) =>
        staggerParent(reduced, each, delayChildren),

      lift: hoverLift(reduced),
      tap: tapScale(reduced),

      /** Ambient loop transition, or `undefined` when loops are disabled (G5). */
      loop: (seconds: number, delay = 0) =>
        reduced ? undefined : loop(seconds, delay),
    }
  }, [reduced, isTouch])
}

export type MotionPrefs = ReturnType<typeof useMotionPrefs>
