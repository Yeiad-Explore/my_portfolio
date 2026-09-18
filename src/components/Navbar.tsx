import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Pause, Play, ArrowUpRight, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { subtleAudio } from '../utils/audioEngine';
import { PERSONAL_INFO } from '../data/mockData';
import { attachMotion } from '../lib/motion';
import { prefersReducedMotion } from '../lib/smoothScroll';

interface NavbarProps {
  isVideoPlaying: boolean;
  onToggleVideo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isVideoPlaying, onToggleVideo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 48,
      onUpdate: (self) => {
        const next = self.scroll() > 48;
        setIsScrolled((prev) => (prev === next ? prev : next));
      },
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    const bar = barRef.current;
    if (!header) return;

    if (prefersReducedMotion()) {
      const cleanup = bar ? attachMotion(bar) : () => {};
      return cleanup;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: -32, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 }
      );

      if (bar) attachMotion(bar);
    }, header);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const panel = menuPanelRef.current;
    if (!panel) return;
    gsap.set(panel, { height: 0, autoAlpha: 0 });
  }, []);

  useEffect(() => {
    const panel = menuPanelRef.current;
    const linksWrap = menuLinksRef.current;
    if (!panel) return;

    const links = linksWrap ? gsap.utils.toArray<HTMLElement>(linksWrap.children) : [];

    if (mobileMenuOpen) {
      const fullHeight = panel.scrollHeight;
      if (prefersReducedMotion()) {
        gsap.set(panel, { height: fullHeight, autoAlpha: 1 });
        gsap.set(links, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.set(links, { autoAlpha: 0, y: 14 });
      const tl = gsap.timeline();
      tl.fromTo(
        panel,
        { height: 0, autoAlpha: 0 },
        { height: fullHeight, autoAlpha: 1, duration: 0.45, ease: 'power3.out' }
      ).to(
        links,
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power3.out' },
        '-=0.25'
      );
      return () => {
        tl.kill();
      };
    } else if (panel.style.height && panel.style.height !== '0px') {
      if (prefersReducedMotion()) {
        gsap.set(panel, { height: 0, autoAlpha: 0 });
        return;
      }
      const tween = gsap.to(panel, { height: 0, autoAlpha: 0, duration: 0.3, ease: 'power2.in' });
      return () => {
        tween.kill();
      };
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Notes', href: '#notes' },
    { label: 'Papers', href: '#papers' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-40">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-ember shadow-[0_0_8px_rgba(196,165,116,0.6)]"
        id="scroll-progress"
      />
      <div ref={barRef} className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="font-sans text-[15px] font-medium tracking-tight text-mist">
          {PERSONAL_INFO.name}
        </a>

        <nav
          className={`hidden items-center gap-7 rounded-full px-5 py-2 text-[13px] text-mute transition-colors duration-500 md:flex ${
            isScrolled ? 'border border-white/10 bg-ink/70 backdrop-blur-md' : 'border border-transparent'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative inline-block hover:text-mist transition-colors duration-300"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ember transition-[width] duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSoundActive(subtleAudio.toggleAmbient())}
            aria-label={isSoundActive ? 'Mute ambient sound' : 'Play ambient sound'}
            className="magnetic press-spring rounded-full border border-white/10 p-2 text-mute hover:text-mist"
          >
            {isSoundActive ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={onToggleVideo}
            aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
            className="magnetic press-spring rounded-full border border-white/10 p-2 text-mute hover:text-mist"
          >
            {isVideoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic press-spring hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-mist hover:bg-white/5 sm:inline-flex"
          >
            GitHub
            <ArrowUpRight className="h-3 w-3 text-mute" />
          </a>
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="press-spring rounded-full border border-white/10 p-2 text-mute md:hidden"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div ref={menuPanelRef} className="overflow-hidden border-t border-white/10 bg-ink/95 md:hidden">
        <div ref={menuLinksRef} className="px-5 py-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-mist"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export function mountScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return () => {};
  const tween = gsap.fromTo(
    bar,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
      },
    }
  );
  return () => tween.kill();
}
