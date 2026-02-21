import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Xpeartz — our story, values, mission, and the team behind the work.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
