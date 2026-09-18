import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/mockData';
import { prefersReducedMotion } from '../lib/smoothScroll';

export const ProjectsSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cards[cards.length - 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });

        gsap.to(card, {
          scale: 0.94,
          autoAlpha: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={ref} className="relative z-10">
      <div className="mx-auto max-w-5xl px-5 pb-10 pt-32 md:px-8 md:pt-48">
        <h2 className="max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-medium tracking-tight text-mist">
          Systems I have actually shipped
        </h2>
      </div>

      {PROJECTS.map((proj) => (
        <article
          key={proj.id}
          className="stack-card sticky top-0 flex min-h-[100dvh] items-center px-5 py-16 md:px-8"
        >
          <div className="mx-auto w-full max-w-5xl rounded-2xl border border-white/10 bg-ink/75 p-6 backdrop-blur-md md:p-10">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-[13px] text-ember">{proj.index}</p>
              {proj.metric && (
                <p className="font-mono text-sm text-mute">
                  <span className="text-mist">{proj.metric}</span> {proj.metricLabel}
                </p>
              )}
            </div>
            <h3 className="max-w-3xl text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-tight tracking-tight text-mist">
              {proj.title}
            </h3>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-mute">{proj.description}</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {proj.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="font-mono text-[11px] text-mute">
                    {tag}
                  </span>
                ))}
              </div>
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[13px] text-mist hover:text-ember"
                >
                  Repository
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
