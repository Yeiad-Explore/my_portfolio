'use client'

import { useState, useEffect } from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'

import { Menu, X } from 'lucide-react'

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const renderCallToAction = (cta: CallToAction, index: number) => {
    if (cta.variant === 'primary') {
      return (
        <a
          key={index}
          href={cta.href}
          className="rounded-lg bg-primary px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-colors"
        >
          {cta.text}
        </a>
      )
    } else {
      return (
        <a
          key={index}
          href={cta.href}
          className="text-xs sm:text-sm/6 font-semibold text-foreground hover:text-muted-foreground transition-colors"
        >
          {cta.text} <span aria-hidden="true">→</span>
        </a>
      )
    }
  }

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden relative ${className || ''}`}>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Scrolled state - fixed centered nav */}
        {navigation && navigation.length > 0 && (
          <div className={`hidden lg:flex lg:gap-x-8 xl:gap-x-12 px-6 py-3 rounded-full backdrop-blur-md bg-background/60 border border-border/50 shadow-lg transition-all duration-300 fixed top-4 left-1/2 -translate-x-1/2 ${
            isScrolled ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}>
            {navigation.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="relative text-sm/6 font-semibold text-foreground transition-all duration-300 group px-3 py-2 rounded-lg"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-0"></span>
                <span className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
              </a>
            ))}
          </div>
        )}
        
        {/* Normal state - full nav bar */}
        <nav aria-label="Global" className={`flex items-center justify-between p-4 sm:p-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
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
          <div className="flex lg:hidden">
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
              {navigation.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="relative text-sm/6 font-semibold text-foreground transition-all duration-300 group px-3 py-2 rounded-lg"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-0"></span>
                  <span className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                </a>
              ))}
            </div>
          )}
          {loginText && loginHref && (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a 
                href={loginHref} 
                className="relative text-sm/6 font-semibold text-foreground transition-all duration-300 group px-4 py-2 rounded-lg"
              >
                <span className="relative z-10">{loginText} <span aria-hidden="true">&rarr;</span></span>
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-0"></span>
                <span className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
              </a>
            </div>
          )}
        </nav>
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
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
                {loginText && loginHref && (
                  <div className="py-6">
                    <a
                      href={loginHref}
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
      <div className="relative isolate px-6 pt-4 overflow-hidden min-h-screen flex flex-col justify-center">        
        <div className="mx-auto max-w-4xl -mt-16 sm:-mt-12 pt-0 sm:pt-2 relative z-10">
          {/* Announcement banner */}
          {announcementBanner && (
            <div className="hidden sm:mb-4 sm:flex sm:justify-center relative z-20">
              <div className="relative rounded-full px-2 py-1 text-xs sm:px-3 sm:text-sm/6 text-muted-foreground ring-1 ring-border/50 hover:ring-border transition-all bg-background/20 backdrop-blur-md shadow-lg border border-white/10">
                {announcementBanner.text}{' '}
                <a href={announcementBanner.linkHref} className="font-semibold text-primary hover:text-primary/80 transition-colors">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {announcementBanner.linkText} <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          )}
          
          <div className="text-center">
            <h1 className={`${getTitleSizeClasses()} font-semibold tracking-tight text-balance text-foreground`}>
              {title}
            </h1>
            <p className="mt-6 sm:mt-8 text-lg sm:text-xl font-semibold text-pretty text-foreground sm:text-2xl/8">
              {description}
            </p>
            {subtitle && (
              <p className="mt-4 sm:mt-6 text-base sm:text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
            
            {/* Call to action buttons */}
            {callToActions && callToActions.length > 0 && (
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6">
                {callToActions.map((cta, index) => renderCallToAction(cta, index))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Export types for consumers
export type { HeroLandingProps, NavigationItem, AnnouncementBanner, CallToAction }

