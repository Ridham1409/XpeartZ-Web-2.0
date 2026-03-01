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
import WhatsAppButton from '@/components/ui/WhatsAppButton'

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
    'free strategy call',
    'free designs customization',
    'web development agency in US',
    'best website design agency United States',
    'most trusted web design agency',
    'ecommerce website development agency',
    'top rated web design company',
    'best freelance agency', 
    'premium ui ux designer', 
    'high converting website design services',
    'Xpeartz agency',
    'modern custom web development'
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

        {/* Google Tag Manager Component */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P4WZBG8C');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased text-[#F7F7F7] custom-scrollbar overflow-x-hidden pt-20 flex flex-col min-h-screen bg-[#0F0F11]`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-P4WZBG8C"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
            <WhatsAppButton />
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}

