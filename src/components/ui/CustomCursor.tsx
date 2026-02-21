'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHoveringClickable, setIsHoveringClickable] = useState(false)
  const [isHoveringHero, setIsHoveringHero] = useState(false)
  const [hoveredRect, setHoveredRect] = useState<{ width: number, height: number, left: number, top: number } | null>(null)
  const [hoveredRadius, setHoveredRadius] = useState('9999px')
  
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    let lastHoveredElement: HTMLElement | null = null;
    let cachedRadius = '9999px';

    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      
      // 1. Direct hover detection (Current logic)
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

      // 2. Magnetic Proximity detection
      // Only check magnetic snapping if not already directly over something
      let magneticElement: HTMLElement | null = null;
      
      if (!directClickable || noCursorElement) {
        const threshold = 60; // Distance in px to start 'magnetizing'
        const elements = document.querySelectorAll('a, button, [role="button"], input[type="submit"]');
        
        let closestDist = Infinity;
        
        elements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.hasAttribute('data-no-cursor')) return;
          
          const rect = htmlEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const distX = Math.abs(e.clientX - centerX);
          const distY = Math.abs(e.clientY - centerY);
          
          // Check if mouse is near the boundaries
          const distance = Math.sqrt(
            Math.pow(Math.max(0, rect.left - threshold - e.clientX, e.clientX - (rect.right + threshold)), 2) +
            Math.pow(Math.max(0, rect.top - threshold - e.clientY, e.clientY - (rect.bottom + threshold)), 2)
          );

          if (distance === 0 && distance < closestDist) {
            // Already inside or within very close range
            closestDist = distance;
            magneticElement = htmlEl;
          } else if (distance < threshold && distance < closestDist) {
            closestDist = distance;
            magneticElement = htmlEl;
          }
        });
      }

      const activeElement = directClickable || magneticElement;

      if (activeElement && !activeElement.closest('[data-no-cursor="true"]')) {
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

      // Check if hovering inside the hero section
      if (target.closest('#hero-section')) {
        setIsHoveringHero(true);
      } else {
        setIsHoveringHero(false);
      }
    };

    window.addEventListener('mousemove', updateMouse);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
    }
  }, [])

  // The cursor shows text when hovering the hero section, but NOT when hovering a button.
  const showText = isHomePage && isHoveringHero && !isHoveringClickable
  
  let targetX, targetY, targetWidth, targetHeight, targetRadius;
  
  if (isHoveringClickable && hoveredRect) {
    // Morph to the exact size of the hovered element, adding a tiny padding to "target/frame" it
    targetWidth = hoveredRect.width + 12; 
    targetHeight = hoveredRect.height + 12;
    targetX = hoveredRect.left - 6;
    targetY = hoveredRect.top - 6;
    targetRadius = hoveredRadius === '0px' ? '8px' : hoveredRadius;
  } else if (showText) {
    // Oval shape for 'Press & Hold'
    targetWidth = 110;
    targetHeight = 36;
    targetX = mousePosition.x - targetWidth / 2;
    targetY = mousePosition.y - targetHeight / 2;
    targetRadius = '9999px';
  } else {
    // Default tiny circle
    targetWidth = 12;
    targetHeight = 12;
    targetX = mousePosition.x - targetWidth / 2;
    targetY = mousePosition.y - targetHeight / 2;
    targetRadius = '9999px';
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference overflow-hidden"
      animate={{
        x: targetX,
        y: targetY,
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
