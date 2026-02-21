import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore Xpeartz services — web design, brand identity, mobile UI, and design systems.',
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
