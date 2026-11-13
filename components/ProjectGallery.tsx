'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Arrow } from './PortfolioIcons'

export default function ProjectGallery({ images, name, documentLabel }: {
  images: string[]
  name: string
  documentLabel?: string
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)

  function move(offset: number) {
    setIndex(current => (current + offset + images.length) % images.length)
  }

  function show(start: number, button: HTMLButtonElement) {
    trigger.current = button
    setIndex(start)
    dialog.current?.showModal()
    setOpen(true)
  }

  return (
    <>
      <div className={documentLabel ? 'media-gallery document-gallery' : 'media-gallery'}>
        <button
          className="gallery-preview"
          type="button"
          aria-label={documentLabel ? `View ${name} ${documentLabel.toLowerCase()}` : `Browse screenshots of ${name}`}
          aria-haspopup="dialog"
          onClick={event => show(0, event.currentTarget)}
        >
          <span className="screenshot">
            <Image src={images[0]} alt="" fill sizes="(max-width: 720px) 92vw, 600px" />
          </span>
          <span className="gallery-caption">
            {documentLabel || (images.length === 1 ? 'View screenshot' : `View ${images.length} screenshots`)}
            <Arrow />
          </span>
        </button>
        {images.length > 1 && (
          <div className="gallery-thumbnails" role="group" aria-label={`${name} screenshot thumbnails`}>
            {images.slice(1).map((image, offset) => (
              <button
                key={image}
                type="button"
                aria-label={`Open ${name} screenshot ${offset + 2}`}
                aria-haspopup="dialog"
                onClick={event => show(offset + 1, event.currentTarget)}
              >
                <Image src={image} alt="" fill sizes="96px" />
              </button>
            ))}
          </div>
        )}
      </div>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        aria-label={`${name} ${documentLabel?.toLowerCase() ?? 'screenshots'}`}
        onClose={() => {
          setOpen(false)
          trigger.current?.focus()
        }}
        onClick={event => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}
        onKeyDown={event => {
          if (images.length < 2) return
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault()
            move(event.key === 'ArrowLeft' ? -1 : 1)
          }
        }}
      >
        <div className="gallery-body">
          <div className="gallery-toolbar">
            <strong>{name}</strong>
            <button type="button" onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button>
          </div>
          {open && <div className="gallery-image" key={images[index]}>
            {/* Native dimensions keep full-height screenshots scrollable and legible. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[index]} alt={`${name} ${documentLabel ?? `screenshot ${index + 1}`}`} />
          </div>}
          {images.length > 1 && (
            <div className="gallery-toolbar gallery-pagination">
              <button type="button" onClick={() => move(-1)}><Arrow direction="left" /> Previous</button>
              <span aria-live="polite">{index + 1} / {images.length}</span>
              <button type="button" onClick={() => move(1)}>Next <Arrow direction="right" /></button>
            </div>
          )}
        </div>
      </dialog>
    </>
  )
}
