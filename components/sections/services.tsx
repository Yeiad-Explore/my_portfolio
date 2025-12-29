'use client'

import CardFlip from '@/components/ui/flip-card'

export function ServicesSection() {
  const services = [
    {
      title: "AI Solutions & Consulting",
      subtitle: "Intelligent AI systems for your business",
      description: "Transform your business with cutting-edge AI solutions. From system design to deployment, I help you leverage the power of artificial intelligence to solve complex problems and drive innovation.",
      features: [
        "AI system design, integration, and deployment",
        "RAG-based chatbot development",
        "Multi-agent and GenAI pipeline architecture"
      ],
      color: "#6366f1" // Indigo
    },
    {
      title: "Business Workflow Automation",
      subtitle: "Streamline operations with smart automation",
      description: "Eliminate manual tasks and boost productivity with intelligent workflow automation. Connect your tools, automate processes, and focus on what matters most for your business growth.",
      features: [
        "n8n workflow design and implementation",
        "Data automation, lead processing, and reporting pipelines",
        "Integration with CRM, Notion, Airtable, Slack, and Gmail"
      ],
      color: "#10b981" // Emerald
    },
    {
      title: "Model Development & Fine-tuning",
      subtitle: "Custom AI models tailored to your needs",
      description: "Build and fine-tune AI models that understand your specific domain. From speech recognition to translation, create models that deliver superior performance for your unique use cases.",
      features: [
        "Whisper, VITS, and Transformer-based fine-tuning",
        "Speech recognition and translation models",
        "Custom dataset curation and evaluation"
      ],
      color: "#f59e0b" // Amber
    }
  ]

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Services
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Comprehensive AI and automation solutions for your business
          </p>
        </div>
        <div className="mx-auto mt-16 sm:mt-20 lg:mt-24">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {services.map((service) => (
              <CardFlip
                key={service.title}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                features={service.features}
                color={service.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

