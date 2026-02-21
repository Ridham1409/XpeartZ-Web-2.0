'use client'

import dynamic from 'next/dynamic'

const Hyperspeed = dynamic(() => import('./Hyperspeed'), { ssr: false })

export default function GlobalBackground() {
  return (
    <>
      {/* Fixed full-screen Hyperspeed animation — behind everything */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Hyperspeed
          effectOptions={{
            speedUp: 2,
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x0F0F11,
              shoulderLines: 0x111111,
              brokenLines: 0x111111,
              leftCars: [0x4A4AFF, 0xCC44BB, 0x8B8BFF],
              rightCars: [0xCC44BB, 0x4A4AFF, 0xE070D0],
              sticks: 0x4A4AFF
            }
          }}
        />
      </div>

      {/* Fixed dark + blur overlay so all page content stays readable */}
      {/* Hero section specifically gets less blur — only 2px instead of 6px globally */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          background: 'rgba(15, 15, 17, 0.45)',
        }}
      />
    </>
  )
}
