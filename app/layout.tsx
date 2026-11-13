import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const title = 'Muhammad Usman Al Haq | Backend & Cloud Engineering'
const description = 'Final-year Computer Science student at FAST-NUCES Islamabad. Projects in .NET, Azure, applied AI, and parallel computing.'

export const metadata: Metadata = {
  metadataBase: new URL('https://muhammadusmanalhaq.vercel.app'),
  title,
  description,
  authors: [{ name: 'Muhammad Usman Al Haq', url: 'https://github.com/muhammadusmanalhaq' }],
  openGraph: { title, description, type: 'website', images: ['/me.jpeg'] },
  twitter: { card: 'summary', title, description, images: ['/me.jpeg'] },
  icons: { icon: '/icon.svg', shortcut: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
