'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function CustomCursor() {
  const [isHoveringHero, setIsHoveringHero] = useState(false)
  const [isMobile, setIsMobile] = useState(true) 
  
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  const cursorX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.05 })
  const cursorY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.05 })

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
      // ONLY check if hovering the hero section
      setIsHoveringHero(!!target.closest('#hero-section'));
    };

    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, [isMobile, mouseX, mouseY])

  const showText = isHomePage && isHoveringHero

  if (isMobile) return null;

  // Simple logic: If hero, grow to show text. Otherwise, stay as a small dot.
  // No magnetic snapping to buttons.
  const targetWidth = showText ? 110 : 8;
  const targetHeight = showText ? 36 : 8;
  const targetRadius = showText ? '12px' : '9999px';

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: showText ? '-50%' : '-50%',
        translateY: showText ? '-50%' : '-50%',
        left: 0,
        top: 0
      }}
      animate={{
        width: targetWidth,
        height: targetHeight,
        borderRadius: targetRadius,
        backgroundColor: 'rgba(255, 255, 255, 1)',
      }}
      transition={{
        type: 'spring',
        stiffness: 800,
        damping: 40,
        mass: 0.05,
      }}
    >
      {showText && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-black text-[10px] font-bold tracking-widest uppercase text-center leading-tight whitespace-nowrap"
          style={{ mixBlendMode: 'normal' }}
        >
          Press & Hold
        </motion.span>
      )}
    </motion.div>
  )
}
