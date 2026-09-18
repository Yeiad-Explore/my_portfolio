import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PERSONAL_INFO } from '../data/mockData';
import { prefersReducedMotion } from '../lib/smoothScroll';

export const HeroChapter: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
      });

      gsap.to('.hero-content', {
        y: -72,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-16 pt-24 md:px-8 md:pb-24"
    >
      <div className="hero-content mx-auto w-full max-w-6xl">
        <p className="hero-line mb-5 max-w-xl text-[13px] text-mute">{PERSONAL_INFO.status}</p>
        <h1 className="hero-line max-w-6xl text-[clamp(2.6rem,6.4vw,5.4rem)] font-medium leading-[1.05] tracking-tight text-mist">
          {PERSONAL_INFO.name}
        </h1>
        <p className="hero-line mt-5 max-w-2xl text-lg leading-relaxed text-mist/80 md:text-xl">
          {PERSONAL_INFO.tagline}
        </p>
        <div className="hero-line mt-8 flex flex-wrap gap-3">
          <a
            href="#work"
            className="rounded-full bg-mist px-5 py-2.5 text-[13px] font-medium text-ink hover:bg-white"
          >
            Selected work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/15 px-5 py-2.5 text-[13px] text-mist hover:bg-white/5"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
};
