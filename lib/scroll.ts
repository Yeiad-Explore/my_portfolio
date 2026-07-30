'use client'

/**
 * Lenis singleton access + the shared anchor-scroll helper (G1).
 *
 * The instance is owned by <SmoothScroll /> at the app root. Anchor clicks go
 * through `scrollToSection` so they are driven by Lenis instead of fighting it
 * with native `scroll-behavior: smooth`.
 */

import type Lenis from 'lenis'
import { prefersReducedMotion } from './motion'

let instance: Lenis | null = null

export function setLenis(next: Lenis | null) {
  instance = next
}

export function getLenis() {
  return instance
}

/**
 * Scroll to an in-page anchor. Falls back to native scrolling when Lenis is not
 * running (which is the case under reduced motion), and to an instant jump when
 * the user asked for reduced motion.
 */
export function scrollToSection(href: string) {
  const id = href.replace(/^#/, '')
  if (!id) return

  const target = document.getElementById(id)
  if (!target) return

  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(target)
    return
  }

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
}
