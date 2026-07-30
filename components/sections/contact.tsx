'use client'

import { Mail, Phone, Github, Linkedin } from 'lucide-react'
import { m } from 'motion/react'

import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Magnetic } from '@/components/motion/magnetic'
import { DISTANCE, STAGGER, TRANSITION } from '@/lib/motion'
import { useMotionPrefs } from '@/lib/use-motion'

type ContactRow = {
  Icon: typeof Mail
  label: string
  value: string
  href: string
  external?: boolean
}

const rows: ContactRow[] = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'kabidyeiad101@gmail.com',
    href: 'mailto:kabidyeiad101@gmail.com',
  },
  {
    Icon: Phone,
    label: 'Phone',
    value: '01880864937',
    href: 'tel:01880864937',
  },
  {
    Icon: Github,
    label: 'GitHub',
    value: 'github.com/Yeiad-Explore',
    href: 'https://github.com/Yeiad-Explore',
    external: true,
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/kabid-yeiad',
    href: 'https://www.linkedin.com/in/kabid-yeiad-496035262',
    external: true,
  },
]

export function ContactSection() {
  const { reduced } = useMotionPrefs()

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* C3 — deliberately the calmest entrance on the page: the shared
            fade-up at its slower 0.7s setting, no scale, no stagger on the
            heading block. */}
        <Reveal calm className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Let's Build Something Intelligent Together
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Ready to transform your business with AI and automation?
          </p>
        </Reveal>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <RevealGroup className="space-y-6" each={STAGGER.bullet}>
              {rows.map(({ Icon, label, value, href, external }) => (
                <RevealItem key={label} className="flex items-center gap-4">
                  {/* C1 — same magnetic recipe as the Hero CTAs, smaller radius. */}
                  <Magnetic strength={DISTANCE.magnetContact}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </Magnetic>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <a
                      href={href}
                      {...(external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : null)}
                      className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {value}
                    </a>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* CTA Buttons */}
            <Reveal calm className="flex flex-col justify-center gap-4">
              {/* C2 — the fill sweeps in from the left rather than switching
                  colour instantly. The sweep is a scaleX on an overlay, so the
                  button's own background is never animated.
                  The overlay and the class list are identical regardless of the
                  motion preference — branching either of them here would change
                  the client's first render and break hydration (see the note in
                  lib/motion.ts). Under reduced motion the sweep simply never
                  grows, and the always-present hover:bg-primary/90 provides the
                  plain colour change instead. */}
              <m.a
                href="mailto:kabidyeiad101@gmail.com?subject=AI Project Inquiry"
                initial="rest"
                whileHover="hover"
                whileFocus="hover"
                animate="rest"
                className="group relative overflow-hidden rounded-lg bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <m.span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left bg-primary-foreground/15"
                  variants={{
                    rest: { scaleX: 0 },
                    hover: { scaleX: reduced ? 0 : 1 },
                  }}
                  transition={reduced ? TRANSITION.instant : TRANSITION.hover}
                />
                <span className="relative z-10">💼 Hire Me for AI Projects</span>
              </m.a>
              <a
                href="#services"
                className="rounded-lg border border-border bg-background px-6 py-3 text-center text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                🧩 Explore Automations
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
