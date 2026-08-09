'use client'

import { useEffect, useState } from 'react'

const NAV_SECTIONS = [
  { id: 'hero', label: 'HERO', num: '01' },
  { id: 'about', label: 'ABOUT', num: '02' },
  { id: 'skills', label: 'SKILLS', num: '03' },
  { id: 'projects', label: 'PROJECTS', num: '04' },
  { id: 'experience', label: 'EXPERIENCE', num: '05' },
  { id: 'achievements', label: 'CREDENTIALS', num: '06' },
  { id: 'contact', label: 'CONTACT', num: '07' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [active,   setActive]     = useState('hero')
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)

      const scrollY = window.scrollY + 120
      const ids = NAV_SECTIONS.map(s => s.id)
      let current = 'hero'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollTo(id: string) {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72
    window.scrollTo({ top: el.offsetTop - navH, behavior: 'smooth' })
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <div className="nav-container">
          
          {/* Brand */}
          <a href="#hero" className="nav-brand" onClick={e => { e.preventDefault(); scrollTo('hero') }} aria-label="Home">
            <div className="brand-logo-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
            <span className="brand-name">M. USMAN</span>
          </a>

          {/* Desktop links */}
          <ul className="nav-links">
            {NAV_SECTIONS.map(section => (
              <li key={section.id}>
                <button
                  className={`nav-link${active === section.id ? ' active' : ''}`}
                  onClick={() => scrollTo(section.id)}
                  aria-current={active === section.id ? 'page' : undefined}
                >
                  <span className="nav-num">{section.num}</span> {section.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="/Muhammad_Usman_AlHaq_Resume.pdf"
                download
                className="nav-resume-btn"
                id="nav-resume-btn"
              >
                RÉSUMÉ
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-header">
          <span className="mobile-nav-title">NAVIGATION</span>
          <button className="mobile-close-btn" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <ul className="mobile-nav-links">
          {NAV_SECTIONS.map(section => (
            <li key={section.id}>
              <button className={`mobile-nav-link${active === section.id ? ' active' : ''}`} onClick={() => scrollTo(section.id)}>
                <span className="mobile-nav-num">{section.num}</span> {section.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-divider" aria-hidden="true" />
        <a
          href="/Muhammad_Usman_AlHaq_Resume.pdf"
          download
          className="mobile-resume-btn"
          id="mobile-resume-btn"
          onClick={() => setMenuOpen(false)}
        >
          DOWNLOAD RÉSUMÉ
        </a>
      </div>
    </>
  )
}
