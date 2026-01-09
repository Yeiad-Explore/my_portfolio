'use client'

import DisplayCards from '@/components/ui/display-cards'
import { Brain, Cpu, Zap, BookOpen, Globe, Rocket } from 'lucide-react'
import { CpuArchitecture } from '@/components/ui/cpu-architecture'

export function AboutSection() {
  const cards = [
    {
      icon: <Brain className="size-4 text-purple-300" />,
      title: "AI Engineering",
      description: "Multi-agent systems & automation",
      date: "3+ production systems",
      iconClassName: "text-purple-500",
      titleClassName: "text-purple-500",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Cpu className="size-4 text-blue-300" />,
      title: "Efficiency",
      description: "40% improvement in orchestration",
      date: "Proven results",
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <BookOpen className="size-4 text-green-300" />,
      title: "Research",
      description: "2 NLP papers published",
      date: "Academic impact",
      iconClassName: "text-green-500",
      titleClassName: "text-green-500",
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 min-h-screen overflow-hidden">
      {/* CPU Architecture Background Element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 dark:opacity-5 pointer-events-none hidden lg:block">
        <CpuArchitecture 
          width="400" 
          height="200" 
          text="AI"
          className="text-primary"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mb-4">
            Building Intelligence
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Hover to explore my journey in AI and automation
          </p>
        </div>

        {/* Two-column layout: Text on left, Cards on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed text-left">
              I'm an <span className="text-foreground font-semibold">AI Engineer and Consultant</span> focused on helping businesses harness the power of automation and large language models. My work spans multi-agent systems, RAG-based chatbots, speech processing, and n8n-powered business automation.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <Zap className="size-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground text-left">Production-ready AI systems deployed efficiently</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Globe className="size-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Global Reach</h3>
                  <p className="text-sm text-muted-foreground text-left">Clients & collaborations worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Rocket className="size-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Innovation</h3>
                  <p className="text-sm text-muted-foreground text-left">Bridging research & practical solutions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Display Cards */}
          <div className="flex justify-center lg:justify-end items-center">
            <DisplayCards cards={cards} />
          </div>
        </div>
      </div>
    </section>
  )
}
