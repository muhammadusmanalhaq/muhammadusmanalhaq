'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface GlobalLightboxProps {
  media: { url: string; type: 'image' | 'video' } | null
  onClose: () => void
}

export default function GlobalLightbox({ media, onClose }: GlobalLightboxProps) {
  useEffect(() => {
    if (!media) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [media, onClose])

  if (!media) return null

  return (
    <div 
      className="lightbox-overlay" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-label="Media viewer"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div 
        className="lightbox-inner" 
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px'
        }}
      >
        <button 
          className="lightbox-close" 
          onClick={onClose} 
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          ✕
        </button>

        {media.type === 'video' ? (
          <video 
            src={media.url} 
            controls 
            autoPlay 
            playsInline 
            style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '8px' }} 
          />
        ) : (
          <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1200px', maxHeight: '90vh' }}>
            <Image 
              src={media.url} 
              alt="Expanded view" 
              fill 
              sizes="100vw"
              style={{ objectFit: 'contain' }} 
            />
          </div>
        )}
      </div>
    </div>
  )
}
