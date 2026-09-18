import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Pause, Play, ArrowUpRight, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { subtleAudio } from '../utils/audioEngine';
import { PERSONAL_INFO } from '../data/mockData';

interface NavbarProps {
  isVideoPlaying: boolean;
  onToggleVideo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isVideoPlaying, onToggleVideo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Notes', href: '#notes' },
    { label: 'Papers', href: '#papers' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-ember"
        id="scroll-progress"
      />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="font-sans text-[15px] font-medium tracking-tight text-mist">
          {PERSONAL_INFO.name}
        </a>

        <nav
          className={`hidden items-center gap-7 rounded-full px-5 py-2 text-[13px] text-mute transition-colors duration-500 md:flex ${
            isScrolled ? 'border border-white/10 bg-ink/70 backdrop-blur-md' : 'border border-transparent'
          }`}
        >
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-mist transition-colors duration-300">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSoundActive(subtleAudio.toggleAmbient())}
            aria-label={isSoundActive ? 'Mute ambient sound' : 'Play ambient sound'}
            className="rounded-full border border-white/10 p-2 text-mute hover:text-mist"
          >
            {isSoundActive ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={onToggleVideo}
            aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
            className="rounded-full border border-white/10 p-2 text-mute hover:text-mist"
          >
            {isVideoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-mist hover:bg-white/5 sm:inline-flex"
          >
            GitHub
            <ArrowUpRight className="h-3 w-3 text-mute" />
          </a>
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="rounded-full border border-white/10 p-2 text-mute md:hidden"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-ink/95 px-5 py-5 md:hidden">
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
      )}
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
