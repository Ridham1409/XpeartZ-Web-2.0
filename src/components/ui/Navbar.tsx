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
            'h-[64px] px-5 rounded-full',
            'transition-all duration-500',
            // Layered glass effect
            scrolled
              ? 'shadow-[0_8px_48px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]'
              : 'shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]'
          )}
          style={{
            backdropFilter: 'blur(24px) saturate(200%) brightness(0.85)',
            WebkitBackdropFilter: 'blur(24px) saturate(200%) brightness(0.85)',
            background: scrolled
              ? 'rgba(15, 15, 17, 0.72)'
              : 'rgba(15, 15, 17, 0.52)',
          }}
        >
          {/* Subtle inner top highlight — glass edge feel */}
          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.055) 0%, transparent 40%)',
            }}
          />

          {/* Logo — CSS filter removes white bg, preserves gradient */}
          <Link href="/" className="flex items-center shrink-0 relative z-10">
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
          <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2 z-10">
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
                    'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-250 whitespace-nowrap',
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
          <div className="flex items-center gap-3 shrink-0 relative z-10">
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
                <span className="group-hover:tracking-wide transition-all duration-300">
                  Let&apos;s Talk
                </span>
              </Link>
            </motion.div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[#A0A0A0] hover:text-[#F7F7F7] transition-colors"
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
