"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { m } from "motion/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IdleMotion } from "@/components/motion/idle-motion";
import { LOOP, type IdlePreset } from "@/lib/motion";
import { useMotionPrefs } from "@/lib/use-motion";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  iconIdle,
  iconIdleDuration = LOOP.icon[0],
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  /** S3 — which idle motion this card's icon gets, so no two cards match */
  iconIdle?: IdlePreset;
  /** S3 — loop length for that motion (§7: 15–40s) */
  iconIdleDuration?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { variants, lift } = useMotionPrefs();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    // S1 + S2 — the motion lives on the card's own root, not a wrapper, so the
    // grid-placement classes in `className` stay on the actual grid item.
    // The entrance variant is inherited from the <RevealGroup> in the section,
    // which supplies the ~80ms stagger.
    <m.div
      ref={cardRef}
      key={name}
      variants={variants.fadeScale}
      {...lift}
      className={cn(
        "bento-card group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className,
      )}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        {/* S3 — per-card idle motion on the icon. Wrapped rather than applied to
            the icon itself so the existing group-hover:scale-75 CSS transform
            and the loop's transform live on separate elements. */}
        {iconIdle ? (
          <IdleMotion
            preset={iconIdle}
            duration={iconIdleDuration}
            className="w-fit origin-left"
          >
            <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-in-out group-hover:scale-75" />
          </IdleMotion>
        ) : (
          <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-in-out group-hover:scale-75" />
        )}
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          {name}
        </h3>
        <p className="max-w-lg text-neutral-400">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
          <a href={href}>
            {cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </m.div>
  );
};

export { BentoCard, BentoGrid };

