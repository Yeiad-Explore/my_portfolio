'use client'

import React, { useEffect, useRef } from 'react'

interface BentoItemProps {
  className?: string
  children: React.ReactNode
}

// Reusable BentoItem component
const BentoItem = ({ className, children }: BentoItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const item = itemRef.current
    if (!item) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      item.style.setProperty('--mouse-x', `${x}px`)
      item.style.setProperty('--mouse-y', `${y}px`)
    }

    item.addEventListener('mousemove', handleMouseMove)

    return () => {
      item.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={itemRef} className={`bento-item ${className || ''}`}>
      {children}
    </div>
  )
}

interface CyberneticBentoGridProps {
  title?: string
  items: Array<{
    title: string
    description: string
    icon?: string
    span?: 'col-span-2' | 'row-span-2' | 'col-span-2 row-span-2'
    content?: React.ReactNode
  }>
}

export const CyberneticBentoGrid = ({ 
  title = "Core Features",
  items 
}: CyberneticBentoGridProps) => {
  return (
    <div className="main-container">
      <div className="w-full max-w-6xl z-10">
        {title && (
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-center mb-8">
            {title}
          </h1>
        )}
        <div className="bento-grid">
          {items.map((item, index) => (
            <BentoItem key={index} className={item.span || ''}>
              {item.icon && (
                <div className="text-3xl mb-3">{item.icon}</div>
              )}
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {item.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                {item.description}
              </p>
              {item.content && (
                <div className="mt-4">
                  {item.content}
                </div>
              )}
            </BentoItem>
          ))}
        </div>
      </div>
    </div>
  )
}

