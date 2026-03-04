'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Our Designs' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const glassStyles = {
    backdropFilter: 'blur(28px) saturate(200%) brightness(0.85)',
    WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(0.85)',
    background: scrolled
      ? 'rgba(15, 15, 17, 0.80)'
      : 'rgba(15, 15, 17, 0.55)',
    border: scrolled
      ? '1px solid rgba(74,74,255,0.25)'
      : '1px solid rgba(255,255,255,0.06)',
  }

  const glassClassName = cn(
    'relative flex items-center h-[72px] px-6 rounded-full transition-all duration-500 overflow-hidden pointer-events-auto',
    scrolled
      ? 'shadow-[0_8px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(74,74,255,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]'
      : 'shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]'
  )

  const innerHighlight = (
    <div className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.055) 0%, transparent 40%)',
      }}
    />
  )

  return (
    <>
      {/* Floating pill navbar grouping */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center items-center gap-4 px-4 pointer-events-none">
        
        {/* Left Pill — Contact Details */}
        <motion.div
           initial={{ opacity: 0, y: -40, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className={cn(glassClassName, "hidden xl:flex shrink-0 gap-4")}
           style={glassStyles}
        >
          {innerHighlight}
          <a href="tel:+919876543210" className="text-[#A0A0A0] hover:text-[#F7F7F7] text-xs font-medium transition-colors flex items-center gap-1.5 relative z-10">
            <span>+91 98765 43210</span>
          </a>
          <div className="w-1 h-1 rounded-full bg-[#2A2A2E] relative z-10" />
          <a href="mailto:ridhambhavnagariya@gmail.com" className="text-[#A0A0A0] hover:text-[#F7F7F7] text-xs font-medium transition-colors flex items-center gap-1.5 relative z-10">
            <span>ridhambhavnagariya@gmail.com</span>
          </a>
        </motion.div>

        {/* Center Pill — Logo, Nav Links, & CTA */}
        <motion.div
           initial={{ opacity: 0, y: -40, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
           className={cn(glassClassName, "w-full max-w-4xl justify-between lg:justify-center gap-2 lg:gap-6")}
           style={glassStyles}
        >
          {innerHighlight}
          
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 relative z-10 lg:absolute lg:left-6" data-no-cursor="true">
            <Image
              src="/logo.png"
              alt="Xpeartz"
              width={110}
              height={32}
              className="object-contain block drop-shadow-md"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 relative z-10">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.35, ease: 'easeOut' }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-[15px] font-medium transition-all duration-250 whitespace-nowrap',
                    pathname === link.href
                      ? 'text-[#F7F7F7]'
                      : 'text-[#8A8A8A] hover:text-[#D4D4D4]'
                  )}
                >
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right section of center pill: CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0 relative z-10 lg:absolute lg:right-4">
             <Link
               href="/contact"
               className="hidden lg:inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
               style={{
                 background: 'rgba(255,255,255,0.95)',
                 color: '#0F0F11',
                 boxShadow: '0 2px 12px rgba(255,255,255,0.15)',
               }}
             >
               Let&apos;s Talk
             </Link>
             <button
               onClick={() => setMobileOpen(!mobileOpen)}
               className="lg:hidden p-2 text-[#A0A0A0] hover:text-[#F7F7F7] transition-colors"
               aria-label="Toggle menu"
             >
               <AnimatePresence mode="wait" initial={false}>
                 <motion.div
                   key={mobileOpen ? 'close' : 'open'}
                   initial={{ rotate: -90, opacity: 0 }}
                   animate={{ rotate: 0, opacity: 1 }}
                   exit={{ rotate: 90, opacity: 0 }}
                   transition={{ duration: 0.18 }}
                 >
                   {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                 </motion.div>
               </AnimatePresence>
             </button>
          </div>
        </motion.div>

        {/* Right Pill — Socials */}
        <motion.div
           initial={{ opacity: 0, y: -40, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
           className={cn(glassClassName, "hidden xl:flex shrink-0 gap-4")}
           style={glassStyles}
        >
          {innerHighlight}
          <a href="https://instagram.com/xpeartz" target="_blank" rel="noopener noreferrer" className="text-[#A0A0A0] hover:text-[#CC44BB] transition-colors relative z-10" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className="text-[#A0A0A0] hover:text-[#4A4AFF] transition-colors relative z-10" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" className="text-[#A0A0A0] hover:text-[#FF0000] transition-colors relative z-10" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
          </a>
        </motion.div>

      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(32px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0F0F11]/95 backdrop-blur-3xl flex flex-col pt-24 px-6 pb-8"
          >
            <nav className="flex flex-col gap-1 mt-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, ease: 'easeOut' }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'block px-4 py-4 rounded-2xl text-2xl font-heading font-medium transition-colors',
                      pathname === link.href
                        ? 'text-[#F7F7F7] bg-white/8'
                        : 'text-[#606060] hover:text-[#F7F7F7]'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto">
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-4 bg-white text-[#0F0F11] font-semibold rounded-full hover:bg-[#F0F0F0] transition-colors text-lg shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
