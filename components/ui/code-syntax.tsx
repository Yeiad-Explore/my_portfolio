import { cn } from "@/lib/utils";
import React from "react";

export interface CodeSyntaxSvgProps {
  className?: string;
  width?: string;
  height?: string;
  animate?: boolean;
}

const CodeSyntax = ({
  className,
  width = "100%",
  height = "100%",
  animate = true,
}: CodeSyntaxSvgProps) => {
  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 150"
    >
      <defs>
        <linearGradient id="code-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="code-yellow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.3" />
        </linearGradient>
        <filter id="code-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Code brackets and syntax elements */}
      <g stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.6">
        {/* Opening bracket */}
        <path
          d="M 30 40 L 20 60 L 30 80"
          className={animate ? "code-syntax-line-1" : ""}
        />
        {/* Closing bracket */}
        <path
          d="M 170 40 L 180 60 L 170 80"
          className={animate ? "code-syntax-line-2" : ""}
        />
        {/* Function braces */}
        <path
          d="M 50 30 Q 45 40 50 50 Q 45 60 50 70"
          className={animate ? "code-syntax-line-3" : ""}
        />
        <path
          d="M 150 30 Q 155 40 150 50 Q 155 60 150 70"
          className={animate ? "code-syntax-line-4" : ""}
        />
        {/* Code lines */}
        <line x1="60" y1="50" x2="140" y2="50" className={animate ? "code-syntax-line-5" : ""} />
        <line x1="70" y1="65" x2="130" y2="65" className={animate ? "code-syntax-line-6" : ""} />
        <line x1="80" y1="80" x2="120" y2="80" className={animate ? "code-syntax-line-7" : ""} />
      </g>

      {/* Animated dots (like code completion) */}
      {animate && (
        <>
          <circle
            className="code-syntax-dot-1"
            cx="100"
            cy="50"
            r="3"
            fill="url(#code-orange-grad)"
            filter="url(#code-glow)"
          />
          <circle
            className="code-syntax-dot-2"
            cx="100"
            cy="65"
            r="3"
            fill="url(#code-yellow-grad)"
            filter="url(#code-glow)"
          />
          <circle
            className="code-syntax-dot-3"
            cx="100"
            cy="80"
            r="3"
            fill="url(#code-orange-grad)"
            filter="url(#code-glow)"
          />
        </>
      )}

      {/* Language symbols */}
      <g opacity="0.4">
        <text x="40" y="100" fontSize="10" fill="currentColor" fontFamily="monospace">Py</text>
        <text x="80" y="100" fontSize="10" fill="currentColor" fontFamily="monospace">JS</text>
        <text x="120" y="100" fontSize="10" fill="currentColor" fontFamily="monospace">C++</text>
        <text x="150" y="100" fontSize="10" fill="currentColor" fontFamily="monospace">SQL</text>
      </g>
    </svg>
  );
};

export { CodeSyntax };
