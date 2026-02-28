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
  
  // Use a very fast spring for a "native" feel
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
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: showText ? 110 : 8,
        height: showText ? 36 : 8,
        borderRadius: showText ? '12px' : '9999px',
        backgroundColor: 'rgba(255, 255, 255, 1)',
      }}
      transition={{
        type: 'spring',
        stiffness: 1000,
        damping: 50,
        mass: 0.05
      }}
    >
      <AnimatePresence>
        {showText && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-black text-[10px] font-bold tracking-widest uppercase text-center leading-tight whitespace-nowrap"
            style={{ mixBlendMode: 'normal' }}
          >
            Press & Hold
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
