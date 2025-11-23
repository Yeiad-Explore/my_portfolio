'use client'

import { Mail, Phone, Github, Linkedin } from 'lucide-react'

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Let's Build Something Intelligent Together
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Ready to transform your business with AI and automation?
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <a
                    href="mailto:kabidyeiad101@gmail.com"
                    className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    kabidyeiad101@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <a
                    href="tel:01880864937"
                    className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    01880864937
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">GitHub</p>
                  <a
                    href="https://github.com/Yeiad-Explore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    github.com/Yeiad-Explore
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Linkedin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/kabid-yeiad-496035262"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    linkedin.com/in/kabid-yeiad
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-4">
              <a
                href="mailto:kabidyeiad101@gmail.com?subject=AI Project Inquiry"
                className="rounded-lg bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-colors"
              >
                💼 Hire Me for AI Projects
              </a>
              <a
                href="#services"
                className="rounded-lg border border-border bg-background px-6 py-3 text-center text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                🧩 Explore Automations
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

