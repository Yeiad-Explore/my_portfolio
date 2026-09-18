import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { EXPERIENCES, PERSONAL_INFO } from '../data/mockData';
import { prefersReducedMotion } from '../lib/smoothScroll';

export const ExperienceAndContact: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.exp-row', {
        y: 24,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="experience" ref={ref} className="relative z-10 px-5 py-32 md:px-8 md:py-48">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-medium tracking-tight text-mist">
          Where the work happened
        </h2>

        <div className="mt-14 space-y-12">
          {EXPERIENCES.map((exp) => (
            <article key={exp.company} className="exp-row border-t border-white/10 pt-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-2xl font-medium tracking-tight text-mist">{exp.role}</h3>
                <p className="font-mono text-[12px] text-mute">{exp.period}</p>
              </div>
              <p className="mt-1 text-sm text-ember">{exp.company}</p>
              <ul className="mt-5 max-w-[65ch] space-y-2 text-sm leading-relaxed text-mute">
                {exp.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div id="contact" className="exp-row mt-28 border-t border-white/10 pt-16">
          <h2 className="max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-medium tracking-tight text-mist">
            Write if you have a hard problem
          </h2>
          <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-mute">
            Agents, speech models, retrieval, or a dataset that will not sit still. I answer mail.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="rounded-full bg-mist px-5 py-2.5 text-[13px] font-medium text-ink hover:bg-white"
            >
              {PERSONAL_INFO.email}
            </a>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-[13px] text-mist hover:bg-white/5"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/15 px-5 py-2.5 text-[13px] text-mist hover:bg-white/5"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="mt-16 font-mono text-[11px] text-mute">
            {PERSONAL_INFO.location}. {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </section>
  );
};
