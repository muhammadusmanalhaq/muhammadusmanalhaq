'use client'

import { useEffect, useState } from 'react'

const KEYWORDS = [
  'Azure', '.NET Core', 'Docker', 'Kubernetes', 'CI/CD', 'Bicep',
  'PostgreSQL', 'React', 'Next.js', 'Redis', 'TypeScript', 'Tailwind',
  'C++', 'Python', 'DevOps', 'Microservices', 'GraphQL', 'Linux',
  'OIDC', 'Key Vault', 'Vercel', 'GitHub Actions', 'SQL Server', 'Entity Framework',
  'Row-Level Security', 'System Design'
]

type TechElement = { id: number; text: string; top: number; left: number; duration: number; delay: number; fontSize: number; opacity: number }

export default function TechStream() {
  const [elements, setElements] = useState<TechElement[]>([])

  useEffect(() => {
    // Reduce count on mobile to save battery/performance
    const isMobile = window.innerWidth < 768
    const displayCount = isMobile ? Math.floor(KEYWORDS.length / 2) : KEYWORDS.length
    const activeKeywords = [...KEYWORDS].sort(() => 0.5 - Math.random()).slice(0, displayCount)

    const newEls = activeKeywords.map((kw, i) => {
      return {
        id: i,
        text: kw,
        top: Math.random() * 100, // percentage start position
        left: Math.random() * 90, // keep away from very right edge
        duration: 40 + Math.random() * 60, // 40-100s very slow drift
        delay: Math.random() * -100, // Start at different phases of animation
        fontSize: 12 + Math.random() * 16,
        opacity: 0.03 + Math.random() * 0.06 // 3-9% opacity
      }
    })
    setElements(newEls)
  }, [])

  if (elements.length === 0) return null

  return (
    <div className="tech-stream-container" aria-hidden="true">
      {elements.map((el) => (
        <div
          key={el.id}
          className="tech-stream-word"
          style={{
            top: `${el.top}%`,
            left: `${el.left}%`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
            fontSize: `${el.fontSize}px`,
            opacity: el.opacity
          }}
        >
          {el.text}
        </div>
      ))}
    </div>
  )
}
