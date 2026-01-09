'use client'

import { ExternalLink, BookOpen, TrendingUp, Award, Calendar } from 'lucide-react'
import { NeuralNetwork } from '@/components/ui/neural-network'
import { cn } from '@/lib/utils'

export function PublicationsSection() {
  const publications = [
    {
      title: "Hybrid Deep Learning & ML for Advanced Sentiment Analysis",
      conference: "BanglaNLP 2023",
      year: "2023",
      link: "https://aclanthology.org/2023.banglalp-1.44/",
      description: "A novel approach combining deep learning architectures with traditional ML techniques for enhanced sentiment analysis in low-resource languages.",
      metrics: {
        impact: "High",
        citations: "12+",
        domain: "NLP"
      },
      color: "#8b5cf6",
      secondaryColor: "#ec4899",
      icon: "🧠"
    },
    {
      title: "Violence Inciting Text Detection using Deep Learning",
      conference: "BanglaNLP 2023",
      year: "2023",
      link: "https://aclanthology.org/2023.banglalp-1.30/",
      description: "Deep learning-based system for detecting and classifying violence-inciting content in multilingual text with high precision and recall.",
      metrics: {
        impact: "High",
        citations: "15+",
        domain: "NLP"
      },
      color: "#3b82f6",
      secondaryColor: "#06b6d4",
      icon: "🛡️"
    }
  ]

  return (
    <section id="publications" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Research Publications</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mb-4">
            Academic Contributions
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Advancing Natural Language Processing through innovative research
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {publications.map((pub, index) => (
              <div
                key={index}
                className={cn(
                  "group/publication relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm",
                  "transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10",
                  "hover:-translate-y-2"
                )}
              >
                {/* Animated background gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover/publication:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${pub.color}15 0%, transparent 70%)`
                  }}
                />

                {/* Neural network visual */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover/publication:opacity-20 transition-opacity duration-500">
                  <NeuralNetwork 
                    width="128" 
                    height="128" 
                    color={pub.color}
                    className="absolute top-4 right-4"
                    id={`pub-${index}`}
                  />
                </div>

                {/* Content */}
                <div className="relative p-6 lg:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="rounded-lg p-2 text-2xl"
                        style={{ backgroundColor: `${pub.color}20` }}
                      >
                        {pub.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="h-4 w-4 text-primary" />
                          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                            {pub.metrics.domain}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{pub.year}</span>
                          <span>•</span>
                          <span>{pub.conference}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover/publication:text-primary transition-colors">
                    {pub.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {pub.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-foreground">
                        Impact: <span className="text-primary">{pub.metrics.impact}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-foreground">
                        Citations: <span className="text-primary">{pub.metrics.citations}</span>
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div 
                        className="h-2 w-2 rounded-full animate-pulse"
                        style={{ backgroundColor: pub.color }}
                      />
                      <span>Published Research</span>
                    </div>
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold",
                        "bg-primary/10 text-primary hover:bg-primary/20",
                        "transition-all duration-300 hover:gap-3",
                        "border border-primary/20 hover:border-primary/40"
                      )}
                    >
                      Read Paper
                      <ExternalLink className="h-4 w-4 transition-transform group-hover/publication:translate-x-1" />
                    </a>
                  </div>
                </div>

                {/* Hover effect border */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover/publication:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `0 0 0 1px ${pub.color}40, 0 0 30px ${pub.color}20`
                  }}
                />
              </div>
            ))}
          </div>

          {/* Stats footer */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{publications.length}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Publications</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">27+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Citations</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">2023</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Latest Year</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
