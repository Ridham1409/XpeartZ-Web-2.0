import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description: 'View Xpeartz portfolio — web design, mobile UI, and brand identity projects.',
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
