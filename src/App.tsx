import React, { useEffect, useState } from 'react';
import { initSmoothScroll } from './lib/smoothScroll';
import { CinematicBackground } from './components/CinematicBackground';
import { FilmGrain } from './components/FilmGrain';
import { Navbar, mountScrollProgress } from './components/Navbar';
import { HeroChapter } from './components/HeroChapter';
import { ManifestoTrack } from './components/ManifestoTrack';
import { ProjectsSection } from './components/ProjectsSection';
import { TerminalSection } from './components/TerminalSection';
import { ResearchSection } from './components/ResearchSection';
import { ExperienceAndContact } from './components/ExperienceAndContact';

export function App() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  useEffect(() => {
    const stopScroll = initSmoothScroll();
    const stopProgress = mountScrollProgress();
    return () => {
      stopProgress();
      stopScroll();
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full max-w-full overflow-x-clip bg-ink text-mist antialiased">
      <CinematicBackground />
      <FilmGrain />
      <Navbar
        isVideoPlaying={isVideoPlaying}
        onToggleVideo={() => setIsVideoPlaying((v) => !v)}
      />
      <main className="relative z-10 w-full max-w-full overflow-x-clip">
        <HeroChapter isPlaying={isVideoPlaying} />
        <ManifestoTrack />
        <ProjectsSection />
        <TerminalSection />
        <ResearchSection />
        <ExperienceAndContact />
      </main>
    </div>
  );
}

export default App;
