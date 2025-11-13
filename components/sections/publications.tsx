'use client'

import { ExternalLink } from 'lucide-react'

export function PublicationsSection() {
  const publications = [
    {
      title: "Hybrid Deep Learning & ML for Advanced Sentiment Analysis",
      link: "https://aclanthology.org/2023.banglalp-1.44/"
    },
    {
      title: "Violence Inciting Text Detection using Deep Learning",
      link: "https://aclanthology.org/2023.banglalp-1.30/"
    }
  ]

  return (
    <section id="publications" className="relative py-24 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Publications
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Research contributions in Natural Language Processing
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="rounded-lg bg-card p-6 ring-1 ring-border hover:ring-ring transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {index + 1}. {pub.title}
                    </h3>
                  </div>
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                  >
                    Read Full Paper
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

