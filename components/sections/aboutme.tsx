'use client'

import ProfileCard from '@/components/ui/ProfileCard'

export function AboutMeSection() {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="aboutme" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground">
            Get to know the person behind the code
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Card */}
          <div className="flex justify-center lg:justify-end">
            <ProfileCard
              name="Kabid Yeiad"
              title="AI Engineer & Consultant"
              handle="yeiad"
              status="Available"
              contactText="Let's Connect"
              avatarUrl="/yeiad.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={handleContactClick}
            />
          </div>

          {/* About Me Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Hi, I'm Kabid Yeiad
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                I'm an AI Engineer and Consultant passionate about transforming complex business
                challenges into intelligent, automated solutions. With expertise spanning multi-agent
                systems, RAG-based chatbots, and workflow automation, I help organizations harness
                the power of AI to scale smarter.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                My journey in AI engineering has led me to work on cutting-edge projects involving
                large language models, speech processing, and generative AI systems. I specialize
                in building production-ready AI pipelines and custom n8n workflows that bridge the
                gap between research innovation and practical business applications.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                When I'm not coding or consulting, I'm exploring new AI technologies, contributing
                to research in Natural Language Processing, and sharing knowledge with the tech
                community. I believe in building AI solutions that are not just powerful, but also
                practical, scalable, and impactful.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-3xl font-bold text-primary mb-1">3+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-3xl font-bold text-primary mb-1">2</div>
                <div className="text-sm text-muted-foreground">Research Papers</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-3xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">AI Projects</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-3xl font-bold text-primary mb-1">40%</div>
                <div className="text-sm text-muted-foreground">Efficiency Boost</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
