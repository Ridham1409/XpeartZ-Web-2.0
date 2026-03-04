import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Xpeartz — our story, values, mission, and the team behind the work.',
  alternates: {
    canonical: 'https://xpeartz.com/about',
  },
  openGraph: {
    title: 'About | Xpeartz',
    description: 'Learn about Xpeartz — our story, values, mission, and the team behind the work.',
    url: 'https://xpeartz.com/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
