import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../lib/smoothScroll';

/**
 * A fixed still of the island that sits under every section after the hero.
 * The hero owns the only playing video; this is the memory of that scene,
 * slowly receding as the page goes on.
 */
export const CinematicBackground: React.FC = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layer,
        { scale: 1.04, opacity: 0.55 },
        {
          scale: 1.16,
          opacity: 0.22,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        }
      );
    }, layer);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ink pointer-events-none select-none">
      <div
        ref={layerRef}
        className="h-full w-full bg-cover bg-[52%_56%] will-change-transform"
        style={{ backgroundImage: 'url(/hero-poster.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/70" />
    </div>
  );
};
