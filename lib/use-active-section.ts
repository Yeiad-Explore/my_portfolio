'use client'

/**
 * Tracks which section id is currently under the reading line, so the nav can
 * slide its active pill to it (G3).
 *
 * A narrow observer band (~45–50% of the viewport height) means at most one
 * section qualifies at a time; when nothing qualifies — between sections, or
 * down in the footer — the last active id is kept rather than clearing, so the
 * pill never flickers away.
 */

import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')
  const key = ids.join(',')

  useEffect(() => {
    const sectionIds = key.split(',').filter(Boolean)
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const next = sectionIds.find((id) => visible.has(id))
        if (next) setActive(next)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}
