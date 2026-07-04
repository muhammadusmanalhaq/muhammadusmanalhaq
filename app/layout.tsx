import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import ParticleBackground from '@/components/ParticleBackground'

export const metadata: Metadata = {
  title: 'Muhammad Usman Al Haq — Developer Portfolio',
  description:
    'CS Student · Full-Stack Developer · Competitive Programmer at FAST-NUCES Islamabad. ICPC Asia Regionalist. Building production-grade software across web, mobile, and HPC.',
  keywords: [
    'Muhammad Usman Al Haq',
    'Full-Stack Developer',
    'FAST-NUCES',
    'ICPC',
    'CUDA',
    'Android Developer',
    'Portfolio',
    'Islamabad',
  ],
  authors: [{ name: 'Muhammad Usman Al Haq', url: 'https://github.com/muhammadusmanalhaq' }],
  openGraph: {
    title: 'Muhammad Usman Al Haq — Developer Portfolio',
    description: 'CS Student · Full-Stack Developer · ICPC Regionalist',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Devicons CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body>
        {children}
        <ParticleBackground />
        <Analytics />
      </body>
    </html>
  )
}
