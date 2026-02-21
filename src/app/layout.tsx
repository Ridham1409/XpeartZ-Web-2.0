import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import SmoothScroll from '@/components/ui/SmoothScroll'
import CustomCursor from '@/components/ui/CustomCursor'
import GlobalBackground from '@/components/ui/GlobalBackground'
import JsonLd from '@/components/seo/JsonLd'

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
    default: 'Xpeartz — Best Freelance Agency & Premium Website Maker',
    template: '%s | Xpeartz — World-Class Digital Agency',
  },
  description: 'Xpeartz is the best freelance agency and premium website maker crafting high-end digital experiences, world-class brand identities, and lead-generating websites for businesses globally.',
  keywords: [
    'best freelance agency', 
    'best website maker', 
    'best website maker for freelancers', 
    'world-class digital agency', 
    'premium ui ux designer', 
    'top rated web design agency',
    'affordable custom website design',
    'lead generating websites',
    'Xpeartz agency',
    'modern web development'
  ],
  authors: [{ name: 'Xpeartz' }],
  creator: 'Xpeartz',
  metadataBase: new URL('https://xpeartz.com'),
  alternates: {
    canonical: 'https://xpeartz.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://xpeartz.com',
    siteName: 'Xpeartz',
    title: 'Xpeartz — Best Freelance Agency & Premium Website Maker',
    description: 'Elevate your brand with world-class digital experiences and lead-generating websites.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Xpeartz — World-Class Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xpeartz — Best Freelance Agency & Premium Website Maker',
    description: 'Crafting exceptional digital experiences and world-class brand identities.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
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
        <JsonLd />
        <CustomCursor />
        <GlobalBackground />
        <SmoothScroll>
          <div className="relative z-[2]">
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}

