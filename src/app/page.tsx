"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  Palette,
  Code2,
  Star,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Target
} from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import { ProjectCard } from "@/components/ui/Card";
import { projects } from "@/lib/projects";
import SpotlightCards from "@/components/ui/SpotlightCards";
import LeadGenModal from "@/components/ui/LeadGenModal";
import TrustBanner from "@/components/ui/TrustBanner";
import StatsBlock from "@/components/ui/StatsBlock";

const benefits = [
  "Fast modern websites (Next.js)",
  "Mobile-first design",
  "SEO-optimized structure",
  "Conversion-focused layouts",
];

const services = [
  {
    icon: <Code2 size={22} />,
    title: "Website Development",
    desc: "Lightning-fast, mobile-first websites built on modern tech stacks like Next.js.",
  },
  {
    icon: <Zap size={22} />,
    title: "Ecommerce Setup",
    desc: "High-converting online stores that turn visitors into paying customers.",
  },
  {
    icon: <Palette size={22} />,
    title: "UI/UX Design",
    desc: "User-centered interfaces designed for seamless navigation and engagement.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Conversion Optimization",
    desc: "Data-driven strategies to maximize leads, sales, and overall business growth.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Strategy",
    desc: "We analyze your business, audience, and goals to create a winning digital roadmap.",
  },
  {
    step: "02",
    title: "Design",
    desc: "Crafting premium user experiences with mobile-first and conversion-focused layouts.",
  },
  {
    step: "03",
    title: "Development",
    desc: "Building fast, secure, and SEO-optimized platforms using cutting-edge technology.",
  },
  {
    step: "04",
    title: "Launch & Growth",
    desc: "Deploying your site and scaling your presence with ongoing optimization and support.",
  },
];

const testimonials = [
  {
    quote:
      "Xpeartz transformed our brand completely. The strategy, creativity, and attention to detail were next-level.",
    author: "Sarah Chen",
    role: "Founder, Luxe Studio",
    rating: 5,
  },
  {
    quote:
      "The Nova redesign was a game-changer for us. Our conversion rates skyrocketed post-launch.",
    author: "Marcus Williams",
    role: "CEO, Nova Analytics",
    rating: 5,
  },
  {
    quote:
      "Working with Xpeartz was the best investment we made for Pulse. The design feels premium on every screen.",
    author: "Jordan Lee",
    role: "CEO, Pulse Health",
    rating: 5,
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // For CTA Banner Spotlight Animation
  const ctaRef = useRef<HTMLDivElement>(null);
  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);
  const TILT_MAX = 5; // Reduced from 9 since it's a large container
  const rotateX = useSpring(
    useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]),
    { stiffness: 300, damping: 28 },
  );
  const rotateY = useSpring(
    useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]),
    { stiffness: 300, damping: 28 },
  );

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  };

  // Randomize featured projects on client load to avoid hydration mismatch
  const [featuredProjects, setFeaturedProjects] = useState(
    projects.slice(0, 5),
  );
  useEffect(() => {
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    setFeaturedProjects(shuffled.slice(0, 5));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Press & Hold Lead Gen Logic
  const [holdProgress, setHoldProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null)

  const startHold = () => {
    setIsHolding(true)
    setHoldProgress(0)
    
    const startTime = Date.now()
    const duration = 1500 // 1.5 seconds

    holdTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / duration) * 100, 100)
      setHoldProgress(progress)

      if (progress >= 100) {
        if (holdTimerRef.current) clearInterval(holdTimerRef.current)
        setIsHolding(false)
        setHoldProgress(0)
        setIsModalOpen(true)
      }
    }, 16)
  }

  const stopHold = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current)
    setIsHolding(false)
    setHoldProgress(0)
  }

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearInterval(holdTimerRef.current)
    }
  }, [])

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section
        id="hero-section"
        ref={heroRef}
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
        className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden cursor-none select-none"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

        {/* Hold Progress Bar */}
        <AnimatePresence>
          {isHolding && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-x-0 top-0 h-1.5 bg-[#4A4AFF]/20 z-[100] pointer-events-none"
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-[#4A4AFF] to-[#CC44BB]"
                style={{ width: `${holdProgress}%` }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container-wide relative z-10 w-full mt-24 sm:mt-32">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="flex flex-col items-center text-center max-w-4xl mx-auto w-full"
          >
            {/* Empty block to preserve padding structure removed */}


            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-5xl sm:text-6xl xl:text-[76px] font-bold text-[#F7F7F7] leading-[1.05] tracking-tight mb-8"
            >
              <span className="text-gradient-blue">SEO-Optimized</span> Websites
              <br className="hidden lg:block" /> That Generate Leads <br className="hidden lg:block" /> for <span className="text-gradient-gold">Small Businesses</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#A0A0A0] text-lg sm:text-xl leading-relaxed max-w-2xl mb-12"
            >
              We design and build high-converting websites, ecommerce stores, and digital systems that turn traffic into paying clients.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-16"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#4A4AFF] text-white font-medium rounded-xl hover:bg-[#3B3BDD] hover:shadow-[0_0_30px_rgba(74,74,255,0.4)] transition-all duration-300 relative z-50"
              >
                Start a Project
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/work"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 border border-[#4A4AFF]/50 bg-[#4A4AFF]/10 text-[#F7F7F7] font-medium rounded-xl hover:bg-[#4A4AFF]/20 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:animate-[shimmer_2s_infinite]" />
                <span className="relative flex items-center gap-2">
                  <Star size={16} className="text-[#EFCB68] fill-[#EFCB68]" />
                  View Our Work
                </span>
              </Link>
            </motion.div>


          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        ></motion.div>
      </section>

      {/* ═══════════ TRUST BANNER ═══════════ */}
      <TrustBanner />

      {/* ═══════════ SERVICES PREVIEW ═══════════ */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
              <div>
                <span className="text-[#4A4AFF] text-sm font-medium tracking-widest uppercase">
                  What We Do
                </span>
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#F7F7F7] mt-3 tracking-tight">
                  A Full Suite of Creative
                  <br />
                  &amp; Digital Services
                </h2>
              </div>
              <Link
                href="/services"
                className="flex items-center gap-2 text-[#A0A0A0] text-sm hover:text-[#F7F7F7] transition-colors group"
              >
                All Services{" "}
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </SectionReveal>

          <SpotlightCards
            items={services.map((s, i) => ({
              title: s.title,
              description: s.desc,
              icon:
                i === 0 ? (
                  <Code2 size={18} strokeWidth={1.9} color="#4A4AFF" />
                ) : i === 1 ? (
                  <Palette size={18} strokeWidth={1.9} color="#CC44BB" />
                ) : i === 2 ? (
                  <Zap size={18} strokeWidth={1.9} color="#EFCB68" />
                ) : (
                  <ArrowUpRight size={18} strokeWidth={1.9} color="#34d399" />
                ),
              color:
                i === 0
                  ? "#4A4AFF"
                  : i === 1
                    ? "#CC44BB"
                    : i === 2
                      ? "#EFCB68"
                      : "#34d399",
            }))}
            className="!px-0 !bg-transparent"
          />
        </div>
      </section>

      {/* ═══════════ PROOF SECTION ═══════════ */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <span className="text-[#34d399] text-sm font-medium tracking-widest uppercase mb-3 block">
                  Why Businesses Choose Xpeartz
                </span>
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#F7F7F7] tracking-tight mb-6">
                  Built for Speed, Scale, and Higher Conversions
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-center gap-3">
                      <CheckCircle2 className="text-[#34d399] shrink-0" size={20} />
                      <span className="text-[#F7F7F7]">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════ FEATURED WORK ═══════════ */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
              <div>
                <span className="text-[#CC44BB] text-sm font-medium tracking-widest uppercase">
                  Featured Projects
                </span>
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#F7F7F7] mt-3 tracking-tight">
                  Across Web, Mobile &amp;
                  <br />
                  Brand Experiences
                </h2>
              </div>
              <Link
                href="/work"
                className="flex items-center gap-2 text-[#A0A0A0] text-sm hover:text-[#F7F7F7] transition-colors group"
              >
                All Projects{" "}
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
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
                    <span className="text-[#A0A0A0] font-mono text-xs opacity-40 shrink-0">
                      0{i + 1}
                    </span>
                    <h3 className="font-heading text-lg md:text-xl font-medium text-[#F7F7F7] group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#A0A0A0] text-sm group-hover:text-[#F7F7F7] transition-colors">
                      {project.category}
                    </span>
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════ PROCESS SECTION ═══════════ */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[#EFCB68] text-sm font-medium tracking-widest uppercase block mb-3">
                Our Process
              </span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#F7F7F7] tracking-tight">
                How We Build Your Online Presence
              </h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 relative">
              <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-[#4A4AFF]/0 via-[#4A4AFF]/50 to-[#4A4AFF]/0 z-0" />
              {processSteps.map((step) => (
                <div key={step.step} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1A1A1E] border border-[#2A2A2E] flex items-center justify-center font-heading text-xl font-bold text-[#4A4AFF] mb-6 shadow-[0_0_15px_rgba(74,74,255,0.1)]">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#F7F7F7] mb-3">{step.title}</h3>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <div className="text-center mb-14">
              <span className="text-[#4A4AFF] text-sm font-medium tracking-widest uppercase">
                Client Feedback
              </span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#F7F7F7] mt-3 tracking-tight">
                Real Results,
                <br />
                Real Feedback
              </h2>
              <p className="text-[#A0A0A0] text-base mt-4 max-w-md mx-auto">
                See how our work impacted real businesses.
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.1}>
                <div className="p-6 md:p-8 rounded-2xl border border-[#2A2A2E] bg-[#1A1A1E] hover:border-[#4A4AFF]/40 transition-colors h-full flex flex-col relative overflow-hidden group">
                  <div className="absolute top-6 right-6 font-bold text-lg flex items-center gap-[1px]">
                     <span className="text-[#4285F4]">G</span>
                  </div>
                  <div className="flex flex-col mb-4">
                     <span className="text-[#F7F7F7] font-medium text-base leading-tight block">{t.author}</span>
                     <span className="text-[#A0A0A0] text-xs">4 months ago</span>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        fill="#FBBC05"
                        className="text-[#FBBC05]"
                      />
                    ))}
                    <div className="w-3.5 h-3.5 rounded-full bg-[#4285F4] flex items-center justify-center ml-1">
                      <CheckCircle2 size={10} color="#fff" />
                    </div>
                  </div>
                  <p className="text-[#F7F7F7] text-sm leading-relaxed mb-4 flex-1">
                    {t.quote}
                  </p>
                  <button className="text-[#A0A0A0] text-xs hover:text-[#F7F7F7] transition-colors self-start mt-auto">
                     Read more
                  </button>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="section-padding py-20 border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
               
               {/* Contact Banner Pill */}
               <div className="w-full max-w-4xl bg-[#1A1A1E] border border-[#2A2A2E] rounded-full p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl mb-16 px-6 md:px-10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-[#4A4AFF]/20 flex items-center justify-center shrink-0">
                        <Zap size={20} className="text-[#4A4AFF]" />
                     </div>
                     <div>
                        <h3 className="text-[#F7F7F7] font-heading font-bold text-xl md:text-2xl mb-1">Want To Scale Your Business With Confidence?</h3>
                        <p className="text-[#A0A0A0] text-sm">Reach out to Xpeartz — your growth journey begins now.</p>
                     </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="shrink-0 px-8 py-3.5 bg-[#4A4AFF] text-white font-medium rounded-full hover:bg-[#3B3BDD] transition-colors whitespace-nowrap"
                  >
                    Contact Us
                  </button>
               </div>

               {/* Avatars */}
               <div className="flex justify-center -space-x-4 mb-10 overflow-hidden relative">
                 <div className="w-20 h-20 rounded-full bg-[#8B8BFF]/20 border-4 border-[#0F0F11] flex flex-col items-center justify-center overflow-hidden z-10">
                    <div className="text-3xl filter invert">👨‍💻</div>
                 </div>
                 <div className="w-24 h-24 rounded-full bg-[#CC44BB]/20 border-4 border-[#0F0F11] flex flex-col items-center justify-center overflow-hidden z-20 -mt-2 shadow-[0_0_30px_rgba(204,68,187,0.3)]">
                    <div className="flex absolute top-2"><Star size={12} fill="#EFCB68" color="#EFCB68"/><Star size={12} fill="#EFCB68" color="#EFCB68"/><Star size={12} fill="#EFCB68" color="#EFCB68"/><Star size={12} fill="#EFCB68" color="#EFCB68"/><Star size={12} fill="#EFCB68" color="#EFCB68"/></div>
                    <div className="text-4xl filter invert mt-3">👩‍💼</div>
                 </div>
                 <div className="w-20 h-20 rounded-full bg-[#34d399]/20 border-4 border-[#0F0F11] flex flex-col items-center justify-center overflow-hidden z-10">
                    <div className="text-3xl filter invert">🧗‍♂️</div>
                 </div>
               </div>

               <h2 className="font-heading text-3xl md:text-5xl lg:text-5xl font-bold text-[#F7F7F7] text-center tracking-tight mb-2 max-w-3xl leading-[1.2]">
                 Our Work Speaks Through The Measurable Success Our Clients Achieve.
               </h2>

               <StatsBlock />
            </div>
          </SectionReveal>
        </div>
      </section>

      <LeadGenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
