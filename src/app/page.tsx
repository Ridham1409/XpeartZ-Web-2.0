'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Zap, Palette, Code2, Star } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import { ProjectCard } from '@/components/ui/Card'
import { projects } from '@/lib/projects'
import SpotlightCards from '@/components/ui/SpotlightCards'

const benefits = [
  'Professional Digital Solutions Built for Growth',
  'UX Focused Design That Converts',
  'Custom Interfaces for Web & Mobile',
  'Strategic Brand + Identity Expertise',
]

const services = [
  {
    icon: <Code2 size={22} />,
    title: 'Web & App Experiences',
    desc: 'Crafting responsive websites and mobile UI that convert visitors into customers.',
  },
  {
    icon: <Palette size={22} />,
    title: 'Brand Strategy & Identity',
    desc: 'Strategic brand systems and visual identities that build authority and trust.',
  },
  {
    icon: <Zap size={22} />,
    title: 'UI/UX & Product Design',
    desc: 'User-centered interfaces and optimized digital experiences that delight users.',
  },
  {
    icon: <ArrowUpRight size={22} />,
    title: 'Digital Growth & Support',
    desc: 'SEO strategy, performance analytics, and ongoing optimization for measurable growth.',
  },
]

const testimonials = [
  {
    quote: 'Xpeartz transformed our brand completely. The strategy, creativity, and attention to detail were next-level.',
    author: 'Sarah Chen',
    role: 'Founder, Luxe Studio',
    rating: 5,
  },
  {
    quote: 'The Nova redesign was a game-changer for us. Our conversion rates skyrocketed post-launch.',
    author: 'Marcus Williams',
    role: 'CEO, Nova Analytics',
    rating: 5,
  },
  {
    quote: 'Working with Xpeartz was the best investment we made for Pulse. The design feels premium on every screen.',
    author: 'Jordan Lee',
    role: 'CEO, Pulse Health',
    rating: 5,
  },
]

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  // For CTA Banner Spotlight Animation
  const ctaRef = useRef<HTMLDivElement>(null)
  const normX = useMotionValue(0.5)
  const normY = useMotionValue(0.5)
  const TILT_MAX = 5 // Reduced from 9 since it's a large container
  const rotateX = useSpring(useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]), { stiffness: 300, damping: 28 })
  const rotateY = useSpring(useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]), { stiffness: 300, damping: 28 })

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  }

  // Randomize featured projects on client load to avoid hydration mismatch
  const [featuredProjects, setFeaturedProjects] = useState(projects.slice(0, 5));
  useEffect(() => {
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    setFeaturedProjects(shuffled.slice(0, 5));
  }, []);

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section id="hero-section" ref={heroRef} className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

        <div className="container-wide relative z-10 w-full mt-24 sm:mt-32">
          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="flex flex-col items-center text-center max-w-4xl mx-auto w-full">
            {/* Animated intro tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
               className="text-[#4A4AFF] text-sm font-semibold tracking-widest uppercase mb-4"
            >
              Premium Digital Studio for Modern Brands
            </motion.p>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-[#2A2A2E] text-[#F7F7F7] text-sm font-medium shadow-[0_4px_24px_rgba(0,0,0,0.2)] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#4A4AFF] animate-pulse" />
              Premium Digital Agency — Est. 2026
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-6xl sm:text-7xl xl:text-[84px] font-bold text-[#F7F7F7] leading-[1.05] tracking-tight mb-8"
            >
              The <span className="text-gradient-blue">Best Freelance Agency</span>
              <br className="hidden sm:block" />
              for <span className="text-gradient-gold">World-Class</span> Websites
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#A0A0A0] text-lg sm:text-xl leading-relaxed max-w-2xl mb-12"
            >
              As a premium website maker, we build high-impact digital experiences and strategic branding that drive results — helping your brand rank #1.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-16"
            >
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#4A4AFF] text-white font-medium rounded-xl hover:bg-[#3B3BDD] hover:shadow-[0_0_30px_rgba(74,74,255,0.4)] transition-all duration-300"
              >
                View Our Work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/work"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 border border-[#4A4AFF]/50 bg-[#4A4AFF]/10 text-[#F7F7F7] font-medium rounded-xl hover:bg-[#4A4AFF]/20 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:animate-[shimmer_2s_infinite]" />
                <span className="relative flex items-center gap-2">
                  <Star size={16} className="text-[#EFCB68] fill-[#EFCB68]" /> 
                  Customize your own design
                </span>
              </Link>
            </motion.div>

            {/* Benefits list */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 md:gap-8 pt-8 border-t border-[#2A2A2E] w-full max-w-3xl"
            >
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[#A0A0A0] text-sm md:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A4AFF] shrink-0" />
                  {b}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        </motion.div>
      </section>

      {/* ═══════════ SERVICES PREVIEW ═══════════ */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
              <div>
                <span className="text-[#4A4AFF] text-sm font-medium tracking-widest uppercase">What We Do</span>
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#F7F7F7] mt-3 tracking-tight">
                  A Full Suite of Creative<br />&amp; Digital Services
                </h2>
              </div>
              <Link href="/services" className="flex items-center gap-2 text-[#A0A0A0] text-sm hover:text-[#F7F7F7] transition-colors group">
                All Services <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </SectionReveal>

          <SpotlightCards
            items={services.map((s, i) => ({
              title: s.title,
              description: s.desc,
              icon: i === 0 ? <Code2 size={18} strokeWidth={1.9} color="#4A4AFF" /> : 
                    i === 1 ? <Palette size={18} strokeWidth={1.9} color="#CC44BB" /> : 
                    i === 2 ? <Zap size={18} strokeWidth={1.9} color="#EFCB68" /> : 
                    <ArrowUpRight size={18} strokeWidth={1.9} color="#34d399" />,
              color: i === 0 ? "#4A4AFF" : i === 1 ? "#CC44BB" : i === 2 ? "#EFCB68" : "#34d399"
            }))}
            className="!px-0 !bg-transparent"
          />
        </div>
      </section>

      {/* ═══════════ FEATURED WORK ═══════════ */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
              <div>
                <span className="text-[#CC44BB] text-sm font-medium tracking-widest uppercase">Featured Projects</span>
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#F7F7F7] mt-3 tracking-tight">
                  Across Web, Mobile &amp;<br />Brand Experiences
                </h2>
              </div>
              <Link href="/work" className="flex items-center gap-2 text-[#A0A0A0] text-sm hover:text-[#F7F7F7] transition-colors group">
                All Projects <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </SectionReveal>
        </div>
        
        <div className="w-full max-w-4xl mx-auto mt-4">
          <ul className="flex flex-col gap-4">
            {featuredProjects.map((project, i) => (
              <motion.li 
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <a 
                  href={`/designs/${project.slug}.html`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:px-8 sm:py-7 rounded-2xl bg-[#0F0F11]/50 border border-[#2A2A2E] hover:border-[#4A4AFF]/30 hover:bg-[#1A1A1E] transition-all duration-400 block"
                >
                  <div className="flex items-center gap-6 mb-4 sm:mb-0">
                    <span className="text-[#A0A0A0] font-mono text-xs opacity-40 shrink-0">0{i + 1}</span>
                    <h3 className="font-heading text-lg md:text-xl font-medium text-[#F7F7F7] group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#A0A0A0] text-sm group-hover:text-[#F7F7F7] transition-colors">{project.category}</span>
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <div className="text-center mb-14">
              <span className="text-[#4A4AFF] text-sm font-medium tracking-widest uppercase">Client Feedback</span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#F7F7F7] mt-3 tracking-tight">
                Real Results,<br />Real Feedback
              </h2>
              <p className="text-[#A0A0A0] text-base mt-4 max-w-md mx-auto">See how our work impacted real businesses.</p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.1}>
                <div className="p-7 rounded-2xl border border-[#2A2A2E] bg-[#1A1A1E]">
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} fill="#CC44BB" className="text-[#CC44BB]" />
                    ))}
                  </div>
                  <p className="text-[#F7F7F7] text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#4A4AFF]/20 flex items-center justify-center text-[#4A4AFF] font-heading font-bold text-sm">
                      {t.author[0]}
                    </div>
                    <div>
                      <div className="text-[#F7F7F7] text-sm font-medium">{t.author}</div>
                      <div className="text-[#A0A0A0] text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <motion.div
              ref={ctaRef}
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={() => { normX.set(0.5); normY.set(0.5); }}
              style={{ rotateX, rotateY, transformPerspective: 1200 }}
              className="group relative rounded-3xl overflow-hidden p-10 md:p-16 lg:p-20 bg-[#1A1A1E] border border-[#2A2A2E] transition-[border-color] duration-300 hover:border-[#4A4AFF]/40"
            >
              {/* Shimmer sweep */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[280%]"
              />

              {/* Background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(74,74,255,0.15)_0%,transparent_70%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_85%_80%,rgba(239,203,104,0.1)_0%,transparent_70%)] pointer-events-none" />
              
              <div className="relative text-center max-w-2xl mx-auto z-10">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#F7F7F7] tracking-tight mb-4">
                  Ready to build something remarkable?
                </h2>
                <p className="text-[#CC44BB] text-base font-medium mb-4">
                  Partner with an agency that treats your brand like its own.
                </p>
                <p className="text-[#A0A0A0] text-lg mb-10 leading-relaxed">
                  Let&apos;s create digital experiences that elevate your brand, drive conversions, and accelerate your business growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#4A4AFF] text-white font-medium rounded-xl hover:bg-[#3B3BDD] hover:shadow-[0_0_30px_rgba(74,74,255,0.5)] transition-all duration-300 text-base"
                  >
                    Start a Project
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-[#2A2A2E] text-[#F7F7F7] font-medium rounded-xl hover:border-[#4A4AFF]/50 transition-all duration-300 text-base"
                  >
                    View Our Work
                  </Link>
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
