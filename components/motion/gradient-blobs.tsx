'use client'

import { useEffect } from 'react'
import {
  m,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'

import { DISTANCE, LOOP, SPRING, TRANSITION, loop } from '@/lib/motion'
import { useMotionPrefs, usePageVisible } from '@/lib/use-motion'

/**
 * H3 + H4 — the site's gradient blobs.
 *
 * Extracted verbatim out of `app/layout.tsx` so they can animate on the client;
 * the clip paths, gradients, positions and opacities are unchanged.
 *
 * Each blob is three nested elements, because each layer owns one transform and
 * they must not overwrite each other:
 *
 *   1. outer  — the original static `fixed` frame (blur, overflow, z-index)
 *   2. m.div  — H4 mouse parallax, driven by spring-smoothed motion values
 *   3. m.div  — H3 autonomous drift, with a *separate* mirrored loop per axis so
 *               x / y / rotate fall out of phase and the drift reads as organic
 *   4. inner  — the original blob, keeping its own `-translate-x-1/2 rotate-30`
 *               utility classes untouched
 */

const CLIP_PATH =
  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'

const BACKGROUND =
  'linear-gradient(to top right, oklch(0.646 0.222 41.116), oklch(0.488 0.243 264.376))'

function Blob({
  frameClassName,
  blobClassName,
  parallaxX,
  parallaxY,
  /** Flips drift direction so the two blobs never travel together */
  direction,
  ambient,
}: {
  frameClassName: string
  blobClassName: string
  parallaxX: MotionValue<number>
  parallaxY: MotionValue<number>
  direction: 1 | -1
  ambient: boolean
}) {
  const [durX, durY, durRotate] = LOOP.blob

  return (
    <div aria-hidden="true" className={frameClassName}>
      <m.div style={{ x: parallaxX, y: parallaxY }}>
        <m.div
          // Explicit rest state so SSR matches the client's first render once
          // the reduced-motion preference resolves (see lib/motion.ts).
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={
            ambient
              ? {
                  x: DISTANCE.blobDrift * direction,
                  y: -DISTANCE.blobDrift * 0.6 * direction,
                  rotate: DISTANCE.blobRotate * direction,
                }
              : { x: 0, y: 0, rotate: 0 }
          }
          transition={
            ambient
              ? {
                  x: loop(durX),
                  y: loop(durY),
                  rotate: loop(durRotate),
                }
              : TRANSITION.instant
          }
        >
          <div
            style={{ clipPath: CLIP_PATH, background: BACKGROUND }}
            className={blobClassName}
          />
        </m.div>
      </m.div>
    </div>
  )
}

export function GradientBlobs() {
  const { pointerEffects, ambient } = useMotionPrefs()
  const visible = usePageVisible()

  // Cursor position normalised to -1..1 across the viewport.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  useEffect(() => {
    // G6 — never attached on touch devices or under reduced motion, so the
    // values stay at 0 and the blobs simply sit still.
    if (!pointerEffects) return

    const handleMove = (event: MouseEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [pointerEffects, pointerX, pointerY])

  const smoothX = useSpring(pointerX, SPRING.parallax)
  const smoothY = useSpring(pointerY, SPRING.parallax)

  const [nearRate, farRate] = DISTANCE.blobParallax
  // Opposed directions and different magnitudes → depth (H4).
  const topX = useTransform(smoothX, (value) => value * nearRate)
  const topY = useTransform(smoothY, (value) => value * nearRate)
  const bottomX = useTransform(smoothX, (value) => value * -farRate)
  const bottomY = useTransform(smoothY, (value) => value * -farRate)

  // §6.2 — idle loops stop when the tab is not being looked at.
  const ambientOn = ambient && visible

  return (
    <>
      <Blob
        frameClassName="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 h-screen pointer-events-none"
        blobClassName="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] h-screen"
        parallaxX={topX}
        parallaxY={topY}
        direction={1}
        ambient={ambientOn}
      />
      <Blob
        frameClassName="fixed inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] h-screen pointer-events-none"
        blobClassName="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] h-screen"
        parallaxX={bottomX}
        parallaxY={bottomY}
        direction={-1}
        ambient={ambientOn}
      />
    </>
  )
}
