'use client'

import type { ReactNode } from 'react'
import { useRef } from 'react'
import { m, useMotionValue, useSpring } from 'motion/react'

import { DISTANCE, SPRING } from '@/lib/motion'
import { useMotionPrefs } from '@/lib/use-motion'

/**
 * H5 / C1 — pulls its children toward the cursor, then springs back on leave.
 *
 * The "radius" is the wrapper's own bounds: pointer offset from centre is
 * normalised to ±1 across the element and scaled by `strength`, so the pull
 * grows as the cursor approaches an edge and is strongest at the corners. Hero
 * CTAs use the default strength; Contact rows pass the smaller one per C1.
 *
 * G6 — on touch devices (and under reduced motion) the mouse handlers are never
 * attached, and the element keeps only its tap scale-down, which is the
 * tap-based equivalent the requirement asks for.
 */
export function Magnetic({
  children,
  className,
  strength = DISTANCE.magnetHero,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const { pointerEffects, tap } = useMotionPrefs()
  const ref = useRef<HTMLSpanElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING.magnetic)
  const springY = useSpring(y, SPRING.magnetic)

  const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (!pointerEffects || !ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    const offsetX = (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2)
    const offsetY = (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2)
    x.set(offsetX * strength)
    y.set(offsetY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.span
      ref={ref}
      className={className ? `inline-block ${className}` : 'inline-block'}
      style={{ x: springX, y: springY }}
      onMouseMove={pointerEffects ? handleMouseMove : undefined}
      onMouseLeave={pointerEffects ? handleMouseLeave : undefined}
      {...tap}
    >
      {children}
    </m.span>
  )
}
