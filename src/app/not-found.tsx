import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="font-heading text-[10rem] font-bold text-[#1A1A1E] leading-none select-none">
        404
      </div>
      <h1 className="font-heading text-3xl font-bold text-[#F7F7F7] -mt-4 mb-4">Page not found</h1>
      <p className="text-[#A0A0A0] mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#4A4AFF] text-white font-medium rounded-xl hover:bg-[#3B3BDD] transition-colors"
      >
        Back Home
      </Link>
    </div>
  )
}
