'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0F0F11] text-[#F7F7F7]">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        className="px-6 py-3 bg-[#4A4AFF] text-white rounded-lg hover:bg-[#3d3ddf] transition-colors"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
