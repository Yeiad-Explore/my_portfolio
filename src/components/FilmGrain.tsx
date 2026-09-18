import React from 'react';

/**
 * Fixed, pointer-events-none film layer: animated grain plus a soft vignette.
 * Lives above everything and never scrolls, so it costs one compositor layer.
 */
export const FilmGrain: React.FC = () => (
  <>
    <div aria-hidden className="film-grain pointer-events-none fixed inset-0 z-[60]" />
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[59] bg-[radial-gradient(130%_100%_at_50%_50%,transparent_55%,rgba(17,18,14,0.5)_100%)]"
    />
  </>
);
