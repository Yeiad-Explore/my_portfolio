import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ArrowDownRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/mockData';
import { prefersReducedMotion } from '../lib/smoothScroll';
import { attachMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface HeroChapterProps {
  isPlaying: boolean;
}

/**
 * Hero: a pinned, scroll-scrubbed opening scene.
 *
 * Act one   - full-bleed video, letterboxed, the name rises out of masked lines.
 * Transition- the camera pushes toward the coder while the frame closes in
 *             from the left, turning the film into a framed window on the right.
 * Act two   - the second statement surfaces in the space the frame vacated.
 *
 * Intro (time-based) and scrub (scroll-based) animate DIFFERENT elements so the
 * two timelines never fight over the same property.
 */
export const HeroChapter: React.FC<HeroChapterProps> = ({ isPlaying }) => {
  const wrapRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduce] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) video.play().catch(() => {});
    else video.pause();
  }, [isPlaying]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const title = titleRef.current;
    if (!wrap || !stage || !title) return;

    if (reduce) {
      gsap.set('.hero-act2', { autoAlpha: 0, display: 'none' });
      return attachMotion(stage);
    }

    let split: SplitText | null = null;
    let cancelled = false;
    const cleanups: Array<() => void> = [];
    const mm = gsap.matchMedia();

    const build = () => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        cleanups.push(attachMotion(stage));

        split = new SplitText(title, {
          type: 'lines,chars',
          mask: 'lines',
          linesClass: 'hero-title-line',
          charsClass: 'hero-char',
        });

        // ---------- Intro: curtains open, camera settles, type rises ----------
        const intro = gsap.timeline({ defaults: { ease: 'expo.inOut' } });
        intro
          .fromTo(
            '.hero-bar-top',
            { yPercent: 0 },
            { yPercent: -88, duration: 1.6 },
            0
          )
          .fromTo(
            '.hero-bar-bottom',
            { yPercent: 0 },
            { yPercent: 88, duration: 1.6 },
            0
          )
          .fromTo(
            '.hero-scene-settle',
            { scale: 1.14, filter: 'brightness(0.55)' },
            { scale: 1, filter: 'brightness(1)', duration: 2.4, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.hero-leak',
            { opacity: 0 },
            { opacity: 0.55, duration: 1.1, ease: 'sine.out' },
            0.3
          )
          .to('.hero-leak', { opacity: 0, duration: 1.6, ease: 'sine.inOut' }, 1.3)
          .from(
            split.chars,
            { yPercent: 118, duration: 1.1, ease: 'power4.out', stagger: { each: 0.028, from: 'start' } },
            0.55
          )
          .from(
            '.hero-rise',
            { y: 26, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09 },
            1.0
          )
          .from(
            '.hero-rule',
            { scaleX: 0, duration: 1.2, ease: 'expo.out', transformOrigin: 'left center' },
            1.05
          );

        // ---------- Scrub: the frame closes in, act two surfaces ----------
        mm.add(
          {
            desktop: '(min-width: 768px)',
            mobile: '(max-width: 767px)',
          },
          (context) => {
            const { desktop } = context.conditions as { desktop: boolean };
            const frameClip = desktop
              ? 'inset(13% 6% 13% 47% round 6px)'
              : 'inset(9% 5% 42% 5% round 6px)';
            // Push toward the coder, then drift so they land inside the frame,
            // not on its edge: frame centre is ~70% x on desktop, ~33% y on mobile.
            const dolly = desktop ? { scale: 1.24, x: '17vw', y: '-3vh' } : { scale: 1.3, x: '0vw', y: '-16vh' };

            const scrub = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: wrap,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.1,
              },
            });

            scrub
              // act one lifts away, line by line, like credits leaving the frame
              .to(
                '.hero-title-line',
                { yPercent: -120, ease: 'power2.in', stagger: 0.06, duration: 0.28 },
                0
              )
              .to('.hero-rise, .hero-rule', { autoAlpha: 0, y: -28, duration: 0.2, ease: 'power1.in' }, 0)
              // letterbox bars leave as the frame takes over as the window
              .to('.hero-bar-top', { yPercent: -100, duration: 0.3 }, 0.05)
              .to('.hero-bar-bottom', { yPercent: 100, duration: 0.3 }, 0.05)
              // camera pushes toward the coder while the frame closes in
              .fromTo(
                '.hero-scene',
                { clipPath: 'inset(0% 0% 0% 0% round 0px)' },
                { clipPath: frameClip, duration: 0.5, ease: 'power2.inOut' },
                0.12
              )
              .to('.hero-scene-zoom', { ...dolly, duration: 0.55, ease: 'power1.inOut' }, 0.1)
              .to('.hero-grade', { opacity: 0.35, duration: 0.5 }, 0.12)
              // act two surfaces
              .fromTo(
                '.hero-act2-item',
                { y: 44, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.24, ease: 'power3.out', stagger: 0.05 },
                0.5
              )
              .fromTo(
                '.hero-frame-edge',
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.2 },
                0.5
              )
              // hold so the reader can sit with the frame before the manifesto
              .to({}, { duration: 0.2 });

            return () => {
              scrub.scrollTrigger?.kill();
              scrub.kill();
            };
          }
        );

        // ---------- Pointer: the island tilts against the cursor ----------
        mm.add('(pointer: fine)', () => {
          const rotY = gsap.quickTo('.hero-scene-tilt', 'rotationY', { duration: 1.2, ease: 'power3.out' });
          const rotX = gsap.quickTo('.hero-scene-tilt', 'rotationX', { duration: 1.2, ease: 'power3.out' });
          const textX = gsap.quickTo('.hero-act1', 'x', { duration: 1.4, ease: 'power3.out' });
          const textY = gsap.quickTo('.hero-act1', 'y', { duration: 1.4, ease: 'power3.out' });

          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            rotY(nx * 3.2);
            rotX(-ny * 2.4);
            textX(-nx * 14);
            textY(-ny * 10);
          };
          const onLeave = () => {
            rotY(0);
            rotX(0);
            textX(0);
            textY(0);
          };

          stage.addEventListener('pointermove', onMove);
          stage.addEventListener('pointerleave', onLeave);
          return () => {
            stage.removeEventListener('pointermove', onMove);
            stage.removeEventListener('pointerleave', onLeave);
          };
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, wrap);

      cleanups.push(() => ctx.revert());
    };

    // Split only once the display font is in, so line masks measure correctly.
    document.fonts.ready.then(build);

    return () => {
      cancelled = true;
      mm.revert();
      split?.revert();
      cleanups.forEach((fn) => fn());
    };
  }, [reduce]);

  return (
    <section
      id="top"
      ref={wrapRef}
      className="relative z-10"
      style={{ height: reduce ? '100dvh' : '300vh' }}
    >
      <div
        ref={stageRef}
        className="hero-stage sticky top-0 h-[100dvh] w-full overflow-hidden bg-ink"
      >
        {/* Scene: clip (frame) > tilt > zoom (scroll) > settle (intro) > video */}
        <div className="hero-scene absolute inset-0 [clip-path:inset(0%_0%_0%_0%_round_0px)] will-change-[clip-path]">
          <div className="hero-scene-tilt h-full w-full [transform-style:preserve-3d] will-change-transform">
            <div className="hero-scene-zoom h-full w-full origin-[52%_56%] will-change-transform">
              <div className="hero-scene-settle h-full w-full origin-[52%_56%] will-change-transform">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover object-[52%_56%]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/hero-poster.jpg"
                  preload="auto"
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          {/* colour grade + vignette that lives inside the frame */}
          <div className="hero-grade pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_35%,rgba(17,18,14,0.55)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink via-ink/55 to-transparent" />
          {/* light leak that breathes once during the intro */}
          <div className="hero-leak pointer-events-none absolute inset-0 opacity-0 mix-blend-screen bg-[radial-gradient(60%_50%_at_78%_22%,rgba(255,190,120,0.55),transparent_70%)]" />
          {/* hairline that reads as the frame edge once the scene is a window */}
          <div className="hero-frame-edge pointer-events-none absolute inset-0 rounded-[6px] ring-1 ring-inset ring-mist/20" />
        </div>

        {/* Letterbox curtains */}
        <div className="hero-bar-top pointer-events-none absolute inset-x-0 top-0 z-20 h-[50%] bg-ink" />
        <div className="hero-bar-bottom pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[50%] bg-ink" />

        {/* Act one */}
        <div className="hero-act1 absolute inset-x-0 bottom-0 z-30 px-5 pb-12 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="hero-rule mb-6 h-px w-full max-w-[9rem] bg-ember/80" />
            <p className="hero-rise mb-4 font-mono text-[12px] tracking-[0.02em] text-mist/70">
              {PERSONAL_INFO.title}. {PERSONAL_INFO.status}.
            </p>
            <h1
              ref={titleRef}
              className="hero-title max-w-[12ch] text-[clamp(3.6rem,11.5vw,11rem)] font-medium leading-[0.92] tracking-[-0.045em] text-mist"
            >
              {PERSONAL_INFO.name}
            </h1>
            <div className="mt-7 flex flex-col gap-6 md:mt-9 md:flex-row md:items-end md:justify-between">
              <p className="hero-rise max-w-[30ch] text-[clamp(1.05rem,1.6vw,1.35rem)] font-light leading-[1.35] text-mist/85">
                {PERSONAL_INFO.tagline}
              </p>
              <a
                href="#work"
                className="hero-rise press-spring inline-flex w-fit items-center gap-2 rounded-full bg-mist px-6 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-white"
              >
                Selected work
                <ArrowDownRight className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        {/* Act two: the frame is on the right (desktop) or top (mobile) */}
        <div className="hero-act2 pointer-events-none absolute inset-0 z-30 flex items-end px-5 pb-16 md:items-center md:pb-0 md:px-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="w-full md:max-w-[38%]">
              <h2 className="hero-act2-item text-[clamp(1.6rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-mist">
                I sit with code, datasets, and models until they behave.
              </h2>
              <p className="hero-act2-item mt-5 max-w-[34ch] text-[15px] font-light leading-relaxed text-mist/70 md:text-base">
                Agents that call real tools. Speech models for dialects the default stack ignores. Retrieval that has to run in production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
