'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function CustomCursor() {
  const [isHoveringHero, setIsHoveringHero] = useState(false)
  const [isMobile, setIsMobile] = useState(true) 
  
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // Use a very fast spring for the label to stay close to the native cursor
  const cursorX = useSpring(mouseX, { stiffness: 2000, damping: 100, mass: 0.01 })
  const cursorY = useSpring(mouseY, { stiffness: 2000, damping: 100, mass: 0.01 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024)
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    if (isMobile) return;

    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      
      const target = e.target as HTMLElement;
      setIsHoveringHero(!!target.closest('#hero-section'));
    };

    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, [isMobile, mouseX, mouseY])

  const showText = isHomePage && isHoveringHero

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-0 left-0 bg-white px-4 py-2 rounded-xl flex items-center justify-center shadow-xl"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '20px', // Offset from native cursor
              translateY: '20px',
            }}
          >
            <span className="text-black text-[10px] font-bold tracking-widest uppercase text-center leading-tight whitespace-nowrap">
              Press & Hold
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
