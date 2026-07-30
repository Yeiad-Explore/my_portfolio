'use client'

import type { ReactNode } from 'react'
import { useRef } from 'react'
import { m, useMotionValue, useSpring, useTransform } from 'motion/react'

import { DISTANCE, SPRING } from '@/lib/motion'
import { useMotionPrefs } from '@/lib/use-motion'

/**
 * Shared cursor-following 3D tilt — used by the About card stack (A3) and, in
 * Phase 4, the Project cards (P1).
 *
 * Pointer position within the element is normalised to ±1 and mapped to
 * rotateX/rotateY so the surface leans *toward* the cursor (hence the inverted
 * X axis), damped by `SPRING.tilt`.
 *
 * G6 — on touch devices and under reduced motion the handlers are never
 * attached, so the content simply sits flat with no perspective applied.
 */
export function Tilt({
  children,
  className,
  innerClassName,
  maxDeg = DISTANCE.tiltDeg,
  perspective = 1000,
}: {
  children: ReactNode
  className?: string
  /** Applied to the rotating element — needed to pass height through a
      stretched grid/flex item down to the child (e.g. `h-full`). */
  innerClassName?: string
  maxDeg?: number
  perspective?: number
}) {
  const { pointerEffects } = useMotionPrefs()
  const ref = useRef<HTMLDivElement>(null)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, SPRING.tilt)
  const smoothY = useSpring(pointerY, SPRING.tilt)

  // Lean toward the cursor: cursor below centre tips the top away from us.
  const rotateX = useTransform(smoothY, (value) => -value * maxDeg)
  const rotateY = useTransform(smoothX, (value) => value * maxDeg)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    pointerX.set((event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2))
    pointerY.set((event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2))
  }

  const handleMouseLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  // The rendered tree is identical whether or not tilt is active — only the
  // handlers are attached conditionally. Swapping the markup instead would make
  // the client's first render disagree with the server once the reduced-motion
  // preference resolves (see the note in lib/motion.ts). With no handlers the
  // springs never leave 0, so the card simply sits flat.
  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective }}
      onMouseMove={pointerEffects ? handleMouseMove : undefined}
      onMouseLeave={pointerEffects ? handleMouseLeave : undefined}
    >
      <m.div
        className={innerClassName}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {children}
      </m.div>
    </div>
  )
}
