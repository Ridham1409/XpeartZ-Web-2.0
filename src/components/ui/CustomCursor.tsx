'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function CustomCursor() {
  const [isHoveringClickable, setIsHoveringClickable] = useState(false)
  const [isHoveringHero, setIsHoveringHero] = useState(false)
  const [hoveredRect, setHoveredRect] = useState<{ width: number, height: number, left: number, top: number } | null>(null)
  const [hoveredRadius, setHoveredRadius] = useState('9999px')
  const [isMobile, setIsMobile] = useState(true) // Default true to prevent flash on mobile
  
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  // Framer motion values for smooth performance without React re-renders loops
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  const cursorX = useSpring(mouseX, { stiffness: 800, damping: 45, mass: 0.08 })
  const cursorY = useSpring(mouseY, { stiffness: 800, damping: 45, mass: 0.08 })

  useEffect(() => {
    // Check if device is touch or mobile
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
    let lastHoveredElement: HTMLElement | null = null;
    let cachedRadius = '9999px';

    const updateMouse = (e: MouseEvent) => {
      // Update motion values directly -> NO React re-render!
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      
      const target = e.target as HTMLElement;
      
      // Direct hover detection only - NO magnetic fake snapping to prevent click misses
      const directClickable = (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('textarea') || 
        target.closest('select') || 
        target.closest('[role="button"]') || 
        (window.getComputedStyle(target).cursor === 'pointer' ? target : null)
      ) as HTMLElement | null;

      const noCursorElement = target.closest('[data-no-cursor="true"]');
      const activeElement = noCursorElement ? null : directClickable;

      if (activeElement) {
        setIsHoveringClickable(true);
        if (activeElement !== lastHoveredElement) {
          const computedStyle = window.getComputedStyle(activeElement);
          cachedRadius = computedStyle.borderRadius || '8px';
          lastHoveredElement = activeElement;
        }
        
        const rect = activeElement.getBoundingClientRect();
        setHoveredRect({
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top
        });
        setHoveredRadius(cachedRadius);
      } else {
        setIsHoveringClickable(false);
        setHoveredRect(null);
        setHoveredRadius('9999px');
        lastHoveredElement = null;
      }

      // Check if hovering inside the hero section for "Press & Hold" text
      setIsHoveringHero(!!target.closest('#hero-section'));
    };

    window.addEventListener('mousemove', updateMouse);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
    }
  }, [isMobile, mouseX, mouseY])

  // The cursor shows text when hovering the hero section, but NOT when hovering a button.
  const showText = isHomePage && isHoveringHero && !isHoveringClickable
  
  // If hovering a clickable element, the spring tracks the element's position instead of the mouse
  useEffect(() => {
    if (isHoveringClickable && hoveredRect) {
      // Morph explicitly to the hovered rect
      cursorX.set(hoveredRect.left - 6)
      cursorY.set(hoveredRect.top - 6)
    } else {
      // Re-sync with mouse
      cursorX.set(mouseX.get() - (showText ? 55 : 6))
      cursorY.set(mouseY.get() - (showText ? 18 : 6))
    }
  }, [isHoveringClickable, hoveredRect, cursorX, cursorY, mouseX, mouseY, showText])

  if (isMobile) return null;

  let targetWidth = 12;
  let targetHeight = 12;
  let targetRadius = '9999px';

  if (isHoveringClickable && hoveredRect) {
    targetWidth = hoveredRect.width + 12; 
    targetHeight = hoveredRect.height + 12;
    targetRadius = hoveredRadius === '0px' ? '8px' : hoveredRadius;
  } else if (showText) {
    targetWidth = 110;
    targetHeight = 36;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        width: targetWidth,
        height: targetHeight,
        borderRadius: targetRadius,
        backgroundColor: 'rgba(255, 255, 255, 1)',
      }}
      transition={{
        type: 'spring',
        stiffness: isHoveringClickable ? 500 : 800,
        damping: isHoveringClickable ? 30 : 45,
        mass: 0.08,
      }}
    >
      {showText && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-black text-[11px] font-bold tracking-widest uppercase text-center leading-tight whitespace-nowrap"
          style={{ mixBlendMode: 'normal' }}
        >
          Press & Hold
        </motion.span>
      )}
    </motion.div>
  )
}
