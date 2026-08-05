'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import GlobalLightbox from './GlobalLightbox'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [lightbox, setLightbox] = useState<{url: string, type: 'image'} | null>(null)

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
        <div className="section-header reveal">
          <div className="section-label">Who I Am</div>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid-new">
          {/* Bio text — 50% left */}
          <div className="about-text reveal">
            <p className="about-lead">
              I&apos;m a third-year Computer Science student at{' '}
              <span className="text-accent">FAST-NUCES Islamabad</span>, entering my final year in August 2026.
            </p>
            <p className="about-body">
              My core focus is on building highly scalable, production-ready cloud architectures and robust CI/CD deployment pipelines. 
              While I have deep experience across the full stack—building Next.js frontends and Kotlin mobile apps—my true passion lies in 
              <span className="text-accent"> DevOps, Azure Infrastructure, and .NET Backend Engineering</span>.
            </p>
            <p className="about-body">
              I specialize in Infrastructure as Code (Azure Bicep), automated testing workflows via GitHub Actions, and designing 
              secure microservices with Row-Level Security in PostgreSQL. Beyond cloud engineering, I am an 
              <span className="text-accent"> ICPC Asia Topi Regionalist (2025)</span> with a strong foundation in high-performance computing and C++ CUDA optimization.
            </p>

            <div className="about-tags">
              <span className="tag">☁️ Cloud & DevOps</span>
              <span className="tag">⚙️ .NET Core Engineering</span>
              <span className="tag">🏆 ICPC Regionalist</span>
              <span className="tag">📍 Islamabad, Pakistan</span>
            </div>

            <div className="about-langs">
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
          
          {/* Image Card - 50% right */}
          <div className="about-image-card reveal">
            <div className="deployment-console">
              {/* Top Bar */}
              <div className="console-header">
                <div className="console-controls">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="console-title">
                  <span className="status-blink" /> servicedesk.vercel.app
                </div>
              </div>

              {/* Photo Area */}
              <div
                className="console-photo-area"
                onClick={() => setLightbox({ url: '/me.jpeg', type: 'image' })}
                role="button"
                tabIndex={0}
                aria-label="View full profile photo"
                onKeyDown={e => e.key === 'Enter' && setLightbox({ url: '/me.jpeg', type: 'image' })}
              >
                <Image
                  src="/me.jpeg"
                  alt="Muhammad Usman Al Haq"
                  width={320}
                  height={380}
                  className="console-photo"
                  priority
                />
                <div className="photo-overlay-gradient" />
              </div>

              {/* Deployment Checks */}
              <div className="console-footer">
                <div className="check-grid">
                  <div className="check-item"><span className="check-icon">✓</span> CI/CD Active</div>
                  <div className="check-item"><span className="check-icon">✓</span> Tests Pass</div>
                  <div className="check-item"><span className="check-icon">✓</span> Azure Bicep</div>
                  <div className="check-item"><span className="check-icon">✓</span> OIDC Configured</div>
                  <div className="check-item"><span className="check-icon">✓</span> Key Vault</div>
                  <div className="check-item"><span className="check-icon">✓</span> Row-Level Security</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GlobalLightbox media={lightbox} onClose={() => setLightbox(null)} />
    </section>
  )
}
