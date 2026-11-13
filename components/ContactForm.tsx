'use client'

import { useState, type FormEvent } from 'react'
import { Arrow } from './PortfolioIcons'

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

export default function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name')).trim()
    const from = String(data.get('email')).trim()
    const message = String(data.get('message')).trim()
    const topic = String(data.get('topic'))
    if (!name || message.length < 10) {
      const field = form.elements.namedItem(!name ? 'name' : 'message') as HTMLInputElement | HTMLTextAreaElement
      field.setCustomValidity(!name ? 'Enter your name.' : 'Enter at least 10 characters.')
      field.reportValidity()
      return
    }

    const subject = `Portfolio inquiry: ${topic}`
    if (!accessKey) {
      const body = `${message}\n\n${name}\n${from}`
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      return
    }

    data.set('access_key', accessKey)
    data.set('subject', subject)
    data.set('name', name)
    data.set('email', from)
    data.set('message', message)
    setStatus('sending')

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      if (!response.ok) throw new Error('Contact request failed')
      const result: { success?: boolean } = await response.json()
      if (!result.success) throw new Error('Contact request rejected')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <form className="contact-form" onSubmit={send} aria-labelledby="contact-form-title" aria-busy={status === 'sending'}>
      <h3 id="contact-form-title">Send me a message</h3>
      <fieldset disabled={status === 'sending'}>
        <div className="contact-fields">
          <label>Your name<input name="name" autoComplete="name" placeholder="Jane Smith" maxLength={120} required onInput={event => event.currentTarget.setCustomValidity('')} /></label>
          <label>Your email<input name="email" type="email" autoComplete="email" placeholder="jane@example.com" maxLength={254} required /></label>
        </div>
        <label>What’s it about?
          <select name="topic" defaultValue="" required>
            <option value="" disabled>Choose a topic</option>
            <option>Job opportunity</option>
            <option>Project collaboration</option>
            <option>Something else</option>
          </select>
        </label>
        <label>Your message
          <textarea name="message" rows={5} placeholder="A little about you and what you have in mind…" minLength={10} maxLength={3000} required onInput={event => event.currentTarget.setCustomValidity('')} />
        </label>
        <div className="contact-submit">
          <button className="primary-button" type="submit">
            {status === 'sending' ? 'Sending…' : accessKey ? 'Send message' : 'Open email draft'} <Arrow direction="right" />
          </button>
          <p role="status" data-status={status}>
            {status === 'sent' && 'Your message was sent. Thanks for reaching out.'}
            {status === 'failed' && 'Your message couldn’t be sent. You can retry or email me directly.'}
          </p>
        </div>
      </fieldset>
    </form>
  )
}
