'use client'

import { m } from 'motion/react'

import { STAGGER } from '@/lib/motion'
import { useMotionPrefs } from '@/lib/use-motion'

/**
 * H1 — splits a heading into characters that stagger in on page load
 * (translateY + opacity, spring easing, ~30ms per character).
 *
 * Accessibility: the visible characters are `aria-hidden`, and the whole string
 * is exposed once via `aria-label`, so screen readers read "Kabid Yeiad" rather
 * than spelling it out letter by letter.
 *
 * Layout: characters are grouped per word inside `whitespace-nowrap` spans, so
 * `inline-block` (required to transform an inline element) cannot cause a word
 * to break across lines. Spaces are rendered as their own non-collapsing span.
 *
 * Under reduced motion the character variant drops translateY and the parent
 * stagger collapses to 0, so the whole heading is a single opacity fade (G5).
 */
export function SplitText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const { variants, stagger } = useMotionPrefs()
  const words = text.split(' ')

  return (
    <m.span
      aria-label={text}
      className={className}
      variants={stagger(STAGGER.char)}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          aria-hidden="true"
          className="inline-block whitespace-nowrap"
        >
          {Array.from(word).map((char, charIndex) => (
            <m.span
              key={`${char}-${charIndex}`}
              variants={variants.charIn}
              className="inline-block"
            >
              {char}
            </m.span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </m.span>
  )
}
