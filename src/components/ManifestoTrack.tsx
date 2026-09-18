import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MANIFESTO_TEXT } from '../data/mockData';
import { prefersReducedMotion } from '../lib/smoothScroll';

export const ManifestoTrack: React.FC = () => {
  const wrapRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const pin = pinRef.current;
    if (!wrap || !pin || prefersReducedMotion()) return;

    const words = pin.querySelectorAll<HTMLElement>('.scrub-word');

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.14 });
      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: 'bottom bottom',
          pin: pin,
          scrub: 1.15,
          anticipatePin: 1,
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section id="notes" ref={wrapRef} className="relative z-10 h-[280vh]">
      <div ref={pinRef} className="flex min-h-[100dvh] items-center px-5 py-24 md:px-8 md:py-32">
        <p className="mx-auto max-w-5xl text-[clamp(1.7rem,3.6vw,3.25rem)] font-medium leading-[1.18] tracking-tight text-mist">
          {MANIFESTO_TEXT.split(' ').map((word, i) => (
            <span key={`${word}-${i}`} className="scrub-word inline-block pr-[0.28em]">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};
