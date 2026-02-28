import type { Metadata } from 'next'
import Script from 'next/script'
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
    default: 'Best Agency for Website Development and Design | Xpeartz',
    template: '%s | Xpeartz — Best Agency for Website Development',
  },
  description: 'Looking for the best agency for website development and design? Xpeartz crafts world-class, premium, and lead-generating websites for start-ups and enterprises globally.',
  keywords: [
    'best agency for website development and design',
    'best web development agency',
    'top website design company',
    'best freelance agency', 
    'best website maker', 
    'premium ui ux designer', 
    'top rated web design agency',
    'affordable custom website design',
    'ecommerce website development agency',
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
    title: 'Best Agency for Website Development and Design | Xpeartz',
    description: 'Looking for the best agency for website development and design? Elevate your brand with world-class digital experiences and lead-generating websites.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Xpeartz — Best Agency for Website Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Agency for Website Development and Design | Xpeartz',
    description: 'Looking for the best agency for website development and design? Crafting exceptional digital experiences.',
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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-7L6KGX4BFR`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7L6KGX4BFR');
            `,
          }}
        />
      </head>
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

