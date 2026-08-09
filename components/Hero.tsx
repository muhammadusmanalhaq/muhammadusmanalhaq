'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const orb1Ref  = useRef<HTMLDivElement>(null)
  const orb2Ref  = useRef<HTMLDivElement>(null)
  const orb3Ref  = useRef<HTMLDivElement>(null)

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

      <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '90vh', position: 'relative', zIndex: 10 }}>
        
        {/* Creative Typographic Centerpiece */}
        <div className="hero-typography" style={{ position: 'relative', margin: '20px 0 0 0' }}>
          {/* Subtle glowing orb right behind the text */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 60%)', filter: 'blur(40px)', zIndex: -1 }} />
          
          <h1 style={{ fontSize: 'clamp(44px, 7vw, 110px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-2px', textTransform: 'uppercase', margin: 0, animation: 'fadeInDown 0.8s 0.1s ease both', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'baseline', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--muted)', fontWeight: 300 }}>Muhammad</span>
              <span style={{ color: 'var(--text)' }}>Usman</span>
            </div>
            <span style={{ WebkitTextStroke: '2px var(--accent)', color: 'transparent', opacity: 0.9 }}>Al Haq</span>
          </h1>
        </div>

        {/* Roles - Elegant Line Layout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '40px 0 48px 0', width: '100%', maxWidth: '700px', animation: 'fadeInUp 0.8s 0.2s ease both' }}>
          <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.5))' }} />
          <h2 style={{ fontSize: 'clamp(11px, 3vw, 16px)', fontWeight: 600, color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', margin: 0, textAlign: 'center', whiteSpace: 'normal', lineHeight: 1.4 }}>
            Cloud / DevOps <span style={{ color: 'var(--accent)', margin: '0 8px', display: 'inline-block' }}>✦</span> .NET Full-Stack
          </h2>
          <span style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(56, 189, 248, 0.5))' }} />
        </div>        {/* Glassmorphic Social Pill */}
        <div style={{ display: 'inline-flex', padding: '16px 40px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '100px', backdropFilter: 'blur(12px)', gap: '40px', marginBottom: '56px', animation: 'fadeInUp 0.8s 0.3s ease both', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)', position: 'relative', zIndex: 20 }}>
          <a href="https://pk.linkedin.com/in/muhammad-usman-al-haq-05a321315" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--muted)', transition: 'all 0.3s', display: 'flex', position: 'relative', zIndex: 30, pointerEvents: 'auto' }} onMouseOver={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1.15) translateY(-2px)' }} onMouseOut={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.transform = 'scale(1) translateY(0)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://github.com/muhammadusmanalhaq" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--muted)', transition: 'all 0.3s', display: 'flex', position: 'relative', zIndex: 30, pointerEvents: 'auto' }} onMouseOver={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1.15) translateY(-2px)' }} onMouseOut={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.transform = 'scale(1) translateY(0)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=muhammadusmanalhaq@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Gmail" style={{ color: 'var(--muted)', transition: 'all 0.3s', display: 'flex', position: 'relative', zIndex: 30, pointerEvents: 'auto' }} onMouseOver={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1.15) translateY(-2px)' }} onMouseOut={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.transform = 'scale(1) translateY(0)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
          </a>
        </div>

        {/* CTAs */}
        <div className="hero-ctas" style={{ display: 'flex', gap: '20px', animation: 'fadeInUp 0.8s 0.4s ease both', marginTop: '16px', position: 'relative', zIndex: 30, pointerEvents: 'auto' }}>
          <button onClick={() => scrollTo('projects')} style={{ background: 'rgba(13, 148, 136, 0.1)', border: '1px solid rgba(13, 148, 136, 0.3)', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', transition: 'all 0.3s', padding: '14px 28px', backdropFilter: 'blur(10px)' }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(13, 148, 136, 0.2)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(13, 148, 136, 0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(13, 148, 136, 0.1)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'rgba(13, 148, 136, 0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            View Projects
          </button>
          <a href="/Muhammad_Usman_AlHaq_Resume.pdf" download style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', transition: 'all 0.3s', padding: '14px 28px', backdropFilter: 'blur(10px)' }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            Resume
          </a>
        </div>

      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
