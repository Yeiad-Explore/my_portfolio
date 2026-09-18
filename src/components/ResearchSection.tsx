import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { PUBLICATIONS } from '../data/mockData';
import { prefersReducedMotion } from '../lib/smoothScroll';

export const ResearchSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.paper-card', {
        y: 32,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="papers" ref={ref} className="relative z-10 px-5 py-32 md:px-8 md:py-48">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-medium tracking-tight text-mist">
          Papers in the ACL Anthology
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
          {PUBLICATIONS.map((pub) => (
            <article key={pub.id} className="paper-card border-t border-white/10 pt-6">
              <p className="font-mono text-[11px] text-ember">
                {pub.conference}, {pub.year}
              </p>
              <h3 className="mt-3 text-xl font-medium leading-snug tracking-tight text-mist">{pub.title}</h3>
              <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-mute">{pub.description}</p>
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-[13px] text-mist hover:text-ember"
              >
                Read the paper
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
