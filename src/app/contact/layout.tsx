import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Xpeartz. Tell us about your project and we\'ll respond within 24 hours.',
  alternates: {
    canonical: 'https://xpeartz.com/contact',
  },
  openGraph: {
    title: 'Contact | Xpeartz',
    description: 'Get in touch with Xpeartz. Tell us about your project and we\'ll respond within 24 hours.',
    url: 'https://xpeartz.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
