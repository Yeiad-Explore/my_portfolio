import { cn } from "@/lib/utils";
import React from "react";

export interface CloudInfrastructureSvgProps {
  className?: string;
  width?: string;
  height?: string;
  animate?: boolean;
}

const CloudInfrastructure = ({
  className,
  width = "100%",
  height = "100%",
  animate = true,
}: CloudInfrastructureSvgProps) => {
  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 150"
    >
      <defs>
        <linearGradient id="cloud-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="cloud-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
        </linearGradient>
        <filter id="cloud-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Cloud shapes */}
      <g>
        {/* Main cloud */}
        <path
          className={animate ? "cloud-shape-1" : ""}
          d="M 50 60 Q 30 50 20 60 Q 10 70 20 80 Q 30 90 50 90 Q 60 100 80 100 Q 100 110 120 100 Q 130 90 150 90 Q 170 90 180 80 Q 190 70 180 60 Q 170 50 150 60 Q 140 50 120 50 Q 100 40 80 50 Q 60 50 50 60 Z"
          fill="url(#cloud-blue-grad)"
          opacity="0.4"
          filter="url(#cloud-glow)"
        />
        {/* Secondary cloud */}
        <path
          className={animate ? "cloud-shape-2" : ""}
          d="M 30 100 Q 20 95 15 100 Q 10 105 15 110 Q 20 115 30 115 Q 35 120 45 120 Q 55 125 65 120 Q 70 115 80 115 Q 90 115 95 110 Q 100 105 95 100 Q 90 95 80 100 Q 70 95 60 95 Q 50 90 40 95 Q 30 95 30 100 Z"
          fill="url(#cloud-cyan-grad)"
          opacity="0.3"
          filter="url(#cloud-glow)"
        />
      </g>

      {/* Infrastructure elements */}
      <g stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.5">
        {/* Server boxes */}
        <rect
          className={animate ? "cloud-server-1" : ""}
          x="40"
          y="70"
          width="20"
          height="15"
          rx="2"
          fill="url(#cloud-blue-grad)"
          opacity="0.6"
        />
        <rect
          className={animate ? "cloud-server-2" : ""}
          x="70"
          y="70"
          width="20"
          height="15"
          rx="2"
          fill="url(#cloud-blue-grad)"
          opacity="0.6"
        />
        <rect
          className={animate ? "cloud-server-3" : ""}
          x="100"
          y="70"
          width="20"
          height="15"
          rx="2"
          fill="url(#cloud-blue-grad)"
          opacity="0.6"
        />
        <rect
          className={animate ? "cloud-server-4" : ""}
          x="130"
          y="70"
          width="20"
          height="15"
          rx="2"
          fill="url(#cloud-blue-grad)"
          opacity="0.6"
        />
      </g>

      {/* Connection lines */}
      <g stroke="currentColor" fill="none" strokeWidth="1" opacity="0.3">
        <line x1="50" y1="77.5" x2="80" y2="77.5" className={animate ? "cloud-line-1" : ""} />
        <line x1="90" y1="77.5" x2="110" y2="77.5" className={animate ? "cloud-line-2" : ""} />
        <line x1="120" y1="77.5" x2="140" y2="77.5" className={animate ? "cloud-line-3" : ""} />
      </g>

      {/* Service labels */}
      <g opacity="0.3" fontSize="7" fill="currentColor" textAnchor="middle">
        <text x="50" y="82">EC2</text>
        <text x="80" y="82">S3</text>
        <text x="110" y="82">λ</text>
        <text x="140" y="82">ML</text>
      </g>
    </svg>
  );
};

export { CloudInfrastructure };
