'use client'

import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack'

export function AboutSection() {
  const items = [
    {
      title: "Turning complex workflows into intelligent automation",
      description: "I'm an AI Engineer and Consultant focused on helping businesses harness the power of automation and large language models. My work spans multi-agent systems, RAG-based chatbots, speech processing, and n8n-powered business automation.",
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
      icon: "🌍"
    },
    {
      title: "Bridging Research & Practice",
      description: "With experience in developing AI pipelines and production-ready automation tools, I bridge the gap between cutting-edge research and practical business solutions.",
      icon: "🚀"
    }
  ]

  return (
    <section id="about" className="relative py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mb-4">
            Building Intelligence
          </h2>
          <p className="text-lg text-muted-foreground">
            Scroll to explore my journey in AI and automation
          </p>
        </div>
      </div>

      <ScrollStack
        useWindowScroll={true}
        itemDistance={120}
        itemStackDistance={30}
        baseScale={0.92}
        stackPosition="30%"
        className=""
      >
        {items.map((item, index) => (
          <ScrollStackItem
            key={index}
            itemClassName="bg-card/80 backdrop-blur-sm border-2 border-border hover:border-ring transition-all duration-300 shadow-lg"
          >
            <div className="flex flex-col h-full justify-center">
              <div className="text-5xl mb-6">{item.icon}</div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {item.title}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}
