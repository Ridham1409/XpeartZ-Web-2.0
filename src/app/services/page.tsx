"use client"

import { CheckCircle2, Zap, Monitor, Smartphone, Layers, BarChart2, Repeat, Box, Blocks, Rocket, Palette, RefreshCw, Clock, Code2, ShieldCheck, Infinity as InfinityIcon, User, Calendar, Play } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import Button from '@/components/ui/Button'
import SpotlightCards from '@/components/ui/SpotlightCards'
import TiltCard from '@/components/ui/TiltCard'

const tiers = [
  {
    name: 'Starter',
    price: '$199',
    desc: 'Perfect for early-stage startups and solo founders validating an idea.',
    icon: <Box size={20} className="text-[#4A4AFF]" />,
    features: [
      { text: 'Brand logo + basic guidelines', icon: <Palette size={18} className="text-[#4A4AFF]" /> },
      { text: '3-page website design', icon: <Monitor size={18} className="text-[#34d399]" /> },
      { text: 'Mobile-responsive layouts', icon: <Smartphone size={18} className="text-[#EFCB68]" /> },
      { text: '1 revision round', icon: <RefreshCw size={18} className="text-[#CC44BB]" /> },
      { text: '2-week delivery', icon: <Clock size={18} className="text-[#A78BFA]" /> },
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Studio',
    price: '$359',
    desc: 'Our most popular package — ideal for growing businesses ready to scale.',
    icon: <Blocks size={20} className="text-[#CC44BB]" />,
    features: [
      { text: 'Full brand identity system', icon: <Layers size={18} className="text-[#CC44BB]" /> },
      { text: 'Up to 8-page website (+ dev)', icon: <Code2 size={18} className="text-[#34d399]" /> },
      { text: 'Design system & component library', icon: <Blocks size={18} className="text-[#4A4AFF]" /> },
      { text: 'Mobile UI screens (up to 12)', icon: <Smartphone size={18} className="text-[#EFCB68]" /> },
      { text: '3 revision rounds', icon: <RefreshCw size={18} className="text-[#F472B6]" /> },
      { text: '6-week delivery', icon: <Clock size={18} className="text-[#A78BFA]" /> },
      { text: 'Priority support', icon: <Zap size={18} className="text-[#F59E0B]" /> },
    ],
    cta: 'Start a Project',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Comprehensive design and development for established businesses.',
    icon: <Rocket size={20} className="text-[#EFCB68]" />,
    features: [
      { text: 'Everything in Studio', icon: <CheckCircle2 size={18} className="text-[#34d399]" /> },
      { text: 'Unlimited pages & screens', icon: <InfinityIcon size={18} className="text-[#4A4AFF]" /> },
      { text: 'Custom motion design', icon: <Play size={18} className="text-[#CC44BB]" /> },
      { text: 'Quarterly design retainer', icon: <Calendar size={18} className="text-[#EFCB68]" /> },
      { text: 'Dedicated design lead', icon: <User size={18} className="text-[#F472B6]" /> },
      { text: 'SLA & priority delivery', icon: <ShieldCheck size={18} className="text-[#34d399]" /> },
    ],
    cta: 'Contact Us',
    highlight: true,
  },
]

const serviceDetails = [
  {
    id: 'web',
    icon: <Monitor size={24} />,
    title: 'Web Design & Development',
    desc: 'We design and build high-performance websites that convert visitors into loyal customers. From marketing sites to complex web apps — we handle the full stack.',
    benefits: ['Strategy-led UX design', 'Next.js / React development', 'CMS integration', 'SEO & performance optimization'],
  },
  {
    id: 'brand',
    icon: <Layers size={24} />,
    title: 'Brand Identity',
    desc: 'Your brand is the first impression. We craft comprehensive visual identities that communicate your values, differentiate you from competitors, and build lasting recognition.',
    benefits: ['Logo & wordmark design', 'Color & typography system', 'Brand guidelines', 'Print & digital assets'],
  },
  {
    id: 'mobile',
    icon: <Smartphone size={24} />,
    title: 'Mobile UI Design',
    desc: 'Premium mobile experiences that feel native and intuitive on iOS and Android. We handle everything from concept to developer-ready Figma deliverables.',
    benefits: ['iOS & Android UI', 'Prototype & micro-interactions', 'Accessibility compliance', 'Design handoff'],
  },
  {
    id: 'systems',
    icon: <Repeat size={24} />,
    title: 'Design Systems',
    desc: 'Scalable, consistent design languages that power fast product growth. We build component libraries and documentation that entire teams use confidently.',
    benefits: ['Figma component library', 'Storybook integration', 'Token documentation', 'Team onboarding'],
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding pt-36">
        <div className="container-wide">
          <SectionReveal>
            <span className="text-[#4A4AFF] text-sm font-medium tracking-widest uppercase">Services</span>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-[#F7F7F7] mt-4 mb-6 tracking-tight leading-[1.08] max-w-3xl">
              World-Class digital solutions from the <span className="text-gradient-blue">Best Website Maker</span>
            </h1>
            <p className="text-[#A0A0A0] text-lg leading-relaxed max-w-2xl">
              From brand strategy to pixel-perfect interfaces — we offer end-to-end design and development services that help ambitious brands grow.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Service Details */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SpotlightCards
            heading="Our Core Capabilities"
            eyebrow="What We Do"
            items={serviceDetails.map((s, i) => ({
              title: s.title,
              description: s.desc + "\n\nIncludes:\n" + s.benefits.join(" • "),
              icon: i === 0 ? <Monitor size={18} strokeWidth={1.9} color="#4A4AFF" /> : 
                    i === 1 ? <Layers size={18} strokeWidth={1.9} color="#CC44BB" /> : 
                    i === 2 ? <Smartphone size={18} strokeWidth={1.9} color="#EFCB68" /> : 
                    <Repeat size={18} strokeWidth={1.9} color="#34d399" />,
              color: i === 0 ? "#4A4AFF" : i === 1 ? "#CC44BB" : i === 2 ? "#EFCB68" : "#34d399"
            }))}
            className="!px-0 !bg-transparent"
          />
        </div>
      </section>

      {/* Pricing - Keeping custom cards for pricing as SpotlightCards doesn't support complex children like lists and buttons, but adding hover effects from SpotlightCards inspiration */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <div className="text-center mb-14">
              <span className="text-[#CC44BB] text-sm font-medium tracking-widest uppercase">Pricing</span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#F7F7F7] mt-3 tracking-tight">
                Transparent, honest pricing
              </h2>
              <p className="text-[#A0A0A0] mt-4 max-w-lg mx-auto">
                All packages include a discovery workshop and a dedicated project manager. No hidden fees, Tax not included.
              </p>
              <p className="text-[#8B8BFF] text-xs mt-3 font-medium italic opacity-80 uppercase tracking-widest">
                * Note: Prices may change according to demand and project complexity.
              </p>
            </div>
          </SectionReveal>

          <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
            {tiers.map((tier, i) => (
              <SectionReveal key={tier.name} delay={i * 0.1}>
                <TiltCard 
                  color={tier.highlight ? "#EC4899" : "#4A4AFF"} 
                  className={`p-8 bg-[#0C0C0E] border-[#232326] flex flex-col h-full rounded-[24px] ${tier.highlight ? 'border-[#3A3A3Ecc]' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {tier.icon}
                    <h3 className="font-heading text-xl font-bold text-[#F7F7F7]">{tier.name}</h3>
                  </div>
                  <p className="text-[#A0A0A0] text-sm mb-8 leading-relaxed min-h-[40px]">{tier.desc}</p>
                  
                  <div className="mb-10">
                    <div className="text-[#8A8A8A] text-xs mb-1">starts at</div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl font-bold text-[#F7F7F7]">{tier.price}</span>
                      {tier.price !== 'Custom' && <span className="text-[#8A8A8A] text-sm">/project</span>}
                    </div>
                  </div>

                  <ul className="space-y-5 mb-10 flex-1">
                    {tier.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="mt-0.5 shrink-0">
                          {f.icon}
                        </div>
                        <div>
                          <div className="text-[#F7F7F7] text-sm font-medium leading-snug">{f.text}</div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    href="/contact" 
                    variant="primary"
                    className={`w-full justify-center !py-4 !rounded-xl transition-all duration-300 relative z-20 ${tier.highlight ? '!bg-[#EC4899] !text-white !border-transparent hover:!bg-[#DB2777] shadow-[0_0_20px_rgba(236,72,153,0.3)]' : '!bg-[#1A1A1E] border border-[#2A2A2E] !text-[#F7F7F7] hover:!bg-[#2A2A2E] hover:border-[#3A3A3E]'}`}
                  >
                    {tier.cta}
                  </Button>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
