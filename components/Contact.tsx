'use client'

import { useEffect, useRef, useState } from 'react'

const LINKS = [
  {
    id: 'email',
    label: 'Email',
    value: 'muhammadusmanalhaq@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=muhammadusmanalhaq@gmail.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/muhammad-usman-al-haq',
    href: 'https://pk.linkedin.com/in/muhammad-usman-al-haq-05a321315',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/muhammadusmanalhaq',
    href: 'https://github.com/muhammadusmanalhaq',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    id: 'resume',
    label: 'Resume',
    value: 'Download PDF',
    href: '/Muhammad_Usman_AlHaq_Resume.pdf',
    download: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+92 327 856 2423',
    href: 'tel:+923278562423',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
]

const ArrowIcon = () => (
  <svg className="contact-link-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const formData = new FormData(e.currentTarget)
    // Replace with the user's provided access key later via environment variables
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      if (response.ok) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal')
    if (!items?.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal:not(.visible)') ?? [])
        const idx = siblings.indexOf(entry.target as HTMLElement)
        setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 80, 300))
        obs.unobserve(entry.target)
      })
    }, { threshold: 0.08 })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" className="section" ref={sectionRef} aria-label="Contact">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Let&apos;s Build Something</h2>
        </div>

        <div className="contact-layout">
          {/* Form Intro & Form */}
          <div className="contact-intro reveal" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <p className="contact-body" style={{ marginBottom: '24px' }}>
              I&apos;m open to <span className="text-accent">internships</span>,{' '}
              <span className="text-accent">freelance projects</span>, and{' '}
              <span className="text-accent">entry-level roles</span>. Drop me a message below!
            </p>
            
            <form onSubmit={handleSubmit} className="contact-form glass-card">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" id="name" name="name" required className="form-input" placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" name="email" required className="form-input" placeholder="john@example.com" />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" name="message" required className="form-textarea" placeholder="Hello there..." />
              </div>
              
              <button type="submit" className="btn btn-accent btn-full" disabled={status === 'loading'} style={{ marginTop: '8px' }}>
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                {status === 'idle' && (
                  <svg className="btn-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                )}
              </button>
              {status === 'error' && <p className="form-error">Something went wrong. Please try again.</p>}
            </form>
          </div>

          {/* Link cards */}
          <div className="contact-links reveal">
            {LINKS.map(link => (
              <a
                key={link.id}
                href={link.href}
                className="contact-link-card glass-card"
                id={`contact-link-${link.id}`}
                {...(link.download ? { download: true } : {})}
                {...(!link.href.startsWith('mailto') && !link.href.startsWith('tel') && !link.download
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                aria-label={`${link.label}: ${link.value}`}
              >
                <div className="contact-link-icon">{link.icon}</div>
                <div className="contact-link-info">
                  <span className="contact-link-label">{link.label}</span>
                  <span className="contact-link-value">{link.value}</span>
                </div>
                <ArrowIcon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
