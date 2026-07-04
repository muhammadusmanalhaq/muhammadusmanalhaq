'use client'

import { useEffect, useRef } from 'react'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal')
    if (!items?.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal:not(.visible)') ?? [])
        const idx = siblings.indexOf(entry.target as HTMLElement)
        setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 100, 400))
        obs.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="section" ref={sectionRef} aria-label="About me">
      <div className="container">
        <div className="section-header reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="section-label">Who I Am</div>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          {/* Bio text — full width now that photo is in the Hero */}
          <div className="about-text reveal">
            <p className="about-lead">
              I&apos;m a third-year Computer Science student at{' '}
              <span className="text-accent">FAST-NUCES Islamabad</span>, entering my final year in August 2026.
            </p>
            <p className="about-body">
              I build across the full stack — from Next.js web apps and Kotlin Android apps to CUDA GPU
              kernels and JavaFX desktop software. I&apos;m an{' '}
              <span className="text-accent">ICPC Asia Topi Regionalist (2025)</span> with real client delivery
              experience as a Web Development Intern in Kuwait.
            </p>
            <p className="about-body">
              Beyond standard development, I have a strong interest in high-performance computing. I recently
              conducted research on 2D image convolution, benchmarking various implementations
              across different consumer hardware to analyze performance bottlenecks.
            </p>

            <div className="about-tags" style={{ justifyContent: 'center' }}>
              <span className="tag">🏆 ICPC Regionalist</span>
              <span className="tag">🔬 HPC Research</span>
              <span className="tag">🌍 Web Dev Intern — Kuwait</span>
              <span className="tag">📍 Islamabad, Pakistan</span>
            </div>

            <div className="about-langs" style={{ justifyContent: 'center' }}>
              {[
                { lang: 'English', level: 'Professional' },
                { lang: 'Urdu',    level: 'Native'       },
                { lang: 'Hindi',   level: 'Working'      },
                { lang: 'Arabic',  level: 'Elementary'   },
              ].map(({ lang, level }) => (
                <div className="lang-chip" key={lang}>
                  <span className="lang-chip-name">{lang}</span>
                  <span className="lang-chip-level">· {level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
