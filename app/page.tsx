'use client'

import { HeroLanding } from "@/components/ui/hero-1";
import type { HeroLandingProps } from "@/components/ui/hero-1";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ServicesSection } from "@/components/sections/services";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { PublicationsSection } from "@/components/sections/publications";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/ui/footer-section";

export default function Home() {
  const heroProps: HeroLandingProps = {
    // Logo and branding
    logo: {
      src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop",
      alt: "Kabid Yeiad Logo",
      companyName: "Kabid Yeiad"
    },
    
    // Navigation - Traditional Portfolio Menu
    navigation: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Skills', href: '#skills' },
      { name: 'Services', href: '#services' },
      { name: 'Experience', href: '#experience' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' },
    ],
    loginText: "Resume",
    loginHref: "#resume",
    
    // Hero content
    title: "Kabid Yeiad",
    description: "I design intelligent AI systems and build automation workflows that help businesses scale smarter.",
    subtitle: "I specialize in AI-driven automation, custom n8n workflows, and generative AI systems. From intelligent chatbots to workflow orchestration — I help startups and teams integrate AI into real business processes.",
    
    // Announcement banner
    announcementBanner: {
      text: "🚀 Available for new projects",
      linkText: "Let's work together",
      linkHref: "#contact"
    },
    
    // Call to action buttons
    callToActions: [
      { 
        text: "View My Work", 
        href: "#projects", 
        variant: "primary" 
      },
      { 
        text: "Let's Collaborate", 
        href: "#contact", 
        variant: "secondary" 
      },
      { 
        text: "Download Resume", 
        href: "#resume", 
        variant: "secondary" 
      }
    ],
    
    // Styling options
    titleSize: "large",
    gradientColors: {
      from: "oklch(0.646 0.222 41.116)", // Warm orange
      to: "oklch(0.488 0.243 264.376)"   // Deep purple
    },
    
    // Additional customization
    className: "min-h-screen"
  }

  return (
    <div className="scroll-smooth">
      <div id="home">
        <HeroLanding {...heroProps} />
      </div>
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ExperienceSection />
      <ProjectsSection />
      <PublicationsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
