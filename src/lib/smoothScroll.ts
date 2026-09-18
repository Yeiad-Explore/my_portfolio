import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ duration: 0.6, ease: 'power3.out' });

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) {
    ScrollTrigger.normalizeScroll(false);
    return () => {};
  }

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.1,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const ticker = (time: number) => {
    lenis?.raf(time * 1000);
  };

  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener('resize', onResize);

  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    window.removeEventListener('resize', onResize);
    gsap.ticker.remove(ticker);
    lenis?.destroy();
    lenis = null;
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
