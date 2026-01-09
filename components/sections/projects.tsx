'use client'

import { ExternalLink } from 'lucide-react'
import {
  AnimatedCard,
  CardBody,
  CardDescription,
  CardTitle,
  CardVisual,
  Visual1,
} from '@/components/ui/animated-card'

export function ProjectsSection() {
  const projects = [
    {
      icon: "🗣",
      title: "Translation System Using Whisper AI & Transformer",
      description: "Fine-tuned Whisper AI to transcribe ethnic languages into Bangla with 92% accuracy. Developed a real-time translation pipeline with Flask and TensorFlow.",
      stack: ["Whisper AI", "Flask", "TensorFlow", "Python"],
      link: "https://github.com/Yeiad-Explore/Ethnic-Language-to-Bangla-Translation",
      colors: {
        main: "#3b82f6",
        secondary: "#06b6d4",
      },
      visualTitle: "92% Accuracy",
      visualDescription: "Real-time translation pipeline",
      labels: {
        label1: "Whisper",
        label2: "Transformer",
      }
    },
    {
      icon: "💬",
      title: "Memory-Enabled Chatbot Using LangChain & Google GenAI",
      description: "Built a context-aware chatbot with multi-user memory and dynamic prompts. Reduced response time by 50% using custom context management.",
      stack: ["LangChain", "Google GenAI", "Python", "API Integration"],
      link: "https://github.com/Yeiad-Explore/Chatbot-with-Memory-Using-LangChain",
      colors: {
        main: "#8b5cf6",
        secondary: "#ec4899",
      },
      visualTitle: "50% Faster",
      visualDescription: "Multi-user memory system",
      labels: {
        label1: "LangChain",
        label2: "GenAI",
      }
    },
    {
      icon: "⚙️",
      title: "Business Process Automation with n8n",
      description: "Developed automation workflows to integrate Slack, Gmail, and CRMs — cutting manual work by 70%. Custom scripts for webhook-based triggers, notifications, and data sync.",
      stack: ["n8n", "REST APIs", "Python", "Airtable"],
      link: "#",
      colors: {
        main: "#f59e0b",
        secondary: "#eab308",
      },
      visualTitle: "70% Reduction",
      visualDescription: "Automated workflow integration",
      labels: {
        label1: "n8n",
        label2: "APIs",
      }
    }
  ]

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Real-world AI solutions and automation systems
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project, index) => (
            <AnimatedCard
              key={index}
              className="flex flex-col"
            >
              <CardVisual>
                <Visual1
                  mainColor={project.colors.main}
                  secondaryColor={project.colors.secondary}
                  title={project.visualTitle}
                  description={project.visualDescription}
                  label1={project.labels.label1}
                  label2={project.labels.label2}
                  id={`project-${index}`}
                />
              </CardVisual>
              <CardBody className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{project.icon}</span>
                  <CardTitle className="text-base sm:text-lg">
                    {project.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-sm mb-4">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mt-auto"
                  >
                    View on GitHub
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </CardBody>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}

