'use client'

import { useEffect, useRef, useState } from 'react'
import GlobalLightbox from './GlobalLightbox'

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [lightbox, setLightbox] = useState<{url: string, type: 'image'} | null>(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal')
    if (!items?.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        setTimeout(() => entry.target.classList.add('visible'), 0)
        obs.unobserve(entry.target)
      })
    }, { threshold: 0.08 })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" className="section section-alt" ref={sectionRef} aria-label="Work experience">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Professional Work</div>
          <h2 className="section-title">Experience</h2>
        </div>

        <div className="timeline">
          <div className="timeline-item reveal">
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-content glass-card">
              <div className="exp-header">
                <div>
                  <h3 className="exp-role">Web Development Intern</h3>
                  <div className="exp-company">
                    Kuwait Kazmah Center (KKC)
                    <span className="exp-location"> — Hawally, Kuwait</span>
                  </div>
                </div>
                <div className="exp-meta">
                  <span className="exp-date">Jun – Aug 2025</span>
                  <span className="exp-badge">On-site</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <ul className="exp-list" role="list">
                    <li>
                      Redesigned{' '}
                      <a href="https://kkc.com.kw" target="_blank" rel="noopener noreferrer" className="inline-link">
                        kkc.com.kw
                      </a>{' '}
                      end-to-end using WordPress — improved UX and visual consistency across all pages
                    </li>
                    <li>
                      Launched the company&apos;s Instagram presence from scratch; created the first 15 posts on Canva to
                      establish brand identity
                    </li>
                    <li>
                      Designed bilingual (English &amp; Arabic) customer feedback Google Forms for structured review
                      collection
                    </li>
                    <li>
                      Migrated company records to Microsoft Access and wrote optimized queries for improved data retrieval
                    </li>
                  </ul>

                  <div className="exp-note">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                    Internship Terms of Reference letter issued by KKC, signed by Operations &amp; Executive Director
                  </div>
                </div>

                <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button 
                    onClick={() => setLightbox({ url: '/Internship%20Certificate.jpg', type: 'image' })} 
                    aria-label="View Internship Certificate"
                    style={{ display: 'inline-block', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', background: 'none', padding: 0 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/Internship%20Certificate.jpg" alt="Internship Certificate" style={{ width: '100%', maxWidth: '240px', display: 'block' }} />
                  </button>
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
