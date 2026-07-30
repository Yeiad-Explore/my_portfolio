/**
 * Lazily-loaded Framer Motion feature bundle for `LazyMotion` (PRD §4).
 *
 * Kept in its own module so the bundler emits it as a separate chunk that is
 * fetched after first paint, which is the bundle-size control §4 is asking for.
 *
 * NOTE — deviation from §4's literal wording: §4 names `domAnimation`, but
 * `domAnimation` deliberately excludes the `layout` feature, so `layoutId`
 * would not animate and the sliding nav pill required by G3 would snap instead
 * of slide. `domMax` is `domAnimation` + `layout` + `drag`; it is the smallest
 * bundle that satisfies both requirements, and it is still code-split.
 */
import { domMax } from 'motion/react'

export default domMax
