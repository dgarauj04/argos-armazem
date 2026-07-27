import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Argos Armazém — Portuário Digital',
  description: 'Sistema de gestão visual e alocação inteligente de contêineres em terminal portuário.',
  icons: {
    icon: '/wilson_sons-logo.svg',
    shortcut: '/wilson_sons-logo.svg',
    apple: '/wilson_sons-logo.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0B2D54',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`bg-background ${inter.className}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
