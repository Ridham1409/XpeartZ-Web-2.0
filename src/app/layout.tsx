import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import SmoothScroll from '@/components/ui/SmoothScroll'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Xpeartz — Premium Digital Agency',
    template: '%s | Xpeartz',
  },
  description: 'Xpeartz is a premium digital agency crafting exceptional web experiences, brand identities, and digital products for ambitious businesses.',
  keywords: ['digital agency', 'web design', 'branding', 'UI/UX', 'Next.js', 'Xpeartz'],
  authors: [{ name: 'Xpeartz' }],
  creator: 'Xpeartz',
  metadataBase: new URL('https://xpeartz.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://xpeartz.com',
    siteName: 'Xpeartz',
    title: 'Xpeartz — Premium Digital Agency',
    description: 'Crafting exceptional digital experiences for ambitious businesses.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Xpeartz — Premium Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xpeartz — Premium Digital Agency',
    description: 'Crafting exceptional digital experiences for ambitious businesses.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-[#0F0F11] text-[#F7F7F7] font-body antialiased">
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}

