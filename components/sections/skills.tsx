'use client'

export function SkillsSection() {
  const skills = [
    {
      category: "Languages",
      items: ["Python", "C/C++", "SQL", "JavaScript"]
    },
    {
      category: "Frameworks & Tools",
      items: ["LangChain", "FastAPI", "Flask", "Hugging Face", "Docker"]
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS (EC2, S3, Lambda, SageMaker)", "Git"]
    },
    {
      category: "Automation",
      items: ["n8n", "Zapier", "API Integration", "Workflow Design"]
    },
    {
      category: "AI Expertise",
      items: ["LLMs", "RAG Systems", "Multi-Agent AI", "ASR Pipelines"]
    }
  ]

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Skills & Expertise
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Technologies and tools I work with to build intelligent solutions
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill.category} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  {skill.category}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <ul className="flex flex-wrap gap-2">
                    {skill.items.map((item, index) => (
                      <li
                        key={index}
                        className="rounded-md bg-background px-3 py-1.5 text-sm font-medium ring-1 ring-inset ring-border hover:ring-ring transition-colors"
                      >
                        {item}
                      </li>
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

