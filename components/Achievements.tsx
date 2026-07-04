'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import GlobalLightbox from './GlobalLightbox'

/* ── Types ───────────────────────────────────────────────────── */
interface AchievementItem {
  id: string
  icon: React.ReactNode
  title: string
  desc: string
  tag: string
  image?: string
  credentialLink?: string
  date?: string
  gridColumn?: string
}

/* ── Data ────────────────────────────────────────────────────── */
const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'icpc',
    icon: '🏆',
    title: 'ICPC Asia Topi Regionalist 2025',
    desc: 'Represented FAST-NUCES Islamabad at GIK Institute. Cleared the qualifying online round among top competitive programming teams across Pakistan.',
    tag: 'Competitive Programming',
    image: '/icpc.jpg',
  },
  {
    id: 'hackathon',
    icon: '⚡',
    title: 'National AI Hackathon 2026',
    desc: 'Participated in the National AI Hackathon, Jun 16–17, 2026 — showcasing an AI-powered solution under time pressure.',
    tag: 'Innovation',
    image: '/certificates/hackathon-certificate.jpg',
  },
  {
    id: 'sap',
    icon: '📊',
    title: 'Strategic Analysis and Solution Design',
    desc: 'Completed SAP\'s Strategic Analysis and Solution Design professional certificate via Coursera, covering enterprise architecture and structured problem-solving methodologies.',
    tag: 'Certification',
    image: '/certificates/sap-strategic-analysis.jpg',
    credentialLink: 'https://coursera.org/verify/KNUPQLG81Z76',
    date: 'June 27, 2026',
  },
  {
    id: 'azure',
    icon: '☁️',
    title: 'Essentials with Azure Fundamentals',
    desc: 'Earned the Microsoft Azure Fundamentals certification via Coursera, demonstrating foundational knowledge of cloud services, Azure architecture, and core Microsoft Azure solutions.',
    tag: 'Certification',
    image: '/certificates/azure-fundamentals.jpg',
    credentialLink: 'https://coursera.org/verify/QBAM6XM60I1B',
    date: 'June 23, 2026',
  },
  {
    id: 'computer-fundamentals',
    icon: '💻',
    title: 'Computer Fundamentals Certification',
    desc: 'Completed certification in Computer Fundamentals from IT Ronix Solutions, establishing a solid foundation in core computing concepts and systems.',
    tag: 'Certification',
    image: '/computer funadamentals.jpg',
  },
  {
    id: 'chess',
    icon: null,
    title: 'Competitive Chess Player',
    desc: 'A 1744-rated chess player — demonstrating analytical thinking, pattern recognition, and long-term strategic planning under pressure.',
    tag: 'Strategy & Analytics',
  },
  {
    id: 'red-crescent',
    icon: '🌱',
    title: 'Red Crescent Society — Tree Planting Initiative',
    desc: 'Led a civic initiative under Red Crescent Society Islamabad — self-funded and planted 70+ trees, contributing to environmental sustainability.',
    tag: 'Community Leadership',
    gridColumn: '1 / -1',
  },
]

/* ── Sub-component: Chess icon ───────────────────────────────── */
function ChessIcon({ size = 32 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="#769656" width={size} height={size}>
      <path d="M215.5 224c29.2-14.6 52.4-42.5 52.4-76c0-48.6-39.4-88-88-88s-88 39.4-88 88c0 33.5 23.2 61.4 52.4 76c-48.4 17.6-76 65.6-76 116v16h184v-16c0-50.4-27.6-98.4-76-116zm-175.5 192h240v32h-240v-32zm240 64h-240v32h240v-32z"/>
    </svg>
  )
}

/* ── Sub-component: Certificate image ────────────────────────── */
function CertImage({ image, title, onClick }: { image: string; title: string; onClick: () => void }) {
  return (
    <div
      className="cert-image-wrap"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View full certificate: ${title}`}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <Image
        src={image}
        alt={`${title} certificate`}
        fill
        sizes="(max-width: 600px) 100vw, 480px"
        style={{ objectFit: 'contain' }}
        loading="lazy"
      />
      <div className="cert-image-overlay">
        <span className="cert-overlay-label">View Full Size ↗</span>
      </div>
    </div>
  )
}

/* ── Main component ───────────────────────────────────────────── */
export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)
  const [lightbox, setLightbox] = useState<{url: string, type: 'image' | 'video'} | null>(null)

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
    }, { threshold: 0.08 })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="achievements" className="section section-alt" ref={sectionRef} aria-label="Achievements">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Milestones</div>
          <h2 className="section-title">Achievements</h2>
        </div>

        <div className="achievements-grid">
          {ACHIEVEMENTS.map(item => (
            <div
              key={item.id}
              className="achievement-card glass-card reveal"
              style={item.gridColumn ? { gridColumn: item.gridColumn } : undefined}
            >
              <div className="achievement-card-inner">
                {/* Icon */}
                <div
                  className="achievement-icon-wrap"
                  aria-hidden="true"
                  style={item.id === 'chess' ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : undefined}
                >
                  {item.id === 'chess' ? (
                    <span className="achievement-icon" style={{ display: 'flex' }}>
                      <ChessIcon size={32} />
                    </span>
                  ) : (
                    <span className="achievement-icon">{item.icon}</span>
                  )}
                </div>

                {/* Body */}
                <div className="achievement-body">
                  {/* Chess rating display */}
                  {item.id === 'chess' && (
                    <div className="chess-stat" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ChessIcon size={16} />
                      <span>1744</span>
                      <span className="chess-stat-label">Rating</span>
                    </div>
                  )}

                  <h3 className="achievement-title">{item.title}</h3>
                  <p className="achievement-desc">{item.desc}</p>
                  <span className="achievement-tag">{item.tag}</span>
                </div>
              </div>

              {/* Certificate image (if present) */}
              {item.image && (
                <CertImage image={item.image} title={item.title} onClick={() => setLightbox({ url: item.image!, type: 'image' })} />
              )}

              {/* Credential link + date row */}
              {(item.credentialLink || item.date) && (
                <div className="cert-actions">
                  {item.date && <span className="cert-date">{item.date}</span>}
                  {item.credentialLink && (
                    <a
                      href={item.credentialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-verify-link"
                      onClick={e => e.stopPropagation()}
                    >
                      Verify Credential ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <GlobalLightbox media={lightbox} onClose={() => setLightbox(null)} />
    </section>
  )
}
