'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import { useMotionPrefs } from '@/lib/use-motion'
import { setLenis } from '@/lib/scroll'

/**
 * G1 — Lenis initialised exactly once at the app root.
 *
 * Touch smoothing is left off (Lenis' default): hijacking touch scroll is the
 * main source of jank on mobile, so phones keep native momentum scrolling while
 * wheel/keyboard scrolling gets the inertial feel.
 *
 * Under reduced motion Lenis is not created at all (G5); anchor navigation then
 * falls back to an instant jump via `scrollToSection`.
 */
export function SmoothScroll() {
  const { reduced } = useMotionPrefs()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    setLenis(lenis)

    return () => {
      setLenis(null)
      lenis.destroy()
    }
  }, [reduced])

  return null
}
