'use client'

import { useRef, useState } from 'react'
import {
  m,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'

import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { DELAY, SPRING, STAGGER } from '@/lib/motion'
import { useMotionPrefs } from '@/lib/use-motion'

/**
 * E1 — one segment of the self-drawing connector.
 *
 * The whole timeline shares a single scroll progress value; each segment maps
 * its own slice of that range to a 0→1 scaleY with `origin: top`, so the line
 * appears to draw downwards continuously as the reader scrolls. Keeping the
 * connector per-item (as the original markup had it) means the existing
 * `top-16 h-full` positioning is preserved exactly.
 */
function TimelineConnector({
  progress,
  from,
  to,
}: {
  progress: MotionValue<number>
  from: number
  to: number
}) {
  const scaleY = useTransform(progress, [from, to], [0, 1], { clamp: true })

  return (
    <m.div
      aria-hidden="true"
      className="absolute left-6 top-16 -ml-px h-full w-0.5 origin-top bg-border"
      style={{ scaleY }}
    />
  )
}

/**
 * E2 — the role's icon badge pops in at the scroll position where the drawing
 * line reaches it, rather than on a fixed delay. It watches the same progress
 * value the connector is driven by and latches once crossed (so it never
 * un-pops when scrolling back up).
 */
function TimelineNode({
  progress,
  threshold,
  icon,
}: {
  progress: MotionValue<number>
  threshold: number
  icon: string
}) {
  const { variants, viewport, reduced } = useMotionPrefs()
  const [reached, setReached] = useState(false)

  useMotionValueEvent(progress, 'change', (latest) => {
    if (!reached && latest >= threshold) setReached(true)
  })

  const className =
    'flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl flex-shrink-0'

  // G5 — under reduced motion there is no scroll-linked pop: the badge just
  // fades in when it enters view. This also keeps the badge independent of the
  // progress latch, so it can never be left stranded at opacity 0 if the page
  // happens to load already scrolled past this node.
  if (reduced) {
    return (
      <m.div
        variants={variants.popIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className={className}
      >
        {icon}
      </m.div>
    )
  }

  return (
    <m.div
      variants={variants.popIn}
      initial="hidden"
      animate={reached ? 'visible' : 'hidden'}
      className={className}
    >
      {icon}
    </m.div>
  )
}

export function ExperienceSection() {
  const experiences = [
    {
      title: "AI Agent Developer",
      company: "Studynet",
      period: "August 2025 – Present",
      icon: "🤖",
      achievements: [
        "Engineered multi-agent AI systems, improving efficiency by 40%",
        "Developed LangGraph-based AI chatbots using RAG architecture",
        "Automated data processing pipelines via LangChain"
      ]
    },
    {
      title: "Machine Learning Engineer Intern",
      company: "Intelsense AI",
      period: "February 2025 – July 2025",
      icon: "🔬",
      achievements: [
        "Built a RAG-powered AI agent for Grameenphone, improving response accuracy",
        "Developed speech-to-text pipelines and data scraping frameworks",
        "Automated dataset creation for AI model training and deployment"
      ]
    }
  ]

  const { reduced } = useMotionPrefs()
  const timelineRef = useRef<HTMLDivElement>(null)

  // Progress through the timeline, measured against a reading line rather than
  // the viewport edges so the draw keeps pace with what is being read.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  })

  // Smoothed so the line glides instead of tracking wheel jitter one-to-one.
  // Under reduced motion the raw value is used, which makes the line simply
  // reflect position with no easing of its own (G5).
  const smoothed = useSpring(scrollYProgress, SPRING.scrollLinked)
  const drawProgress = reduced ? scrollYProgress : smoothed

  const segments = Math.max(experiences.length - 1, 1)
  // Finish drawing slightly before the very end of the range, so the last node
  // pops while it is still comfortably on screen.
  const drawEnd = 0.92

  return (
    <section id="experience" className="relative pt-12 sm:pt-16 pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Experience
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Professional journey in AI and automation
          </p>
        </Reveal>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          {/* `relative` is required, not decorative: useScroll() cannot compute
              an accurate offset for a statically-positioned target, and warns
              about it. The children are already relative, so this changes
              nothing visually. */}
          <div ref={timelineRef} className="relative space-y-12">
            {experiences.map((exp, index) => {
              // Where the drawing line arrives at this role.
              const nodeThreshold =
                index === 0 ? 0.0001 : (index / segments) * drawEnd
              // E4 — the date lands after the bullets, fixing the reading order.
              const dateDelay =
                DELAY.experienceBullets +
                exp.achievements.length * STAGGER.bullet +
                DELAY.dateBadge

              return (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4">
                    <TimelineNode
                      progress={drawProgress}
                      threshold={nodeThreshold}
                      icon={exp.icon}
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <Reveal>
                          <h3 className="text-xl font-semibold text-foreground">
                            {exp.title}
                          </h3>
                          <p className="text-lg font-medium text-primary">
                            {exp.company}
                          </p>
                        </Reveal>
                        {/* E4 */}
                        <Reveal as="p" delay={dateDelay} className="text-sm text-muted-foreground">
                          📅 {exp.period}
                        </Reveal>
                      </div>
                      {/* E3 — bullets stagger in after the role card appears. */}
                      <RevealGroup
                        as="ul"
                        className="mt-4 space-y-2 text-base text-muted-foreground"
                        each={STAGGER.bullet}
                        delay={DELAY.experienceBullets}
                      >
                        {exp.achievements.map((achievement, idx) => (
                          <RevealItem as="li" key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1.5">•</span>
                            <span>{achievement}</span>
                          </RevealItem>
                        ))}
                      </RevealGroup>
                    </div>
                  </div>
                  {index < experiences.length - 1 && (
                    <TimelineConnector
                      progress={drawProgress}
                      from={(index / segments) * drawEnd}
                      to={((index + 1) / segments) * drawEnd}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
