import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore Xpeartz services — web design, brand identity, mobile UI, and design systems.',
  alternates: {
    canonical: 'https://xpeartz.com/services',
  },
  openGraph: {
    title: 'Services | Xpeartz',
    description: 'Explore Xpeartz services — web design, brand identity, mobile UI, and design systems.',
    url: 'https://xpeartz.com/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
