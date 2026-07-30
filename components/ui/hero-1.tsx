'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { m, useInView } from 'motion/react'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { SplitText } from '@/components/motion/split-text'
import { Magnetic } from '@/components/motion/magnetic'
import { ScrollCue } from '@/components/motion/scroll-cue'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'
import { DELAY, LOOP, SPRING, TRANSITION, loop } from '@/lib/motion'
import { useMotionPrefs } from '@/lib/use-motion'
import { useActiveSection } from '@/lib/use-active-section'
import { scrollToSection } from '@/lib/scroll'

import { Menu, X } from 'lucide-react'

/** G4 — nav switches to its compact, blurred state past this scroll offset. */
const NAV_SCROLL_THRESHOLD = 80

// Dynamically import Antigravity to avoid SSR issues with Three.js
const Antigravity = dynamic(() => import('@/components/ui/Antigravity'), {
  ssr: false,
})

interface NavigationItem {
  name: string
  href: string
}

interface AnnouncementBanner {
  text: string
  linkText: string
  linkHref: string
}

interface CallToAction {
  text: string
  href: string
  variant: 'primary' | 'secondary'
}

interface HeroLandingProps {
  // Logo and branding
  logo?: {
    src: string
    alt: string
    companyName: string
  }
  
  // Navigation
  navigation?: NavigationItem[]
  loginText?: string
  loginHref?: string
  
  // Hero content
  title: string
  description: string
  subtitle?: string
  announcementBanner?: AnnouncementBanner
  callToActions?: CallToAction[]
  
  // Styling options
  titleSize?: 'small' | 'medium' | 'large'
  gradientColors?: {
    from: string
    to: string
  }
  
  // Additional customization
  className?: string
}

const defaultProps: Partial<HeroLandingProps> = {
  logo: {
    src: "/Gemini_Generated_Image_r6j89cr6j89cr6j8.png",
    alt: "Portfolio Logo",
    companyName: "Kabid Yeiad"
  },
  navigation: [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ],
  loginText: "Resume",
  loginHref: "#resume",
  titleSize: "large",
  gradientColors: {
    from: "oklch(0.646 0.222 41.116)",
    to: "oklch(0.488 0.243 264.376)"
  },
  callToActions: [
    { text: "View Projects", href: "#projects", variant: "primary" },
    { text: "Get in Touch", href: "#contact", variant: "secondary" }
  ]
}

/**
 * Nav links with the sliding active-state pill (G3).
 *
 * The pill is a single `m.span` mounted on whichever link is active, so Framer
 * Motion's shared-layout animation slides it between links instead of fading it
 * in and out. `layoutGroup` scopes the `layoutId`: the full nav and the compact
 * scrolled nav are both mounted at all times, so they need separate groups to
 * avoid two elements claiming the same layoutId.
 *
 * Per §6.3 the pill is not the only signal — the active link is also the only
 * full-contrast one, and carries `aria-current`, so state survives reduced
 * motion.
 */
function NavLinks({
  items,
  activeId,
  layoutGroup,
  onNavigate,
}: {
  items: NavigationItem[]
  activeId: string
  layoutGroup: string
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}) {
  const { reduced } = useMotionPrefs()

  return (
    <>
      {items.map((item) => {
        const isActive = item.href.replace('#', '') === activeId

        return (
          <a
            key={item.name}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            onClick={(e) => onNavigate(e, item.href)}
            className={cn(
              'relative text-sm/6 font-semibold transition-all duration-300 group px-3 py-2 rounded-lg',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {isActive && (
              <m.span
                layoutId={`${layoutGroup}-nav-active`}
                aria-hidden="true"
                className="absolute inset-0 z-0 rounded-lg bg-primary/10 ring-1 ring-primary/20"
                transition={reduced ? TRANSITION.instant : SPRING.hover}
              />
            )}
            <span className="relative z-10">{item.name}</span>
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-0"></span>
            <span className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
          </a>
        )
      })}
    </>
  )
}

export function HeroLanding(props: HeroLandingProps) {
  const {
    logo,
    navigation,
    loginText,
    loginHref,
    title,
    description,
    subtitle,
    announcementBanner,
    callToActions,
    titleSize,
    gradientColors,
    className
  } = { ...defaultProps, ...props }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { make, ambient } = useMotionPrefs()

  // §6.2 — used to park the WebGL particle loop once the hero leaves the screen.
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { amount: 0.1 })

  // G3 — which section the reader is currently in. No memo needed: the hook
  // keys its effect off the joined ids, not the array identity.
  const activeId = useActiveSection(
    (navigation ?? []).map((item) => item.href.replace('#', ''))
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > NAV_SCROLL_THRESHOLD)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    // Routed through Lenis so anchor jumps share the page's scroll feel (G1).
    scrollToSection(href)

    // Close mobile menu if open
    setMobileMenuOpen(false)
  }

  // G4 — the two nav states cross-fade with motion rather than a CSS snap. The
  // compact state also shrinks (tighter padding + a scale settle).
  const navBarVariants = make.slideFade()
  const navPillVariants = make.slideFade({ scale: 0.96 })

  const getTitleSizeClasses = () => {
    switch (titleSize) {
      case 'small':
        return 'text-2xl sm:text-3xl md:text-5xl'
      case 'medium':
        return 'text-2xl sm:text-4xl md:text-6xl'
      case 'large':
      default:
        return 'text-3xl sm:text-5xl md:text-7xl'
    }
  }

  // H5 — every CTA gets the magnetic pull + tap scale-down. The <a> markup and
  // its classes are unchanged; <Magnetic> only adds a transform wrapper, so the
  // links stay keyboard-focusable with their existing focus ring.
  const renderCallToAction = (cta: CallToAction, index: number) => {
    if (cta.variant === 'primary') {
      return (
        <Magnetic key={index}>
          <a
            href={cta.href}
            onClick={(e) => handleSmoothScroll(e, cta.href)}
            className="inline-block rounded-lg bg-primary px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-colors"
          >
            {cta.text}
          </a>
        </Magnetic>
      )
    } else {
      return (
        <Magnetic key={index}>
          <a
            href={cta.href}
            onClick={(e) => handleSmoothScroll(e, cta.href)}
            className="inline-block text-xs sm:text-sm/6 font-semibold text-foreground hover:text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"
          >
            {cta.text} <span aria-hidden="true">→</span>
          </a>
        </Magnetic>
      )
    }
  }

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden relative ${className || ''}`}>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Scrolled state - fixed centered nav.
            The positioning transform lives on a plain wrapper so Framer Motion
            owns the animated element's transform outright (no -translate-x-1/2
            class being clobbered by inline transforms). */}
        {navigation && navigation.length > 0 && (
          <div className="hidden lg:block fixed top-4 left-1/2 -translate-x-1/2 pointer-events-none">
            <m.div
              initial={false}
              animate={isScrolled ? 'visible' : 'hidden'}
              variants={navPillVariants}
              aria-hidden={!isScrolled}
              // `inert` is what actually takes this out of the tab order and the
              // accessibility tree. Both nav states stay mounted so they can
              // cross-fade, and opacity:0 + pointer-events-none leaves their
              // links and buttons focusable — meaning a keyboard user could tab
              // into an invisible nav. (aria-hidden alone is not enough, and
              // focusable content inside aria-hidden is itself a violation.)
              inert={!isScrolled}
              className={cn(
                'flex lg:gap-x-8 xl:gap-x-12 px-5 py-2 rounded-full backdrop-blur-md bg-background/60 border border-border/50 shadow-lg',
                isScrolled ? 'pointer-events-auto' : 'pointer-events-none'
              )}
            >
              <NavLinks
                items={navigation}
                activeId={activeId}
                layoutGroup="compact"
                onNavigate={handleSmoothScroll}
              />
              {/* Kept reachable in the compact nav too — once scrolled past the
                  hero, this is the only nav on screen. */}
              <span className="ml-1 flex items-center border-l border-rule pl-2">
                <ThemeToggle />
              </span>
            </m.div>
          </div>
        )}

        {/* Normal state - full nav bar */}
        <m.nav
          aria-label="Global"
          initial={false}
          animate={isScrolled ? 'hidden' : 'visible'}
          variants={navBarVariants}
          aria-hidden={isScrolled}
          // See the note on the compact nav above — the same applies in reverse
          // once this state has faded out.
          inert={isScrolled}
          className={cn(
            'flex items-center justify-between p-4 sm:p-6 lg:px-8 max-w-7xl mx-auto',
            isScrolled ? 'pointer-events-none' : 'pointer-events-auto'
          )}
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">{logo?.companyName}</span>
              <img
                alt={logo?.alt}
                src={logo?.src}
                className="h-6 sm:h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </div>
          {navigation && navigation.length > 0 && (
            <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-12 px-6 py-3 rounded-full backdrop-blur-md bg-background/60 border border-border/50 shadow-lg">
              <NavLinks
                items={navigation}
                activeId={activeId}
                layoutGroup="full"
                onNavigate={handleSmoothScroll}
              />
            </div>
          )}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-2">
            {loginText && loginHref && (
              <a
                href={loginHref}
                onClick={(e) => handleSmoothScroll(e, loginHref)}
                className="relative text-sm/6 font-semibold text-foreground transition-all duration-300 group px-4 py-2 rounded-lg"
              >
                <span className="relative z-10">{loginText} <span aria-hidden="true">&rarr;</span></span>
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-0"></span>
                <span className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
              </a>
            )}
            <ThemeToggle />
          </div>
        </m.nav>
        <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <DialogContent className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-card px-4 py-4 sm:px-6 sm:py-6 sm:max-w-sm sm:ring-1 sm:ring-border lg:hidden !left-auto !top-0 !translate-x-0 !translate-y-0 max-w-sm h-full rounded-none data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">{logo?.companyName}</span>
                <img
                  alt={logo?.alt}
                  src={logo?.src}
                  className="h-6 sm:h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-2 flow-root">
              <div className="-my-6 divide-y divide-border">
                {navigation && navigation.length > 0 && (
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => {
                      // No sliding pill on mobile — a static marker only, so the
                      // active state never depends on motion (§6.3).
                      const isActive = item.href.replace('#', '') === activeId
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={(e) => handleSmoothScroll(e, item.href)}
                          className={cn(
                            '-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-accent hover:text-accent-foreground transition-colors',
                            isActive
                              ? 'bg-primary/10 text-card-foreground ring-1 ring-primary/20'
                              : 'text-card-foreground'
                          )}
                        >
                          {item.name}
                        </a>
                      )
                    })}
                  </div>
                )}
                {loginText && loginHref && (
                  <div className="py-6">
                    <a
                      href={loginHref}
                      onClick={(e) => handleSmoothScroll(e, loginHref)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {loginText}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>
      <div
        ref={heroRef}
        className="relative isolate px-6 pt-4 overflow-hidden min-h-screen flex flex-col justify-center"
      >
        {/* Antigravity background effect.
            G5 + §6.2 — this is a continuous WebGL simulation, so it is switched
            to R3F's on-demand render loop when reduced motion is requested or
            when the hero has scrolled out of view. Without this it would keep
            simulating 300 particles for the entire length of the page. */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60">
          <Antigravity
            frameloop={ambient && heroInView ? 'always' : 'demand'}
            count={300}
            magnetRadius={6}
            ringRadius={7}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={1.5}
            lerpSpeed={0.05}
            color={'#FF9FFC'}
            autoAnimate={true}
            particleVariance={1}
          />
        </div>
        
        <div className="mx-auto max-w-4xl -mt-16 sm:-mt-12 pt-0 sm:pt-2 relative z-10">
          {/* Announcement banner */}
          {announcementBanner && (
            <div className="hidden sm:mb-4 sm:flex sm:justify-center relative z-20">
              <div className="relative inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs sm:px-3 sm:text-sm/6 text-muted-foreground ring-1 ring-border/50 hover:ring-border transition-all bg-background/20 backdrop-blur-md shadow-lg border border-white/10">
                {/* H2 — only the status dot loops; the rest of the badge is static. */}
                <m.span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-emerald-500"
                  // Explicit `initial` so the server and the client's first
                  // render agree: without it Motion uses the `animate` target as
                  // the initial style, which differs once reduced motion
                  // resolves on the client and breaks hydration.
                  initial={{ scale: 1, opacity: 1 }}
                  animate={ambient ? { scale: 1.6, opacity: 0.45 } : { scale: 1, opacity: 1 }}
                  transition={ambient ? loop(LOOP.pulse) : TRANSITION.instant}
                />
                {announcementBanner.text}{' '}
                <a href={announcementBanner.linkHref} className="font-semibold text-primary hover:text-primary/80 transition-colors">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {announcementBanner.linkText} <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          )}
          
          <div className="text-center">
            {/* H1 — name splits into characters and staggers in on load. */}
            <h1 className={`${getTitleSizeClasses()} font-semibold tracking-tight text-balance text-foreground hero-title-large`}>
              <SplitText text={title} />
            </h1>
            {/* The supporting copy trails the name so the hero lands as one
                sequence (§7 "Hero entrance"), using the shared fade-up. */}
            <m.p
              className="mt-6 sm:mt-8 text-lg sm:text-xl font-semibold text-pretty text-foreground sm:text-2xl/8"
              variants={make.fadeUp({ delay: DELAY.heroDescription })}
              initial="hidden"
              animate="visible"
            >
              {description}
            </m.p>
            {subtitle && (
              <m.p
                className="mt-4 sm:mt-6 text-base sm:text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8 max-w-3xl mx-auto"
                variants={make.fadeUp({ delay: DELAY.heroDescription })}
                initial="hidden"
                animate="visible"
              >
                {subtitle}
              </m.p>
            )}

            {/* Call to action buttons */}
            {callToActions && callToActions.length > 0 && (
              <m.div
                className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6"
                variants={make.fadeUp({ delay: DELAY.heroActions })}
                initial="hidden"
                animate="visible"
              >
                {callToActions.map((cta, index) => renderCallToAction(cta, index))}
              </m.div>
            )}
          </div>
        </div>

        {/* H6 — scroll cue. Centring lives on this wrapper so the cue's own
            transforms (entrance slide + bounce loop) are not overwritten. */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <ScrollCue />
        </div>
      </div>
    </div>
  )
}

// Export types for consumers
export type { HeroLandingProps, NavigationItem, AnnouncementBanner, CallToAction }

