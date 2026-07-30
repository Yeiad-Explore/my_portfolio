'use client';

import { cn } from '@/lib/utils';
import { ArrowRight, Code2, Copy, Rocket, Zap } from 'lucide-react';
import { useState } from 'react';
import { m } from 'motion/react';

import { TRANSITION } from '@/lib/motion';
import { useMotionPrefs } from '@/lib/use-motion';

/**
 * Deterministic stand-in for Math.random(), seeded by index.
 *
 * The decorative bars previously sized themselves with Math.random() during
 * render, which produced different values on the server and the client and
 * failed hydration — and a failed hydration makes React discard and regenerate
 * the tree, which restarts every entrance animation on the page. Same visual
 * variety, same numbers on both sides.
 */
function spread(index: number, seed: number) {
  const value = Math.sin((index + 1) * seed) * 10000;
  return value - Math.floor(value);
}

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  color?: string;
}

export default function CardFlip({
  title = 'Build MVPs Fast',
  subtitle = 'Launch your idea in record time',
  description = 'Copy, paste, customize—and launch your MVP faster than ever with our developer-first component library.',
  features = [
    'Copy & Paste Ready',
    'Developer-First',
    'MVP Optimized',
    'Zero Setup Required',
  ],
  color = '#ff2e88'
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { variants, viewport, reduced, isTouch } = useMotionPrefs();

  return (
    <div
      style={{
        ['--primary' as any]: color ?? '#2563eb',
      }}
      className="group relative h-[360px] w-full max-w-[300px] [perspective:2000px] rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      // G6 / §9 — the flip was hover-only, which left the entire back face
      // (description, features, and the SV3 accent) unreachable on touch, since
      // touch devices never fire mouseenter. Touch gets tap-to-toggle as the
      // equivalent, and focus/blur makes the same content reachable by keyboard
      // (§6.3). Both faces are always in the DOM, so assistive tech was never
      // affected — this is specifically for sighted touch and keyboard users.
      onMouseEnter={isTouch ? undefined : () => setIsFlipped(true)}
      onMouseLeave={isTouch ? undefined : () => setIsFlipped(false)}
      onClick={isTouch ? () => setIsFlipped((flipped) => !flipped) : undefined}
      // Focus opens the card for keyboard users on pointer devices only. On
      // touch it must stay off: tapping a focusable element fires focus *before*
      // click, so focus-to-open followed by click-to-toggle would cancel out and
      // the card would never flip.
      onFocus={isTouch ? undefined : () => setIsFlipped(true)}
      onBlur={isTouch ? undefined : () => setIsFlipped(false)}
      tabIndex={0}
    >
      <div
        className={cn(
          'relative h-full w-full',
          '[transform-style:preserve-3d]',
          'transition-all duration-700',
          isFlipped
            ? '[transform:rotateY(180deg)]'
            : '[transform:rotateY(0deg)]',
        )}
      >
        {/* Front of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(0deg)] [backface-visibility:hidden]',
            'overflow-hidden rounded-2xl',
            'bg-gradient-to-br from-white via-slate-50 to-slate-100',
            'dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-800',
            'border border-slate-200 dark:border-zinc-800/50',
            'shadow-lg dark:shadow-xl',
            'transition-all duration-700',
            'group-hover:shadow-xl dark:group-hover:shadow-2xl',
            'group-hover:border-primary/20 dark:group-hover:border-primary/30',
            isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Background gradient effect */}
          <div className="from-primary/5 dark:from-primary/10 absolute inset-0 bg-gradient-to-br via-transparent to-blue-500/5 dark:to-blue-500/10" />

          {/* Animated code blocks */}
          <div className="absolute inset-0 flex items-center justify-center pt-20">
            <div className="relative flex h-[100px] w-[200px] flex-col items-center justify-center gap-2">
              {/* Code blocks animation */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    // `code-bar` is a stable hook for globals.css. This is the
                    // one loop whose keyframes *end* invisible (opacity
                    // 0 → 0.8 → 0), so the finish-instantly reduced-motion reset
                    // would erase the bars; globals.css gives them a static
                    // opacity instead. Done in CSS rather than by branching on
                    // `reduced` here, because a preference-dependent class list
                    // would break hydration (see lib/motion.ts).
                    'code-bar h-3 w-full rounded-sm',
                    'from-primary/20 via-primary/30 to-primary/20 bg-gradient-to-r',
                    'animate-[slideIn_2s_ease-in-out_infinite]',
                    'opacity-0',
                  )}
                  style={{
                    // Rounded to 2dp deliberately: the browser re-serialises
                    // long decimals in a style attribute at lower precision, so
                    // full-precision values read back differently from what the
                    // server emitted and register as a hydration mismatch.
                    width: `${(60 + spread(i, 12.9898) * 40).toFixed(2)}%`,
                    animationDelay: `${i * 0.2}s`,
                    marginLeft: `${(spread(i, 78.233) * 20).toFixed(2)}%`,
                  }}
                />
              ))}

              {/* Central rocket icon.
                  SV2 — the icon springs in when the card enters view. The pop
                  lives on a wrapper so the inner div keeps its own
                  group-hover:scale-110/rotate-12 CSS transform, which an inline
                  motion transform on the same element would override. */}
              <div className="absolute inset-0 flex items-center justify-center">
                <m.div
                  variants={variants.popIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                >
                  <div
                    className={cn(
                      'h-12 w-12 rounded-xl',
                      'from-primary via-primary/90 to-primary/80 bg-gradient-to-br',
                      'flex items-center justify-center',
                      'shadow-primary/25 shadow-lg',
                      'animate-pulse',
                      'transition-all duration-500 group-hover:scale-110 group-hover:rotate-12',
                    )}
                  >
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                </m.div>
              </div>
            </div>
          </div>

          {/* Bottom content */}
          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-zinc-900 transition-all duration-500 ease-out group-hover:translate-y-[-4px] dark:text-white">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm tracking-tight text-zinc-600 transition-all delay-[50ms] duration-500 ease-out group-hover:translate-y-[-4px] dark:text-zinc-300">
                  {subtitle}
                </p>
              </div>
              <div className="group/icon relative">
                <div
                  className={cn(
                    'absolute inset-[-8px] rounded-lg transition-opacity duration-300',
                    'from-primary/20 via-primary/10 bg-gradient-to-br to-transparent',
                    'opacity-0 group-hover/icon:opacity-100',
                  )}
                />
                <Zap className="text-primary relative z-10 h-5 w-5 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-2xl p-5',
            'bg-gradient-to-br from-white via-slate-50 to-slate-100',
            'dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-800',
            'border border-slate-200 dark:border-zinc-800',
            'shadow-lg dark:shadow-xl',
            'flex flex-col',
            'transition-all duration-700',
            'group-hover:shadow-xl dark:group-hover:shadow-2xl',
            'group-hover:border-primary/20 dark:group-hover:border-primary/30',
            !isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Background gradient */}
          <div className="from-primary/5 dark:from-primary/10 absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent to-blue-500/5 dark:to-blue-500/10" />

          <div className="relative z-10 flex-1 space-y-5">
            <div className="space-y-2">
              <div className="mb-2 flex items-center gap-2">
                <div className="from-primary via-primary/90 to-primary/80 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br">
                  <Code2 className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-zinc-900 transition-all duration-500 ease-out group-hover:translate-y-[-2px] dark:text-white">
                  {title}
                </h3>
              </div>
              {/* SV3 — accent bar grows left-to-right under the title on hover.
                  It sits on the *back* face because hovering flips the card:
                  an accent on the front face would be turned away from the
                  viewer at the exact moment it animated. `isFlipped` is already
                  this card's hover state. */}
              <m.span
                aria-hidden="true"
                className="block h-0.5 w-full max-w-[7rem] origin-left rounded-full bg-primary"
                animate={{ scaleX: isFlipped ? 1 : 0 }}
                transition={reduced ? TRANSITION.instant : TRANSITION.hoverFast}
              />
              <p className="line-clamp-2 text-sm tracking-tight text-zinc-600 transition-all duration-500 ease-out group-hover:translate-y-[-2px] dark:text-zinc-400">
                {description}
              </p>
            </div>

            <div className="space-y-2.5">
              {features.map((feature, index) => {
                const icons = [Copy, Code2, Rocket, Zap];
                const IconComponent = icons[index % icons.length];

                return (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-zinc-700 transition-all duration-500 dark:text-zinc-300"
                    style={{
                      transform: isFlipped
                        ? 'translateX(0)'
                        : 'translateX(-10px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                    }}
                  >
                    <div className="bg-primary/10 dark:bg-primary/20 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md">
                      <IconComponent className="text-primary h-3 w-3" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-slate-200 pt-4 dark:border-zinc-800">
            <div
              className={cn(
                'group/start relative',
                'flex items-center justify-between',
                'rounded-lg p-2.5',
                'transition-all duration-300',
                'bg-gradient-to-r from-slate-100 via-slate-100 to-slate-100',
                'dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-800',
                'hover:from-primary/10 hover:via-primary/5 hover:to-transparent',
                'dark:hover:from-primary/20 dark:hover:via-primary/10 dark:hover:to-transparent',
                'hover:scale-[1.02] hover:cursor-pointer',
                'hover:border-primary/20 border border-transparent',
              )}
            >
              <span className="group-hover/start:text-primary text-sm font-semibold text-zinc-900 transition-colors duration-300 dark:text-white">
                Start Building
              </span>
              <div className="group/icon relative">
                <div
                  className={cn(
                    'absolute inset-[-6px] rounded-lg transition-all duration-300',
                    'from-primary/20 via-primary/10 bg-gradient-to-br to-transparent',
                    'scale-90 opacity-0 group-hover/start:scale-100 group-hover/start:opacity-100',
                  )}
                />
                <ArrowRight className="text-primary relative z-10 h-4 w-4 transition-all duration-300 group-hover/start:translate-x-1 group-hover/start:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

