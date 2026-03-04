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

  return (
    <>
      {/* Floating pill navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className={cn(
            'w-full max-w-5xl flex items-center justify-between relative',
            'h-[80px] px-6 rounded-full',
            'transition-all duration-500',
            scrolled
              ? 'shadow-[0_8px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(74,74,255,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]'
              : 'shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]'
          )}
          style={{
            backdropFilter: 'blur(28px) saturate(200%) brightness(0.85)',
            WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(0.85)',
            background: scrolled
              ? 'rgba(15, 15, 17, 0.80)'
              : 'rgba(15, 15, 17, 0.55)',
            border: scrolled
              ? '1px solid rgba(74,74,255,0.25)'
              : '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Subtle inner top highlight — glass edge feel */}
          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.055) 0%, transparent 40%)',
            }}
          />

          {/* Left — Contact Details */}
          <div className="hidden lg:flex items-center gap-4 shrink-0 relative z-10 mr-4">
            <a href="tel:+919876543210" className="text-[#A0A0A0] hover:text-[#F7F7F7] text-xs font-medium transition-colors flex items-center gap-1.5">
              <span>+91 98765 43210</span>
            </a>
            <div className="w-1 h-1 rounded-full bg-[#2A2A2E]" />
            <a href="mailto:ridhambhavnagariya@gmail.com" className="text-[#A0A0A0] hover:text-[#F7F7F7] text-xs font-medium transition-colors flex items-center gap-1.5">
              <span>ridhambhavnagariya@gmail.com</span>
            </a>
          </div>

          <div className="flex-1 flex items-center justify-between lg:justify-center relative z-10 w-full">
            {/* Logo — CSS filter removes white bg, preserves gradient */}
            <Link href="/" className="flex items-center shrink-0 relative z-10 lg:absolute lg:left-0" data-no-cursor="true">
              <Image
                src="/logo.png"
                alt="Xpeartz"
                width={130}
                height={38}
                className="object-contain block"
                priority
              />
            </Link>

            {/* Center — desktop nav links */}
            <nav className="hidden md:flex items-center gap-0.5 relative z-10">
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
                      'relative px-4 py-2.5 rounded-full text-base font-medium transition-all duration-250 whitespace-nowrap',
                      pathname === link.href
                        ? 'text-[#F7F7F7]'
                        : 'text-[#8A8A8A] hover:text-[#D4D4D4]'
                    )}
                  >
                    {/* Active pill indicator */}
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

            {/* Right — CTA + mobile toggle */}
            <div className="flex items-center gap-3 shrink-0 relative z-10 lg:absolute lg:right-0">
              {/* Desktop CTA — white pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/contact"
                  className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 group"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    color: '#0F0F11',
                    boxShadow: '0 2px 12px rgba(255,255,255,0.15)',
                  }}
                >
                  <span className="group-hover:tracking-wide transition-all duration-300 whitespace-nowrap">
                    Let&apos;s Talk
                  </span>
                </Link>
              </motion.div>
            </div>
            
            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#A0A0A0] hover:text-[#F7F7F7] transition-colors absolute right-0 z-10"
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

          {/* Right — Social Media Links */}
          <div className="hidden lg:flex items-center gap-3 shrink-0 relative z-10 ml-4 pl-4 border-l border-[#2A2A2E]">
            <a href="https://instagram.com/xpeartz" target="_blank" rel="noopener noreferrer" className="text-[#A0A0A0] hover:text-[#CC44BB] transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="text-[#A0A0A0] hover:text-[#4A4AFF] transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="text-[#A0A0A0] hover:text-[#FF0000] transition-colors" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
          </div>
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
