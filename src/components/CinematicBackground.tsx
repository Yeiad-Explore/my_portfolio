import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../lib/smoothScroll';

interface CinematicBackgroundProps {
  isPlaying: boolean;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({ isPlaying }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layer,
        { scale: 1.02, opacity: 0.92 },
        {
          scale: 1.12,
          opacity: 0.42,
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
      <div ref={layerRef} className="h-full w-full will-change-transform">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          preload="auto"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/55" />
    </div>
  );
};
