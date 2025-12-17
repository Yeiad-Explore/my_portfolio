'use client'

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

  return (
    <section id="experience" className="relative pt-12 sm:pt-16 pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Experience
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Professional journey in AI and automation
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl flex-shrink-0">
                    {exp.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        <p className="text-lg font-medium text-primary">
                          {exp.company}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        📅 {exp.period}
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2 text-base text-muted-foreground">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1.5">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-16 -ml-px h-full w-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

