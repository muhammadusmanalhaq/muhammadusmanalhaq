'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

type Filter = 'all' | 'web' | 'mobile' | 'hpc' | 'ai' | 'cloud'

/* ── Lightbox component ─────────────────────────────────────── */
function Lightbox({ images, startIdx, onClose }: {
  images: string[]; startIdx: number; onClose: () => void
}) {
  const [idx, setIdx] = useState(startIdx)

  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length])

  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose, prev, next])

  const isPdf = images[idx]?.endsWith('.pdf')

  const content = (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image viewer" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
      <div className="lightbox-inner" onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>✕</button>

        {isPdf ? (
          <div className="lightbox-pdf-wrap">
            <div className="lightbox-pdf-msg">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              <p>UI Design PDF</p>
              <a href={images[idx]} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                Open PDF ↗
              </a>
            </div>
          </div>
        ) : images[idx]?.endsWith('.mp4') ? (
          <div className="lightbox-video-wrap" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <video src={images[idx]} controls autoPlay playsInline preload="auto" style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '8px' }} />
          </div>
        ) : (
          <div className="lightbox-img-wrap" style={{ position: 'relative', width: '90vw', height: '90vh', maxWidth: '1600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image 
              src={images[idx]} 
              alt={`Screenshot ${idx + 1}`} 
              fill 
              sizes="100vw"
              style={{ objectFit: 'contain', width: '100%', height: '100%' }} 
            />
          </div>
        )}

        {images.length > 1 && (
          <>
            <button className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Previous">‹</button>
            <button className="lightbox-nav lightbox-next" onClick={next} aria-label="Next">›</button>
            <div className="lightbox-dots">
              {images.map((_, i) => (
                <button key={i} className={`lightbox-dot${i === idx ? ' active' : ''}`}
                  onClick={() => setIdx(i)} aria-label={`Go to image ${i + 1}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )

  return mounted ? createPortal(content, document.body) : null
}

/* ── Single large preview with dot pagination ───────────────── */
function ProjectPreview({ images, label, priority = false }: { images: string[]; label: string; priority?: boolean }) {
  const [activeIdx, setActiveIdx]     = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  if (!images.length) return null

  const isPdf = images[0]?.endsWith('.pdf')

  // For PDF-first entries, show cover image or PDF thumb
  if (isPdf) {
    const coverSrc = images[1] // optional cover webp next to pdf
    return (
      <>
        <div className="project-preview-panel">
          <div className="project-browser-bar">
            <span className="browser-dot browser-dot-red" />
            <span className="browser-dot browser-dot-yellow" />
            <span className="browser-dot browser-dot-green" />
            <span className="browser-bar-label">{label}</span>
          </div>
          <div
            className="project-preview-img-wrap"
            onClick={e => { e.stopPropagation(); setLightboxIdx(0); }}
            role="button"
            tabIndex={0}
            aria-label={`Open ${label} PDF`}
            onKeyDown={e => { if (e.key === 'Enter') { e.stopPropagation(); setLightboxIdx(0); } }}
          >
            {coverSrc ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverSrc} alt={`${label} cover`} className="project-preview-img" loading={priority ? undefined : "lazy"} decoding={priority ? undefined : "async"} />
                <div className="cert-image-overlay">
                  <span className="cert-overlay-label">Open PDF ↗</span>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12, color: 'var(--accent)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>View UI PDF</span>
              </div>
            )}
          </div>
        </div>
        {lightboxIdx !== null && (
          <Lightbox images={images} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </>
    )
  }

  return (
    <>
      <div className="project-preview-panel">
        {/* Browser chrome bar */}
        <div className="project-browser-bar">
          <span className="browser-dot browser-dot-red" />
          <span className="browser-dot browser-dot-yellow" />
          <span className="browser-dot browser-dot-green" />
          <span className="browser-bar-label">{label}</span>
        </div>

        {/* Large single preview image */}
        <div
          className="project-preview-img-wrap"
          onClick={e => { e.stopPropagation(); setLightboxIdx(activeIdx); }}
          role="button"
          tabIndex={0}
          aria-label={`View full screenshot ${activeIdx + 1} of ${label}`}
          onKeyDown={e => { if (e.key === 'Enter') { e.stopPropagation(); setLightboxIdx(activeIdx); } }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[activeIdx]}
            alt={`${label} screenshot ${activeIdx + 1}`}
            className="project-preview-img"
            loading={priority ? undefined : "lazy"}
            decoding={priority ? undefined : "async"}
          />
          <div className="cert-image-overlay">
            <span className="cert-overlay-label">View Full Size ↗</span>
          </div>
        </div>

        {/* Dot pagination */}
        {images.length > 1 && (
          <div className="project-preview-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`preview-dot${i === activeIdx ? ' active' : ''}`}
                onClick={e => { e.stopPropagation(); setActiveIdx(i) }}
                aria-label={`Show screenshot ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxIdx !== null && (
        <Lightbox images={images} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  )
}

/* ── Project data ───────────────────────────────────────────── */
const POS_IMGS = [
  '/projects/pos/dashboard.webp',
  '/projects/pos/POS.webp',
  '/projects/pos/login.webp',
  '/projects/pos/Manage Products.webp',
  '/projects/pos/Manage Cashiers.webp',
  '/projects/pos/Manage Discounts.webp',
  '/projects/pos/Manage Managers.webp',
  '/projects/pos/Sales Reports.webp',
  '/projects/pos/Inventory Reports.webp',
  '/projects/pos/Cashier Performance.webp',
  '/projects/pos/Discount Reports.webp',
  '/projects/pos/Flop Products.webp',
]

const FASTPAY_IMGS = [
  '/projects/fastpay/authentication.webp',
  '/projects/fastpay/dashboard.webp',
  '/projects/fastpay/send_money.webp',
  '/projects/fastpay/bills_payment.webp',
  '/projects/fastpay/qr_code_slip.webp',
  '/projects/fastpay/transaction_log.webp',
  '/projects/fastpay/new_partition.webp',
  '/projects/fastpay/add_money_dialog.webp',
  '/projects/fastpay/bank_topup.webp',
  '/projects/fastpay/manage_card.webp',
  '/projects/fastpay/raast.webp',
  '/projects/fastpay/mobile_topup.webp',
  '/projects/fastpay/donations.webp',
]

const LISTIT_IMGS = ['/projects/ListIt-UI.pdf', '/projects/list-it-cover.webp']

const RACE_IMGS = [
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_30_06.webp',
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_30_35.webp',
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_31_20.webp',
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_32_05.webp',
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_31_45.webp',
]

const SERVICEDESK_IMGS = [
  '/projects/serviceDesk/screencapture-service-desk-mauve-vercel-app-2026-08-05-08_05_11.webp',
  '/projects/serviceDesk/screencapture-service-desk-mauve-vercel-app-tickets-2026-08-05-08_05_46.webp',
  '/projects/serviceDesk/screencapture-service-desk-mauve-vercel-app-audit-2026-08-05-08_06_32.webp',
  '/projects/serviceDesk/screencapture-service-desk-mauve-vercel-app-assets-2026-08-05-08_06_07.webp',
]

type ProjectData = {
  id: string
  category: Filter
  badgeClass: string
  badgeLabel: string
  stat: string
  title: string
  summary: string
  finding: string | null
  tech: string[]
  href: string
  images: string[]
}

const PROJECTS: ProjectData[] = [
  {
    id: 'servicedesk',
    category: 'cloud',
    badgeClass: 'badge-cloud',
    badgeLabel: 'Cloud / DevOps · Full-Stack',
    stat: 'RLS · IaC · CI/CD',
    title: 'ServiceDesk: Enterprise IT Ticketing & Asset Management Platform',
    summary:
      'I designed and built a multi-tenant IT service desk on ASP.NET Core 8 and Next.js, enforcing department-level data isolation with PostgreSQL Row-Level Security at the database layer instead of application-side checks. I shipped a full DevOps pipeline around it — GitHub Actions running real integration tests against a live Postgres container, Docker images promoted through a staged deployment with a manual production approval gate, and every Azure resource (Container Apps, Key Vault, Application Insights) defined as code in Bicep. Secrets never live as long-lived credentials: the pipeline authenticates to Azure via OIDC federation, and the running container reads its connection strings from Key Vault through a Managed Identity.',
    finding: null,
    tech: ['ASP.NET Core 8', 'C#', 'PostgreSQL', 'Next.js', 'Azure Container Apps', 'Docker', 'GitHub Actions', 'Bicep', 'Azure Key Vault', 'Hangfire'],
    href: 'https://service-desk-mauve.vercel.app',
    images: SERVICEDESK_IMGS,
  },
  {
    id: 'hpc-research',
    category: 'hpc',
    badgeClass: 'badge-hpc',
    badgeLabel: 'HPC / Research',
    stat: 'Performance Analysis',
    title: 'Parallel Computing Research: 2D Image Convolution',
    summary:
      'I benchmarked 2D Gaussian convolution across multiple implementations, including sequential C++, CUDA shared-memory tiling, and AVX2 with OpenMP. I analyzed the performance across different image resolutions to understand hardware-level bottlenecks.',
    finding: 'Analyzed PCIe transfer overhead and its impact on overall GPU compute time.',
    tech: ['C++', 'CUDA 12.0', 'OpenMP', 'AVX2 SIMD', 'Ubuntu 24.04'],
    href: '#',
    images: [],
  },
  {
    id: 'cinebook',
    category: 'web',
    badgeClass: 'badge-web',
    badgeLabel: 'Full-Stack Web',
    stat: 'JWT & Role Auth',
    title: 'CineBook Pro: Online Cinema Ticket Booking System',
    summary:
      'I built a production-grade cinema booking platform with TMDB API integration, interactive seat maps with Framer Motion, JWT "Remember Me" sessions, bcrypt auth, a role-based admin dashboard, and deployed it on Vercel.',
    finding: null,
    tech: ['Next.js 14', 'MongoDB', 'NextAuth.js', 'TMDB API', 'Tailwind', 'Vercel'],
    href: '#',
    images: [
      '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-admin-2026-06-14-07_27_03.webp',
      '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-movies-2026-06-14-07_28_02.webp',
      '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-movies-6a05681cb48251208c4a6a46-2026-06-14-07_28_30.webp',
      '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-profile-bookings-2026-06-14-07_26_18.webp',
      '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-admin-halls-2026-06-14-07_27_23.webp',
      '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-admin-users-2026-06-14-07_27_41.webp',
    ],
  },
  {
    id: 'fastpay',
    category: 'web',
    badgeClass: 'badge-web',
    badgeLabel: 'Fintech · Full-Stack',
    stat: 'ACID ledger · RLS',
    title: 'FastPay: Enterprise Digital Wallet & P2P Ledger',
    summary:
      'I designed and built a dual-interface fintech ecosystem — a JavaFX desktop client and a Next.js web portal. I implemented an ACID double-entry ledger, virtual budget partitioning, QR payment slips, 26+ utility billers with O(1) filtering, and Postgres Row Level Security.',
    finding: null,
    tech: ['Java 17', 'JavaFX', 'Next.js 14', 'Supabase', 'PostgreSQL', 'TypeScript'],
    href: '#',
    images: FASTPAY_IMGS,
  },
  {
    id: 'listit',
    category: 'mobile',
    badgeClass: 'badge-mobile',
    badgeLabel: 'Android App',
    stat: 'Offline-first sync',
    title: 'List It: C2C Classified Marketplace App',
    summary:
      'I built a full-featured OLX-style Android marketplace. I designed an offline-first SQLite caching system with auto-sync, a monetary offer flow, multi-image uploads, Google Maps location picker, real-time chat, and Agora voice/video calling.',
    finding: null,
    tech: ['Kotlin', 'Firebase', 'MySQL', 'PHP', 'Agora API', 'SQLite'],
    href: '#',
    images: LISTIT_IMGS,
  },
  {
    id: 'race',
    category: 'ai',
    badgeClass: 'badge-ai',
    badgeLabel: 'AI / ML',
    stat: '50% accuracy · 70K rows',
    title: 'RACE: Reading Comprehension & Quiz Generation',
    summary:
      'I trained a quiz generation system on the RACE dataset (70K+ rows) using zero deep learning — entirely classical ML. My dual-pipeline approach covers MCQ generation and distractor synthesis. Using Label Spreading with only 10% labeled data, I achieved 50% accuracy.',
    finding: null,
    tech: ['Python', 'Scikit-learn', 'Streamlit', 'TF-IDF', 'NLP'],
    href: '#',
    images: RACE_IMGS,
  },
  {
    id: 'socially',
    category: 'mobile',
    badgeClass: 'badge-mobile',
    badgeLabel: 'Android App',
    stat: 'Figma → Kotlin',
    title: 'Socially: Instagram-Clone Android App',
    summary:
      'I designed every screen in Figma first, then replicated them in Kotlin. I built a complete Instagram reimagining with post feed, stories, likes, comments, real-time Firestore sync, Agora voice/video calling, and Firebase Cloud Messaging.',
    finding: null,
    tech: ['Kotlin', 'Firebase Firestore', 'Agora API', 'FCM', 'Figma'],
    href: '#',
    images: [],
  },
  {
    id: 'swiftcart',
    category: 'web',
    badgeClass: 'badge-web',
    badgeLabel: 'Desktop POS',
    stat: 'ACID transactions',
    title: 'SwiftCart: Desktop POS System',
    summary:
      'I built a retail POS navigable entirely by keyboard shortcuts with ACID transactions, cashier/manager roles, and real-time inventory.',
    finding: null,
    tech: ['JavaFX', 'SQL Server'],
    href: '#',
    images: POS_IMGS,
  },
]

const MORE = [
  { name: 'TravelEase – Travel Management App', tech: 'C# · .NET WinForms',   desc: 'I implemented 6 user roles and custom SQL profit/loss and travel trend reports.', images: [] },
  { name: 'Airplane Sync Simulation',           tech: 'C++ · Semaphores',     desc: 'I modelled a three-track airport with semaphore/mutex priority scheduling and a custom real-time GUI.', images: [] },
  { name: 'Plant vs. Zombies Clone',            tech: 'C++ · SFML',           desc: 'I built a fully playable PvZ clone from scratch with custom game loop, collision, and wave systems.', images: ['/projects/plantsvszombie.mp4'], poster: '/projects/plantsvszombie_poster.jpg' },
  { name: 'Centipede Arcade Game',              tech: 'C++ · SFML',           desc: 'I cloned the classic Centipede arcade game with progressive difficulty and a scoreboard.', images: [] },
  { name: 'Mini GitHub (Git Clone)',             tech: 'C++ · Data Structures', desc: 'I built a command-line VCS replicating core git operations using custom data structures.', images: [] },
]

/* ── More project item with optional gallery ────────────────── */
function MoreProjectItem({ item }: { item: typeof MORE[0] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  return (
    <div className="more-project-item glass-card">
      <div className="more-project-header">
        <span className="more-project-name">{item.name}</span>
        <span className="more-project-tech mono">{item.tech}</span>
      </div>
      <p className="more-project-desc">{item.desc}</p>
      {item.images.length > 0 && (
        <>
          {item.images[0]?.endsWith('.mp4') ? (
            <div className="more-project-video-container" style={{ marginTop: '1rem', position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
              <video
                src={`${item.images[0]}#t=0.1`}
                poster={'poster' in item ? (item as Record<string, unknown>).poster as string : undefined}
                preload="metadata"
                onClick={() => setLightboxIdx(0)}
                title={`Play ${item.name} Video`}
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block', cursor: 'pointer' }}
              />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 3 }}>
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="more-project-thumbs">
              {item.images.slice(0, 3).map((src, i) => (
                <button key={i} className="more-project-thumb" onClick={() => setLightboxIdx(i)} aria-label={`View screenshot ${i + 1}`}>
                  <Image src={src} alt={`Screenshot ${i + 1}`} className="more-project-thumb-img" fill sizes="(max-width: 768px) 33vw, 20vw" />
                  {i === 2 && item.images.length > 3 && (
                    <div className="project-thumb-more">+{item.images.length - 3}</div>
                  )}
                </button>
              ))}
            </div>
          )}
          {lightboxIdx !== null && (
            <Lightbox images={item.images} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
          )}
        </>
      )}
    </div>
  )
}

/* ── Filter label mapping ──────────────────────────────────── */
const FILTER_LABELS: Record<Filter, string> = {
  all:    'All',
  web:    'Web',
  mobile: 'Mobile',
  hpc:    'HPC / Systems',
  ai:     'AI / ML',
  cloud:  'Cloud / DevOps',
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal')
    if (!items?.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal:not(.visible)') ?? [])
        const idx = siblings.indexOf(entry.target as HTMLElement)
        setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 80, 400))
        obs.unobserve(entry.target)
      })
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // 'all' excludes socially (no images — hidden pending screenshots)
  const visible = PROJECTS.filter(p =>
    filter === 'all' ? p.id !== 'socially' : p.category === filter
  )

  return (
    <section id="projects" className="section" ref={sectionRef} aria-label="Featured projects">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">What I&apos;ve Built</div>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Filter bar */}
        <div className="filter-bar reveal" role="tablist" aria-label="Filter by category">
          {(Object.keys(FILTER_LABELS) as Filter[]).map(f => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
              role="tab"
              aria-selected={filter === f}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>

        {/* Cards grid — single column, two-panel layout */}
        <div className="projects-grid" role="list">
          {visible.map((p, cardIdx) => {
            const hasImages = p.images.length > 0

            const isHPC = p.id === 'hpc-research'
            const is5050 = hasImages || isHPC

            return (
              <div
                key={p.id}
                className={`project-card fade-in reveal${!is5050 ? ' card-no-image' : ''}`}
                role="listitem"
              >
                {/* Image preview panel — only when images exist */}
                {hasImages && <ProjectPreview images={p.images} label={p.title} priority={cardIdx === 0} />}

                {/* For HPC Research, render animated benchmark visual instead of images */}
                {isHPC && (
                  <div className="project-preview-panel hpc-benchmark-panel">
                    <div className="hpc-benchmark-content">
                      <h4 className="benchmark-title">Hybrid Speedup vs Sequential CPU</h4>
                      <div className="benchmark-bar-group">
                        <span className="benchmark-label">Sequential C++</span>
                        <div className="benchmark-bar" style={{ width: '8%' }}><span>1x</span></div>
                      </div>
                      <div className="benchmark-bar-group">
                        <span className="benchmark-label">Hybrid (3840×2160)</span>
                        <div className="benchmark-bar bar-accent-1" style={{ width: '56%' }}><span>6.65x</span></div>
                      </div>
                      <div className="benchmark-bar-group">
                        <span className="benchmark-label">Hybrid (1920×1080)</span>
                        <div className="benchmark-bar bar-accent-2" style={{ width: '69%' }}><span>8.16x</span></div>
                      </div>
                      <div className="benchmark-bar-group">
                        <span className="benchmark-label">Hybrid (512×512)</span>
                        <div className="benchmark-bar bar-accent-3" style={{ width: '90%' }}><span>10.67x</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content panel */}
                <div className={is5050 ? 'project-content-panel' : ''}>
                  <div className="card-body">
                    <div className="card-header">
                      <span className={`card-category-badge ${p.badgeClass}`}>{p.badgeLabel}</span>
                      <div className="card-stat-badge">
                        <span className="stat-badge-dot" />
                        {p.stat}
                      </div>
                    </div>
                    <h3 className="card-title">{p.title}</h3>
                    <p className="card-summary">{p.summary}</p>
                    {p.finding && (
                      <div className="card-finding">
                        <span className="finding-label">Key Finding</span>
                        <span className="finding-text">{p.finding}</span>
                      </div>
                    )}
                    <div className="card-tech">
                      {p.tech.map(t => <span key={t} className="tech-chip">{t}</span>)}
                    </div>
                    {p.href && p.href !== '#' && (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                        style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
                        onClick={e => e.stopPropagation()}
                      >
                        View Live ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* More projects */}
        <div className="more-projects-section reveal">
          <h3 className="more-projects-title">More Projects</h3>
          <div className="more-projects-grid">
            {MORE.map(m => <MoreProjectItem key={m.name} item={m} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
