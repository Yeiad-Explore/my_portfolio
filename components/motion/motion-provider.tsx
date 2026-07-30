'use client'

import type { ReactNode } from 'react'
import { LazyMotion } from 'motion/react'

import { ScrollProgress } from './scroll-progress'
import { SmoothScroll } from './smooth-scroll'

/**
 * App-root motion shell (§4): LazyMotion feature loading, Lenis smooth scroll
 * (G1) and the scroll progress bar (G2).
 *
 * `features` is an async loader so the animation feature bundle is code-split
 * out of the initial payload. Until it resolves, `m.*` elements render their
 * `initial` variant statically — so there is no flash of un-styled, fully
 * visible content.
 */
const loadFeatures = () =>
  import('@/lib/motion-features').then((mod) => mod.default)

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures}>
      <SmoothScroll />
      <ScrollProgress />
      {children}
    </LazyMotion>
  )
}
