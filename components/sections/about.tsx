'use client'

import { CyberneticBentoGrid } from '@/components/ui/cybernetic-bento-grid'

export function AboutSection() {
  const bentoItems = [
    {
      title: "Turning complex workflows into intelligent automation",
      description: "I'm an AI Engineer and Consultant focused on helping businesses harness the power of automation and large language models. My work spans multi-agent systems, RAG-based chatbots, speech processing, and n8n-powered business automation.",
      span: 'col-span-2 row-span-2' as const,
      icon: "🧠"
    },
    {
      title: "AI Pipelines Deployed",
      description: "3+ production-ready AI systems",
      icon: "⚙️"
    },
    {
      title: "Efficiency Improvement",
      description: "40% improvement in multi-agent orchestration",
      icon: "🧩"
    },
    {
      title: "Research Publications",
      description: "2 research papers in NLP published",
      icon: "💬"
    },
    {
      title: "Global Reach",
      description: "Clients & collaborations across AI and automation domains",
      span: 'col-span-2' as const,
      icon: "🌍"
    },
    {
      title: "Bridging Research & Practice",
      description: "With experience in developing AI pipelines and production-ready automation tools, I bridge the gap between cutting-edge research and practical business solutions.",
      icon: "🚀"
    }
  ]

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mb-4">
            Turning complex workflows into intelligent automation
          </h2>
        </div>
        <CyberneticBentoGrid 
          title=""
          items={bentoItems}
        />
      </div>
    </section>
  )
}
