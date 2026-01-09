import { cn } from "@/lib/utils";
import React from "react";

export interface WorkflowAutomationSvgProps {
  className?: string;
  width?: string;
  height?: string;
  animate?: boolean;
}

const WorkflowAutomation = ({
  className,
  width = "100%",
  height = "100%",
  animate = true,
}: WorkflowAutomationSvgProps) => {
  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 150"
    >
      <defs>
        <linearGradient id="workflow-yellow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eab308" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="workflow-amber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
        </linearGradient>
        <filter id="workflow-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <marker
          id="workflow-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.6" />
        </marker>
      </defs>

      {/* Workflow nodes */}
      <g>
        {/* Start node */}
        <circle
          className={animate ? "workflow-node-1" : ""}
          cx="30"
          cy="75"
          r="10"
          fill="url(#workflow-yellow-grad)"
          filter="url(#workflow-glow)"
        />
        {/* Process nodes */}
        <rect
          className={animate ? "workflow-node-2" : ""}
          x="65"
          y="65"
          width="20"
          height="20"
          rx="3"
          fill="url(#workflow-amber-grad)"
          filter="url(#workflow-glow)"
        />
        <rect
          className={animate ? "workflow-node-3" : ""}
          x="110"
          y="65"
          width="20"
          height="20"
          rx="3"
          fill="url(#workflow-amber-grad)"
          filter="url(#workflow-glow)"
        />
        {/* End node */}
        <circle
          className={animate ? "workflow-node-4" : ""}
          cx="170"
          cy="75"
          r="10"
          fill="url(#workflow-yellow-grad)"
          filter="url(#workflow-glow)"
        />
      </g>

      {/* Workflow connections with arrows */}
      <g stroke="currentColor" fill="none" strokeWidth="2" opacity="0.5" markerEnd="url(#workflow-arrow)">
        <path
          d="M 40 75 L 65 75"
          className={animate ? "workflow-line-1" : ""}
        />
        <path
          d="M 85 75 L 110 75"
          className={animate ? "workflow-line-2" : ""}
        />
        <path
          d="M 130 75 L 160 75"
          className={animate ? "workflow-line-3" : ""}
        />
      </g>

      {/* Parallel branch */}
      <g stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.4">
        <path
          d="M 85 75 Q 85 50 110 50 Q 135 50 135 75"
          className={animate ? "workflow-branch-1" : ""}
        />
        <circle
          className={animate ? "workflow-branch-node" : ""}
          cx="110"
          cy="50"
          r="6"
          fill="url(#workflow-yellow-grad)"
          filter="url(#workflow-glow)"
        />
      </g>

      {/* Node labels */}
      <g opacity="0.4" fontSize="8" fill="currentColor" textAnchor="middle">
        <text x="30" y="79">Start</text>
        <text x="75" y="79">Process</text>
        <text x="120" y="79">Transform</text>
        <text x="170" y="79">End</text>
        <text x="110" y="47">Branch</text>
      </g>
    </svg>
  );
};

export { WorkflowAutomation };
