'use client'

import { m } from 'motion/react'
import { Moon, Sun } from 'lucide-react'

import { useMotionPrefs } from '@/lib/use-motion'
import { toggleTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

/**
 * Light/dark toggle.
 *
 * Which icon shows is decided entirely by CSS (`dark:` variants), not React
 * state. That is what keeps this hydration-safe: the theme is applied to <html>
 * by a pre-paint script, so if this component rendered from a JS-read theme
 * value its first client render would disagree with the server's.
 *
 * Both icons are always in the DOM; only their opacity/rotation differ, so the
 * swap can animate. The button keeps a single stable `aria-label`, since a label
 * that flipped with the theme would be another render-time dependency.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { tap } = useMotionPrefs()

  return (
    <m.button
      type="button"
      onClick={() => toggleTheme()}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={cn(
        'relative inline-flex size-9 items-center justify-center rounded-md',
        'text-muted-foreground transition-colors hover:text-foreground',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className
      )}
      {...tap}
    >
      <span
        aria-hidden="true"
        className="theme-icon absolute inline-flex opacity-100 dark:opacity-0"
      >
        <Sun className="size-[1.05rem]" />
      </span>
      <span
        aria-hidden="true"
        className="theme-icon absolute inline-flex opacity-0 dark:opacity-100"
      >
        <Moon className="size-[1.05rem]" />
      </span>
    </m.button>
  )
}
