'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import GlobalLightbox from './GlobalLightbox'

const ROLES = [
  'Full-Stack Developer',
  'Systems Programmer',
  'Android Developer',
  'ICPC Regionalist',
  'Competitive Programmer',
]

export default function Hero() {
  const [lightbox, setLightbox] = useState<{url: string, type: 'image'} | null>(null)
  const twRef    = useRef<HTMLSpanElement>(null)
  const orb1Ref  = useRef<HTMLDivElement>(null)
  const orb2Ref  = useRef<HTMLDivElement>(null)
  const orb3Ref  = useRef<HTMLDivElement>(null)

  // Typewriter
  useEffect(() => {
    const el = twRef.current
    if (!el) return

    let roleIndex = 0, charIndex = 0, isDeleting = false, isPaused = false
    const TYPING   = 80
    const DELETING = 45
    const PAUSE    = 1800
    const GAP      = 300

    function tick() {
      const current = ROLES[roleIndex]
      if (isDeleting) {
        el!.textContent = current.slice(0, charIndex - 1)
        charIndex--
      } else {
        el!.textContent = current.slice(0, charIndex + 1)
        charIndex++
      }
      if (!isDeleting && charIndex === current.length) {
        if (isPaused) return
        isPaused = true
        setTimeout(() => { isPaused = false; isDeleting = true; tick() }, PAUSE)
        return
      }
      if (isDeleting && charIndex === 0) {
        isDeleting = false
        roleIndex  = (roleIndex + 1) % ROLES.length
        setTimeout(tick, GAP)
        return
      }
      setTimeout(tick, isDeleting ? DELETING : TYPING)
    }
    const t = setTimeout(tick, 600)
    return () => clearTimeout(t)
  }, [])

  // Aurora mouse parallax
  useEffect(() => {
    let ticking = false
    function onMove(e: MouseEvent) {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const mx = (e.clientX / window.innerWidth  - 0.5) * 2
        const my = (e.clientY / window.innerHeight - 0.5) * 2
        if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${mx*20}px,${my*20}px)`
        if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${mx*-15}px,${my*-15}px)`
        if (orb3Ref.current) orb3Ref.current.style.transform = `translate(${mx*10}px,${my*10}px)`
        ticking = false
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72
    window.scrollTo({ top: el.offsetTop - navH, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero" aria-label="Hero">
      {/* Aurora */}
      <div className="aurora" aria-hidden="true">
        <div className="aurora-orb aurora-orb-1" ref={orb1Ref} />
        <div className="aurora-orb aurora-orb-2" ref={orb2Ref} />
        <div className="aurora-orb aurora-orb-3" ref={orb3Ref} />
        <div className="aurora-grid" />
      </div>

      <div className="hero-content">
        <div className="hero-two-col">

          {/* ── Left column ── */}
          <div className="hero-left">
            {/* Badge */}
            <div className="hero-badge">
              <span className="badge-dot" aria-hidden="true" />
              Open to Internships &amp; Roles
            </div>

            {/* Name */}
            <h1 className="hero-name">
              Muhammad<br />
              <span className="hero-name-accent">Usman Al Haq</span>
            </h1>

            {/* Typewriter */}
            <div className="hero-typewriter" aria-live="polite">
              <span className="typewriter-prefix">I build as a </span>
              <span className="typewriter-text" ref={twRef} />
              <span className="typewriter-cursor" aria-hidden="true">|</span>
            </div>

            {/* Pitch */}
            <p className="hero-pitch">
              Third-year CS student at FAST-NUCES building production-grade software across web, mobile,
              and high-performance computing.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fit-content' }}>
              {/* CTAs */}
              <div className="hero-ctas">
                <button className="btn btn-accent btn-lg" id="hero-view-work-btn" onClick={() => scrollTo('projects')}>
                  <span>View My Work</span>
                  <svg className="btn-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
                <a href="/Muhammad_Usman_AlHaq_Resume.pdf" download className="btn btn-ghost btn-lg" id="hero-resume-btn">
                  <span>Download Resume</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </a>
              </div>
              {/* Social Links */}
              <div className="hero-socials" style={{ display: 'flex', gap: '2rem', margin: '1.5rem 0' }}>
                <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--muted)', transition: 'color 0.2s', display: 'flex' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://github.com/muhammadusmanalhaq" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--muted)', transition: 'color 0.2s', display: 'flex' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=muhammadusmanalhaq@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail" style={{ color: 'var(--muted)', transition: 'color 0.2s', display: 'flex' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                </a>
              </div>
  
              {/* Stats */}
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-num">6+</span>
                  <span className="stat-label">Featured Projects</span>
                </div>
                <div className="stat-divider" aria-hidden="true" />
                <div className="stat-item">
                  <span className="stat-num">ICPC</span>
                  <span className="stat-label">Asia Regionalist</span>
                </div>
                <div className="stat-divider" aria-hidden="true" />
                <div className="stat-item">
                  <span className="stat-num">1</span>
                  <span className="stat-label">Industry Internship</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column — Photo ── */}
          <div className="hero-right">
            <div 
              className="hero-photo-wrap" 
              onClick={() => setLightbox({ url: '/me.jpeg', type: 'image' })}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              aria-label="View full profile photo"
              onKeyDown={e => e.key === 'Enter' && setLightbox({ url: '/me.jpeg', type: 'image' })}
            >
              <div className="hero-photo-ring">
                <Image
                  src="/me.jpeg"
                  alt="Muhammad Usman Al Haq"
                  width={300}
                  height={370}
                  className="hero-photo-img"
                  priority
                />
              </div>
              {/* Decorative corner accents */}
              <span className="hero-photo-corner tl" aria-hidden="true" />
              <span className="hero-photo-corner tr" aria-hidden="true" />
              <span className="hero-photo-corner bl" aria-hidden="true" />
              <span className="hero-photo-corner br" aria-hidden="true" />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>

      <GlobalLightbox media={lightbox} onClose={() => setLightbox(null)} />
    </section>
  )
}
