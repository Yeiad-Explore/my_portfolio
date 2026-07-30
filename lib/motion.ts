/**
 * Single source of truth for site-wide motion (PRD §7).
 *
 * Components must import durations, easings, springs and variant factories from
 * here — no hardcoded duration/easing values in individual components.
 *
 * Every variant factory takes `reduced` as its first argument so that
 * `prefers-reduced-motion` collapses slide/scale/stagger down to a plain
 * opacity fade (G5). Components should not call these directly; use the shared
 * `useMotionPrefs()` hook, which binds them to the user's preference.
 */
import type { Transition, Variants } from 'motion/react'

/* -------------------------------------------------------------------------- */
/*  Durations (§7)                                                            */
/* -------------------------------------------------------------------------- */

export const DURATION = {
  /** Hover states — lift, colour, underline (§7: 0.15–0.25s) */
  hover: 0.2,
  /** Fastest hover accent, e.g. the Services underline grow (SV3) */
  hoverFast: 0.15,
  /** Scroll reveals — fade / slide-up (§7: 0.5–0.7s) */
  reveal: 0.6,
  /** Calmest entrance on the page (C3) */
  revealSlow: 0.7,
  /** Hero entrance (§7: 0.8–1.2s) */
  hero: 1,
  /** Nav shrink / blur cross-fade (G4) */
  nav: 0.35,
  /** Counting stats (R1) */
  count: 1.2,
} as const

/* -------------------------------------------------------------------------- */
/*  Delays                                                                    */
/* -------------------------------------------------------------------------- */

export const DELAY = {
  /** Scroll cue fades in ~1s after load (H6) */
  scrollCue: 1,
  /** Hero description follows the name's character stagger (§5.2) */
  heroDescription: 0.45,
  /** Hero CTAs land last (§5.2) */
  heroActions: 0.6,
  /** Experience bullets start just after the role card has landed (E3) */
  experienceBullets: 0.15,
  /**
   * E4 — extra gap *after* the last bullet before the date appears. The
   * requirement fixes the reading order as role → bullets → date, so this is a
   * trailing gap rather than a delay measured from the title.
   */
  dateBadge: 0.2,
} as const

/* -------------------------------------------------------------------------- */
/*  Stagger steps                                                             */
/* -------------------------------------------------------------------------- */

export const STAGGER = {
  /** Hero name, per character (H1: ~30ms) */
  char: 0.03,
  /** Cards in a grid (S1 / SV1: ~80ms) */
  card: 0.08,
  /** Bullet rows (A4 / E3: ~80ms) */
  bullet: 0.08,
  /** Chart bars (P2: ~30ms) */
  bar: 0.03,
  /** Tag pills (P3) */
  tag: 0.05,
} as const

/* -------------------------------------------------------------------------- */
/*  Ambient / idle loop lengths (§7: 15–40s, easeInOut, mirror)               */
/* -------------------------------------------------------------------------- */

export const LOOP = {
  /** Gradient blob drift, shortest → longest (H3: 20–40s) */
  blob: [22, 31, 38] as const,
  /** Floating stat cards (A2) — different per card so they never sync */
  float: [16, 19.5, 23] as const,
  /**
   * Skills card background icons (S3) — one per card, all distinct so the five
   * cards never drift in unison and never look copy-pasted.
   */
  icon: [17, 20.5, 24, 27.5, 31] as const,
  /**
   * Availability status dot pulse (H2). Deliberately outside the §7 15–40s
   * band: that band describes large ambient drift, whereas a status pulse
   * needs to read as a heartbeat.
   */
  pulse: 2,
  /** Scroll cue bounce (H6) */
  scrollCue: 1.8,
} as const

/* -------------------------------------------------------------------------- */
/*  Easings & springs (§7)                                                    */
/* -------------------------------------------------------------------------- */

export const EASE = {
  out: 'easeOut',
  inOut: 'easeInOut',
} as const

export const SPRING = {
  /** Hover states (§7: stiffness 300–400) */
  hover: { type: 'spring', stiffness: 350, damping: 26 },
  /** Icon / node pop-in (SV2, E2) */
  pop: { type: 'spring', stiffness: 400, damping: 18 },
  /** Hero entrance — low damping for a slight overshoot (§7) */
  hero: { type: 'spring', stiffness: 90, damping: 11, mass: 1 },
  /** Magnetic buttons (§7: stiffness ~150, damping ~15) */
  magnetic: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
  /** 3D card tilt (P1) / stack tilt (A3) */
  tilt: { type: 'spring', stiffness: 200, damping: 22 },
  /** Background blob mouse parallax — deliberately slack, so depth reads as drift (H4) */
  parallax: { type: 'spring', stiffness: 40, damping: 20, mass: 0.6 },
  /** Scroll-linked values: progress bar (G2), timeline draw (E1) */
  scrollLinked: { type: 'spring', stiffness: 180, damping: 40, restDelta: 0.001 },
} as const satisfies Record<string, Transition>

export const TRANSITION = {
  hover: { duration: DURATION.hover, ease: EASE.out },
  hoverFast: { duration: DURATION.hoverFast, ease: EASE.out },
  reveal: { duration: DURATION.reveal, ease: EASE.out },
  revealSlow: { duration: DURATION.revealSlow, ease: EASE.out },
  nav: { duration: DURATION.nav, ease: EASE.out },
  count: { duration: DURATION.count, ease: EASE.out },
  /** Reduced-motion replacement for any layout/spring transition */
  instant: { duration: 0 },
} as const satisfies Record<string, Transition>

/* -------------------------------------------------------------------------- */
/*  Offsets                                                                   */
/* -------------------------------------------------------------------------- */

export const DISTANCE = {
  /** Scroll-reveal slide-up travel */
  revealY: 24,
  /** Hero character rise (H1) */
  charY: 40,
  /** Card hover lift (S2) */
  liftY: -4,
  /** Magnetic pull on hero CTAs (H5) */
  magnetHero: 10,
  /** Magnetic pull on contact rows — "smaller radius" per C1 */
  magnetContact: 6,
  /** Blob mouse parallax, per blob so they move at different rates (H4: ±10–15px) */
  blobParallax: [10, 14] as const,
  /** Ambient blob drift travel (H3) */
  blobDrift: 34,
  /** Ambient blob rotation, degrees (H3) */
  blobRotate: 6,
  /** Scroll cue bounce travel (H6) */
  scrollCueBounce: 6,
  /** Arrow icon nudge on link hover (P4) */
  arrowNudge: 4,
  /** Max tilt in degrees (P1 / A3) */
  tiltDeg: 8,
  /** Nav cross-fade travel (G4) */
  navY: -10,
} as const

/* -------------------------------------------------------------------------- */
/*  Viewport config — all scroll reveals run once (§4)                        */
/* -------------------------------------------------------------------------- */

export const VIEWPORT = { once: true, amount: 0.25 } as const
/** For tall elements that would otherwise never hit 25% */
export const VIEWPORT_EARLY = { once: true, amount: 0.1 } as const

/* -------------------------------------------------------------------------- */
/*  Variant factories                                                         */
/* -------------------------------------------------------------------------- */

type RevealOptions = {
  /** Slide travel in px; ignored under reduced motion */
  distance?: number
  delay?: number
  /** Use the calmer 0.7s reveal (C3) */
  slow?: boolean
}

/*
 * IMPORTANT — why reduced motion changes the *transition* and never the
 * *variant values*.
 *
 * `useReducedMotion()` resolves synchronously during the client's first render,
 * but the server has no media query and always renders as though motion were
 * allowed. So if a `hidden` variant dropped its `y` under reduced motion, the
 * server would emit `transform: translateY(24px)` and the client's hydration
 * render would emit no transform at all — a hydration mismatch on essentially
 * every revealed element on the page.
 *
 * Both variants therefore always declare the same properties, and reduced
 * motion is expressed purely as timing: the transform settles with
 * `duration: 0` while opacity still fades over the full duration. Visually that
 * is exactly what G5 asks for — a simple opacity fade with no perceptible
 * slide or scale — because the transform reaches its resting value on the first
 * frame, before anything is visible.
 */

/**
 * Builds a reveal transition. Under reduced motion the listed transform
 * properties are given `duration: 0` so only opacity actually animates.
 *
 * Exported so components with a bespoke entrance (the footer's blur reveal) can
 * express reduced motion the same way instead of branching on their markup.
 */
export function revealTransition(
  reduced: boolean,
  base: Transition,
  delay: number,
  transformKeys: readonly string[]
): Transition {
  if (!reduced) return { ...base, delay }

  const split: Record<string, unknown> = { opacity: { ...base, delay } }
  for (const key of transformKeys) split[key] = { duration: 0, delay }
  return split as Transition
}

/** The house scroll-reveal: fade + slight slide-up (A1, C3, §6.1). */
export function fadeUp(reduced: boolean, opts: RevealOptions = {}): Variants {
  const { distance = DISTANCE.revealY, delay = 0, slow = false } = opts
  const base = slow ? TRANSITION.revealSlow : TRANSITION.reveal
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: revealTransition(reduced, base, delay, ['y']),
    },
  }
}

/** Card entrance: fade + scale 0.95 → 1 (S1, SV1, §6.1). */
export function fadeScale(reduced: boolean, opts: RevealOptions = {}): Variants {
  const { delay = 0 } = opts
  return {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: revealTransition(reduced, TRANSITION.reveal, delay, ['scale']),
    },
  }
}

/** Spring scale pop-in for icons and timeline nodes (SV2, E2). */
export function popIn(reduced: boolean, opts: { delay?: number } = {}): Variants {
  const { delay = 0 } = opts
  return {
    hidden: { opacity: 0, scale: 0.4 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: reduced
        ? revealTransition(true, TRANSITION.reveal, delay, ['scale'])
        : { ...SPRING.pop, delay },
    },
  }
}

/** Per-character hero reveal: translateY + opacity on a spring (H1). */
export function charIn(reduced: boolean): Variants {
  return {
    hidden: { opacity: 0, y: DISTANCE.charY },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduced
        ? revealTransition(true, TRANSITION.reveal, 0, ['y'])
        : SPRING.hero,
    },
  }
}

/** Generic slide/fade cross-fade, used for the nav states (G4). */
export function slideFade(
  reduced: boolean,
  opts: { y?: number; scale?: number } = {}
): Variants {
  const { y = DISTANCE.navY, scale } = opts
  const transformKeys = scale ? (['y', 'scale'] as const) : (['y'] as const)
  return {
    hidden: { opacity: 0, y, ...(scale ? { scale } : null) },
    visible: {
      opacity: 1,
      y: 0,
      ...(scale ? { scale: 1 } : null),
      transition: revealTransition(reduced, TRANSITION.nav, 0, transformKeys),
    },
  }
}

/**
 * Stagger parent. Children with `hidden`/`visible` variants inherit the label
 * automatically. Under reduced motion the stagger collapses so the group
 * cross-fades as one calm block (G5).
 */
export function staggerParent(
  reduced: boolean,
  each: number = STAGGER.card,
  delayChildren = 0
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : each,
        delayChildren,
      },
    },
  }
}

/** Chart bar grow, expressed as scaleY so no layout is thrashed (P2, §6.2). */
export function barGrow(reduced: boolean): Variants {
  return {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: revealTransition(reduced, TRANSITION.reveal, 0, ['scaleY']),
    },
  }
}

/* -------------------------------------------------------------------------- */
/*  Hover recipes                                                             */
/* -------------------------------------------------------------------------- */

/*
 * Both recipes always return the *same set of props* and express reduced motion
 * as a zero-valued target, never by omitting the prop.
 *
 * That is not cosmetic. Motion adds `tabIndex="0"` to a non-interactive element
 * as soon as it carries `whileTap`, so dropping the prop under reduced motion
 * changes the rendered attributes — and since the preference only resolves on
 * the client, that is a hydration mismatch (see the note above).
 */

/** The house 4px hover lift shared by Skills / Services / Research (S2, R2). */
export function hoverLift(reduced: boolean) {
  return {
    whileHover: { y: reduced ? 0 : DISTANCE.liftY },
    transition: SPRING.hover,
  }
}

/** Slight scale-down on tap — the touch-friendly counterpart to a hover (H5, G6). */
export function tapScale(reduced: boolean) {
  return { whileTap: { scale: reduced ? 1 : 0.97 } }
}

/* -------------------------------------------------------------------------- */
/*  Idle motion presets (A2, S3)                                              */
/* -------------------------------------------------------------------------- */

/**
 * Targets for looping idle motion. Each is animated from rest to the value
 * below and mirrored back, so the listed number is the full travel.
 *
 * S3 asks for per-card motion distinct enough that the cards don't feel
 * copy-pasted, which is why there is a spread of kinds here rather than one
 * float — this is the one place the site deliberately varies its idle motion.
 */
export const IDLE = {
  float: { y: -10 },
  drift: { x: 6, y: -8 },
  rotate: { rotate: 8 },
  sway: { rotate: -6, x: 5 },
  flicker: { opacity: 0.55 },
  breathe: { scale: 1.08 },
} as const

export type IdlePreset = keyof typeof IDLE

/** Rest state for a preset — every property it touches, returned to neutral. */
export const IDLE_REST = {
  float: { y: 0 },
  drift: { x: 0, y: 0 },
  rotate: { rotate: 0 },
  sway: { rotate: 0, x: 0 },
  flicker: { opacity: 1 },
  breathe: { scale: 1 },
} as const

/* -------------------------------------------------------------------------- */
/*  Loops                                                                     */
/* -------------------------------------------------------------------------- */

/** Ambient/idle loop transition: easeInOut, mirrored, infinite (§7). */
export function loop(seconds: number, delay = 0): Transition {
  return {
    duration: seconds,
    ease: EASE.inOut,
    repeat: Infinity,
    repeatType: 'mirror',
    delay,
  }
}

/* -------------------------------------------------------------------------- */
/*  Imperative preference read                                                */
/* -------------------------------------------------------------------------- */

/**
 * Non-hook read of the same media query `useMotionPrefs()` observes, for
 * imperative code paths (e.g. the Lenis anchor-scroll helper) that run outside
 * React render.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
