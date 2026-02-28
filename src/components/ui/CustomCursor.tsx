'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function CustomCursor() {
  const [isHoveringHero, setIsHoveringHero] = useState(false)
  const [isHoveringClickable, setIsHoveringClickable] = useState(false)
  const [isMobile, setIsMobile] = useState(true) 
  
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  // Separate motion values for dot and ring to create a trailing effect
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // Center Dot: Extremely fast, near 1:1 with native cursor
  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 90, mass: 0.01 })
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 90, mass: 0.01 })

  // Outer Ring: Tightened trailing physics
  const ringX = useSpring(mouseX, { stiffness: 800, damping: 60, mass: 0.1 })
  const ringY = useSpring(mouseY, { stiffness: 800, damping: 60, mass: 0.1 })

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

      // Check if hovering a clickable element for the ring expand effect
      const clickable = target.closest('a') || 
                        target.closest('button') || 
                        target.closest('input') || 
                        target.closest('textarea') || 
                        target.closest('select') || 
                        target.closest('[role="button"]') ||
                        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHoveringClickable(!!clickable);
    };

    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, [isMobile, mouseX, mouseY])

  const showText = isHomePage && isHoveringHero

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* 1. CENTER DOT (The precision point) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full z-10"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* 2. OUTER RING (The 'Techy' trailing element) */}
      <motion.div
        className="fixed top-0 left-0 border border-white/40 flex items-center justify-center overflow-hidden"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: showText ? 120 : (isHoveringClickable ? 40 : 24),
          height: showText ? 40 : (isHoveringClickable ? 40 : 24),
          borderRadius: showText ? '12px' : '9999px',
          backgroundColor: isHoveringClickable ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHoveringClickable ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)',
          rotate: showText ? 0 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
          mass: 0.1
        }}
      >
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center"
            >
              <span className="text-white text-[9px] font-black tracking-[0.2em] uppercase leading-tight whitespace-nowrap mix-blend-difference">
                Press & Hold
              </span>
              {/* Scanline animation for the tech vibe */}
              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-white/10 w-full h-full skew-x-12"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating crosshair bits for tech vibe when expanded */}
        {isHoveringClickable && !showText && (
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-dashed border-white/20 rounded-full"
          />
        )}
      </motion.div>

      {/* 3. SUBTLE GLOW TRAIL */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 bg-white/5 blur-[40px] rounded-full -z-10"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  )
}
