'use client'

import { Code, Settings, Cloud, Zap, Brain } from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { CpuArchitecture } from '@/components/ui/cpu-architecture'
import { CodeSyntax } from '@/components/ui/code-syntax'
import { NetworkNodes } from '@/components/ui/network-nodes'
import { CloudInfrastructure } from '@/components/ui/cloud-infrastructure'
import { WorkflowAutomation } from '@/components/ui/workflow-automation'

export function SkillsSection() {
  const skills = [
    {
      Icon: Code,
      name: "Languages",
      description: "Python, C/C++, SQL, JavaScript - Building robust and scalable applications",
      href: "#skills",
      cta: "Explore",
      background: (
        <>
          <div className="absolute -right-20 -top-20 opacity-60">
            <div className="h-40 w-40 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 blur-3xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-15 dark:opacity-25">
            <CodeSyntax 
              width="250" 
              height="180" 
              className="text-orange-500"
            />
          </div>
        </>
      ),
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
    },
    {
      Icon: Settings,
      name: "Frameworks & Tools",
      description: "LangChain, FastAPI, Flask, Hugging Face, Docker - Modern development stack",
      href: "#skills",
      cta: "Learn more",
      background: (
        <>
          <div className="absolute -right-20 -top-20 opacity-60">
            <div className="h-40 w-40 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 blur-3xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-30">
            <NetworkNodes 
              width="280" 
              height="200" 
              className="text-purple-500"
            />
          </div>
        </>
      ),
      className: "lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: Cloud,
      name: "Cloud & DevOps",
      description: "AWS (EC2, S3, Lambda, SageMaker), Git - Scalable cloud infrastructure",
      href: "#skills",
      cta: "Discover",
      background: (
        <>
          <div className="absolute -right-20 -top-20 opacity-60">
            <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 blur-3xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-30">
            <CloudInfrastructure 
              width="250" 
              height="180" 
              className="text-blue-500"
            />
          </div>
        </>
      ),
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
    },
    {
      Icon: Zap,
      name: "Automation",
      description: "n8n, Zapier, API Integration, Workflow Design - Streamlining processes",
      href: "#skills",
      cta: "See more",
      background: (
        <>
          <div className="absolute -right-20 -top-20 opacity-60">
            <div className="h-40 w-40 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 blur-3xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-30">
            <WorkflowAutomation 
              width="250" 
              height="180" 
              className="text-yellow-500"
            />
          </div>
        </>
      ),
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
    },
    {
      Icon: Brain,
      name: "AI Expertise",
      description: "LLMs, RAG Systems, Multi-Agent AI, ASR Pipelines - Cutting-edge AI solutions",
      href: "#skills",
      cta: "Explore",
      background: (
        <>
          <div className="absolute -right-20 -top-20 opacity-60">
            <div className="h-40 w-40 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 blur-3xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-30">
            <CpuArchitecture 
              width="300" 
              height="150" 
              text="AI"
              className="text-primary"
            />
          </div>
        </>
      ),
      className: "lg:col-start-1 lg:col-end-4 lg:row-start-3 lg:row-end-4",
    },
  ]

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Skills & Expertise
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Technologies and tools I work with to build intelligent solutions
          </p>
        </div>
        <BentoGrid className="lg:grid-rows-3">
          {skills.map((skill) => (
            <BentoCard key={skill.name} {...skill} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}

