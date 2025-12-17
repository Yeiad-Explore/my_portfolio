// @ts-nocheck
import React from 'react'

interface StarBorderProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  className?: string
  color?: string
  speed?: string
  thickness?: number
  children: React.ReactNode
  [key: string]: any
}

const StarBorder = ({
  as: Component = 'button' as any,
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps) => {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...rest.style
      }}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div className="relative z-[1]">
        {children}
      </div>
    </Component>
  )
}

export default StarBorder

