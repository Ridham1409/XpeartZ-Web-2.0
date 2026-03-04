import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description: 'View Xpeartz portfolio — web design, mobile UI, and brand identity projects.',
  alternates: {
    canonical: 'https://xpeartz.com/work',
  },
  openGraph: {
    title: 'Work | Xpeartz',
    description: 'View Xpeartz portfolio — web design, mobile UI, and brand identity projects.',
    url: 'https://xpeartz.com/work',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
