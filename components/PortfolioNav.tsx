'use client'

import { useEffect, useState } from 'react'

const links = [
  { label: 'Home', href: '#hero', icon: 'm3 10 9-7 9 7v10H3zm6 10v-7h6v7' },
  { label: 'Projects', href: '#projects', icon: 'M2 5h7l2 3h11v11H2zm11 6v5m0-2h4' },
  { label: 'Experience', href: '#experience', icon: 'M2 7h20v13H2zm6 0V4h8v3M2 12h20' },
  { label: 'About', href: '#about', icon: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z' },
  { label: 'Skills', href: '#skills', icon: 'm18 16 4-4-4-4M6 8l-4 4 4 4m8.5-12-5 16' },
  { label: 'Certifications', href: '#achievements', icon: 'M18 9a6 6 0 1 1-12 0 6 6 0 0 1 12 0ZM8 14l-2 7 6-3 6 3-2-7' },
  { label: 'Contact', href: '#contact', icon: 'M2 5h20v14H2zm0 2 10 6 10-6' },
]

export default function PortfolioNav() {
  const [active, setActive] = useState('#hero')

  useEffect(() => {
    const sections = links.map(({ href }) => ({ href, element: document.querySelector(href) }))
    function update() {
      let current = '#hero'
      let nearest = -Infinity
      for (const { href, element } of sections) {
        const top = element?.getBoundingClientRect().top
        if (top !== undefined && top <= 150 && top >= nearest) {
          current = href
          nearest = top
        }
      }
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <nav className="site-nav" aria-label="Main navigation">
      {links.map(({ label, href, icon }) => (
        <a key={href} href={href} aria-label={label} aria-current={active === href ? 'location' : undefined}>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"><path d={icon} /></svg>
          <span aria-hidden="true">{label}</span>
        </a>
      ))}
    </nav>
  )
}
