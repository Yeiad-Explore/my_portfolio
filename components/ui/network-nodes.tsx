import { cn } from "@/lib/utils";
import React from "react";

export interface NetworkNodesSvgProps {
  className?: string;
  width?: string;
  height?: string;
  animate?: boolean;
}

const NetworkNodes = ({
  className,
  width = "100%",
  height = "100%",
  animate = true,
}: NetworkNodesSvgProps) => {
  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 150"
    >
      <defs>
        <radialGradient id="node-purple-grad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9333ea" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="node-blue-grad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.2" />
        </radialGradient>
        <filter id="node-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Network connections */}
      <g stroke="currentColor" fill="none" strokeWidth="1" opacity="0.4">
        {/* Central hub connections */}
        <line x1="100" y1="75" x2="50" y2="40" className={animate ? "network-line-1" : ""} />
        <line x1="100" y1="75" x2="150" y2="40" className={animate ? "network-line-2" : ""} />
        <line x1="100" y1="75" x2="50" y2="110" className={animate ? "network-line-3" : ""} />
        <line x1="100" y1="75" x2="150" y2="110" className={animate ? "network-line-4" : ""} />
        {/* Inter-node connections */}
        <line x1="50" y1="40" x2="150" y2="40" className={animate ? "network-line-5" : ""} />
        <line x1="50" y1="110" x2="150" y2="110" className={animate ? "network-line-6" : ""} />
      </g>

      {/* Network nodes */}
      <g>
        {/* Central hub */}
        <circle
          className={animate ? "network-node-center" : ""}
          cx="100"
          cy="75"
          r="12"
          fill="url(#node-purple-grad)"
          filter="url(#node-glow)"
        />
        {/* Top nodes */}
        <circle
          className={animate ? "network-node-1" : ""}
          cx="50"
          cy="40"
          r="8"
          fill="url(#node-blue-grad)"
          filter="url(#node-glow)"
        />
        <circle
          className={animate ? "network-node-2" : ""}
          cx="150"
          cy="40"
          r="8"
          fill="url(#node-blue-grad)"
          filter="url(#node-glow)"
        />
        {/* Bottom nodes */}
        <circle
          className={animate ? "network-node-3" : ""}
          cx="50"
          cy="110"
          r="8"
          fill="url(#node-blue-grad)"
          filter="url(#node-glow)"
        />
        <circle
          className={animate ? "network-node-4" : ""}
          cx="150"
          cy="110"
          r="8"
          fill="url(#node-blue-grad)"
          filter="url(#node-glow)"
        />
      </g>

      {/* Tool labels */}
      <g opacity="0.3" fontSize="8" fill="currentColor">
        <text x="45" y="35" textAnchor="middle">API</text>
        <text x="155" y="35" textAnchor="middle">ML</text>
        <text x="45" y="125" textAnchor="middle">DB</text>
        <text x="155" y="125" textAnchor="middle">Docker</text>
      </g>
    </svg>
  );
};

export { NetworkNodes };
