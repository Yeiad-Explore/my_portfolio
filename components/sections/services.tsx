'use client'

export function ServicesSection() {
  const services = [
    {
      icon: "💡",
      title: "AI Solutions & Consulting",
      items: [
        "AI system design, integration, and deployment",
        "RAG-based chatbot development",
        "Multi-agent and GenAI pipeline architecture"
      ]
    },
    {
      icon: "⚙️",
      title: "Business Workflow Automation",
      items: [
        "n8n workflow design and implementation",
        "Data automation, lead processing, and reporting pipelines",
        "Integration with CRM, Notion, Airtable, Slack, and Gmail"
      ]
    },
    {
      icon: "🧠",
      title: "Model Development & Fine-tuning",
      items: [
        "Whisper, VITS, and Transformer-based fine-tuning",
        "Speech recognition and translation models",
        "Custom dataset curation and evaluation"
      ]
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
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-1 lg:gap-y-16">
            {services.map((service) => (
              <div key={service.title} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <div className="text-xl">{service.title}</div>
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    {service.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

