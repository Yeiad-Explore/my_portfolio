import { cn } from "@/lib/utils";
import React from "react";

export interface NeuralNetworkSvgProps {
  className?: string;
  width?: string;
  height?: string;
  animate?: boolean;
  color?: string;
  id?: string;
}

const NeuralNetwork = ({
  className,
  width = "100%",
  height = "100%",
  animate = true,
  color = "#8b5cf6",
  id,
}: NeuralNetworkSvgProps) => {
  const uniqueId = id || Math.random().toString(36).substr(2, 9);
  const gradId = `neural-grad-${uniqueId}`;
  const glowId = `neural-glow-${uniqueId}`;
  
  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 150"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Input layer nodes */}
      <g>
        <circle
          className={animate ? "neural-node-1" : ""}
          cx="30"
          cy="40"
          r="6"
          fill={`url(#${gradId})`}
          filter={`url(#${glowId})`}
        />
        <circle
          className={animate ? "neural-node-2" : ""}
          cx="30"
          cy="75"
          r="6"
          fill={`url(#${gradId})`}
          filter={`url(#${glowId})`}
        />
        <circle
          className={animate ? "neural-node-3" : ""}
          cx="30"
          cy="110"
          r="6"
          fill={`url(#${gradId})`}
          filter={`url(#${glowId})`}
        />
      </g>

      {/* Hidden layer nodes */}
      <g>
        <circle
          className={animate ? "neural-node-4" : ""}
          cx="100"
          cy="30"
          r="7"
          fill={`url(#${gradId})`}
          filter={`url(#${glowId})`}
        />
        <circle
          className={animate ? "neural-node-5" : ""}
          cx="100"
          cy="60"
          r="7"
          fill={`url(#${gradId})`}
          filter={`url(#${glowId})`}
        />
        <circle
          className={animate ? "neural-node-6" : ""}
          cx="100"
          cy="90"
          r="7"
          fill={`url(#${gradId})`}
          filter={`url(#${glowId})`}
        />
        <circle
          className={animate ? "neural-node-7" : ""}
          cx="100"
          cy="120"
          r="7"
          fill={`url(#${gradId})`}
          filter={`url(#${glowId})`}
        />
      </g>

      {/* Output layer nodes */}
      <g>
        <circle
          className={animate ? "neural-node-8" : ""}
          cx="170"
          cy="60"
          r="6"
          fill={`url(#${gradId})`}
          filter={`url(#${glowId})`}
        />
        <circle
          className={animate ? "neural-node-9" : ""}
          cx="170"
          cy="90"
          r="6"
          fill={`url(#${gradId})`}
          filter={`url(#${glowId})`}
        />
      </g>

      {/* Connections */}
      <g stroke={color} fill="none" strokeWidth="1" opacity="0.3">
        {/* Input to Hidden */}
        <line x1="36" y1="40" x2="93" y2="30" className={animate ? "neural-connection-1" : ""} />
        <line x1="36" y1="40" x2="93" y2="60" className={animate ? "neural-connection-2" : ""} />
        <line x1="36" y1="40" x2="93" y2="90" className={animate ? "neural-connection-3" : ""} />
        <line x1="36" y1="75" x2="93" y2="30" className={animate ? "neural-connection-4" : ""} />
        <line x1="36" y1="75" x2="93" y2="60" className={animate ? "neural-connection-5" : ""} />
        <line x1="36" y1="75" x2="93" y2="120" className={animate ? "neural-connection-6" : ""} />
        <line x1="36" y1="110" x2="93" y2="90" className={animate ? "neural-connection-7" : ""} />
        <line x1="36" y1="110" x2="93" y2="120" className={animate ? "neural-connection-8" : ""} />
        
        {/* Hidden to Output */}
        <line x1="107" y1="30" x2="164" y2="60" className={animate ? "neural-connection-9" : ""} />
        <line x1="107" y1="60" x2="164" y2="60" className={animate ? "neural-connection-10" : ""} />
        <line x1="107" y1="90" x2="164" y2="90" className={animate ? "neural-connection-11" : ""} />
        <line x1="107" y1="120" x2="164" y2="90" className={animate ? "neural-connection-12" : ""} />
      </g>
    </svg>
  );
};

export { NeuralNetwork };
