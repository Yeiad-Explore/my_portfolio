# PRD: Portfolio Motion Redesign

**Owner:** Kabid Yeiad
**Status:** Ready for implementation
**Target:** Existing portfolio site (React-based, sections: Nav, Hero, About, Skills, Services, Experience, Projects, Research, Contact)

---

## 1. Problem Statement

The current site has strong visual bones (gradient-blob backgrounds, card-based layout, pill nav) but is static — nothing moves on load, scroll, or hover. Compared to modern portfolio sites, it reads as a well-designed static page rather than a designed *experience*. The goal is to add a motion layer using Framer Motion that makes the site feel alive and premium, without turning it into animation-for-its-own-sake.

## 2. Goals

- Add scroll-triggered reveals, hover micro-interactions, and one or two signature moments (hero, experience timeline) using Framer Motion.
- Keep motion consistent site-wide (shared timing/easing values), not ad-hoc per component.
- Ship something that performs well and degrades gracefully (reduced motion, mobile/touch).

## 3. Non-Goals

- No visual/layout redesign — colors, spacing, copy, and component structure stay as-is unless motion requires a small structural change (e.g., splitting a heading into spans for stagger).
- No CMS, backend, or content changes.
- No animation library other than Framer Motion + Lenis (no GSAP) unless a specific requirement below can't be met with them.
- Not every section needs a unique animation — most sections reuse the same small set of patterns (see §6.1).

## 4. Tech Stack & Architecture Requirements

- `framer-motion` (`motion/react`), wrapped in `LazyMotion` + `domAnimation` to control bundle size.
- `lenis` for smooth/inertial scrolling.
- A single shared **motion constants file** (e.g. `lib/motion.ts`) exporting reusable variants, durations, and easings (see §7 timing table) — no hardcoded duration/easing values scattered across components.
- A single `useReducedMotion()`-aware wrapper or hook used by every animated component — not reimplemented per section.
- All scroll-triggered reveals use `viewport={{ once: true }}` unless a requirement explicitly needs re-triggering.

## 5. Functional Requirements

### 5.1 Global (applies to every page)

| # | Requirement | Acceptance Criteria |
|---|---|---|
| G1 | Smooth scroll | Lenis initialized once at app root; scroll feels inertial, no jank on mobile |
| G2 | Scroll progress indicator | Thin bar pinned to top, width/scaleX tracks `scrollYProgress` of the full page |
| G3 | Nav active-state | Active nav item shows a pill/underline that **slides** (via shared `layoutId`) to the new item on section change, not fade/snap |
| G4 | Nav scroll behavior | Nav shrinks and/or gains a blurred background after ~80px scroll, animated not instant |
| G5 | Reduced motion | With `prefers-reduced-motion: reduce`, all entrance/scroll animations fall back to a simple opacity fade (no slide/scale/parallax), and all idle/looping animations (blobs, floating cards) are disabled entirely |
| G6 | Touch/mobile | Mouse-based effects (parallax, magnetic buttons, 3D tilt) are disabled or replaced with a static/tap-based equivalent on touch devices |

### 5.2 Hero

| # | Requirement | Acceptance Criteria |
|---|---|---|
| H1 | Name reveal | "Kabid Yeiad" splits into characters and staggers in (translateY + opacity) on page load, spring easing, stagger ~30ms/char |
| H2 | Availability badge | The status dot pulses in a continuous loop (scale/opacity); the rest of the badge is static |
| H3 | Gradient blobs — ambient | Blobs drift autonomously (x/y/rotate keyframes, 20–40s loop, mirror repeat) |
| H4 | Gradient blobs — parallax | On mouse move, blobs offset slightly (±10–15px) at different rates, creating a depth effect; disabled per G6 on touch |
| H5 | CTA buttons | "View My Work" and secondary links pull toward the cursor within a small radius (magnetic effect) and scale down slightly on tap |
| H6 | Scroll cue | A small indicator fades in ~1s after load and loops a gentle bounce, prompting the user to scroll |

### 5.3 About

| # | Requirement | Acceptance Criteria |
|---|---|---|
| A1 | Copy reveal | Paragraph reveals on scroll into view (fade + slight slide-up) |
| A2 | Floating stat cards | Each of the 3 stacked cards has an independent idle float (different phase/duration per card so they don't sync) |
| A3 | Stack parallax tilt | On mouse move over the card stack, cards tilt slightly (rotateX/rotateY) toward cursor position |
| A4 | Bullet icons | Icon + text rows stagger in under the paragraph, ~80ms apart |

### 5.4 Skills & Expertise

| # | Requirement | Acceptance Criteria |
|---|---|---|
| S1 | Card entrance | Bento cards fade + scale in (0.95→1) on scroll, staggered ~80ms |
| S2 | Card hover | Card lifts (~4px), shadow increases, transition ≤250ms |
| S3 | Icon idle motion | Each card's background icon has a small continuous or hover-triggered motion (rotate/drift/flicker) distinct enough per card that they don't feel copy-pasted |

### 5.5 Services

| # | Requirement | Acceptance Criteria |
|---|---|---|
| SV1 | Card entrance | Same stagger pattern as Skills cards, for visual consistency |
| SV2 | Icon pop-in | Icon scales in with a spring when the card enters view |
| SV3 | Hover accent | An underline/accent bar grows left-to-right under the title on hover |

### 5.6 Experience (signature section #2)

| # | Requirement | Acceptance Criteria |
|---|---|---|
| E1 | Self-drawing timeline | The vertical connector line's `scaleY` (origin: top) is driven by scroll progress through the section, so it visibly "draws" as the user scrolls |
| E2 | Node pop-in | Each role's icon badge pops in (spring scale) at the scroll position where the line reaches it — not on a fixed delay |
| E3 | Bullet stagger | Bullet points under each role stagger in after the role card appears |
| E4 | Date badge | Date fades in with a small delay after the role title, so reading order is role → bullets → date |

### 5.7 Projects

| # | Requirement | Acceptance Criteria |
|---|---|---|
| P1 | 3D tilt | Card tilts (rotateX/rotateY) following cursor position within the card, damped with a spring; disabled on touch per G6 |
| P2 | Chart bars | Mini bar charts animate from `height: 0` to full height on scroll into view, bars staggered ~30ms apart |
| P3 | Tags | Tag pills stagger in under the description |
| P4 | GitHub link | Arrow icon nudges right a few px on hover; text underline draws in |
| P5 (stretch) | Detail view | If a project detail modal/page is added, the card morphs into it via a shared `layoutId` rather than a plain fade/route change |

### 5.8 Research / Academic Contributions

| # | Requirement | Acceptance Criteria |
|---|---|---|
| R1 | Counting stats | The 3 stat numbers (publications, citations, year) animate counting up from 0 when scrolled into view, ~1.2s, ease-out, run once |
| R2 | Card hover | Same lift treatment as Skills/Services cards |

### 5.9 Contact

| # | Requirement | Acceptance Criteria |
|---|---|---|
| C1 | Contact rows | Icon containers have a small magnetic hover pull (same recipe as Hero, smaller radius) |
| C2 | Primary button | "Hire Me for AI Projects" hover fills/sweeps in from one side rather than an instant color change |
| C3 | Section entrance | Whole section fades/slides up on scroll — deliberately the calmest entrance on the page |

## 6. Design Constraints

### 6.1 Consistency over novelty
Reuse the same handful of patterns (fade-up reveal, 4px hover lift, staggered children) across Skills/Services/Research/Contact. Reserve genuinely unique treatments for Hero (5.2) and Experience (5.6) only. If most sections end up with a bespoke animation, that's a signal to simplify, not a feature.

### 6.2 Performance
- No animation should cause layout thrash — animate `transform`/`opacity` only, never `top`/`left`/`width`/`height` directly (chart bars in P2 are the one exception; use `scaleY` with a fixed max height instead if possible).
- Idle/looping animations (blobs, floating cards) must be paused or removed when off-screen (`whileInView`/visibility check) to avoid wasting cycles below the fold.

### 6.3 Accessibility
- Every animated element remains keyboard-focusable with a visible focus ring; motion must not be the only way to perceive state (e.g., active nav item needs a visual marker beyond the sliding pill, in case that animation is reduced).
- `prefers-reduced-motion` fully respected per G5.

## 7. Shared Timing Table

To be implemented as constants in `lib/motion.ts`, not hardcoded per component.

| Interaction | Duration | Easing |
|---|---|---|
| Hover states (lift, color, underline) | 0.15–0.25s | `easeOut` or spring (stiffness 300–400) |
| Scroll reveals (fade/slide-up) | 0.5–0.7s | `easeOut`, children stagger 0.05–0.1s |
| Hero entrance | 0.8–1.2s | spring, low damping (slight overshoot) |
| Ambient/idle loops | 15–40s | `easeInOut`, `repeatType: mirror` |
| Magnetic buttons | spring, stiffness ~150, damping ~15 | |

## 8. Phased Rollout

1. **Phase 1 — Infrastructure:** Lenis, `lib/motion.ts` constants, reduced-motion hook, nav scroll/active-pill behavior, scroll progress bar.
2. **Phase 2 — Hero:** name reveal, blobs (ambient + parallax), magnetic CTAs, scroll cue.
3. **Phase 3 — Standard sections:** About, Skills, Services, Research, Contact using the shared reveal/hover patterns.
4. **Phase 4 — Signature interactions:** Experience self-drawing timeline, Project 3D tilt + chart bar animation + counters.
5. **Phase 5 — QA pass:** reduced-motion check, mobile/touch check, performance check (no layout thrash, blobs paused off-screen).

## 9. Definition of Done

- Every requirement in §5 implemented and matches its acceptance criteria.
- `prefers-reduced-motion` verified in browser dev tools to disable all non-essential motion.
- Site tested on a touch device (or emulated) — no broken hover-only interactions.
- No new console errors/warnings; no layout-shift introduced by entrance animations (test with Lighthouse/CLS).

## 10. Open Questions

- Is a Projects detail modal (P5) in scope for this pass, or a later one? Defaults to **out of scope** unless confirmed.
- Any brand preference for the magnetic-button pull radius/strength, or default to the values in §7?
