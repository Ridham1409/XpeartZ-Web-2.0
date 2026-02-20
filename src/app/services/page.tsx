import type { Metadata } from 'next'
import { CheckCircle2, Zap, Monitor, Smartphone, Layers, BarChart2, Repeat } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore Xpeartz services — web design, brand identity, mobile UI, and design systems.',
}

const tiers = [
  {
    name: 'Starter',
    price: '$89',
    desc: 'Perfect for early-stage startups and solo founders validating an idea.',
    features: [
      'Brand logo + basic guidelines',
      '3-page website design',
      'Mobile-responsive layouts',
      '1 revision round',
      '2-week delivery',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Studio',
    price: '$175',
    desc: 'Our most popular package — ideal for growing businesses ready to scale.',
    features: [
      'Full brand identity system',
      'Up to 8-page website (+ dev)',
      'Design system & component library',
      'Mobile UI screens (up to 12)',
      '3 revision rounds',
      '6-week delivery',
      'Priority support',
    ],
    cta: 'Start a Project',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Comprehensive design and development for established businesses.',
    features: [
      'Everything in Studio',
      'Unlimited pages & screens',
      'Custom motion design',
      'Quarterly design retainer',
      'Dedicated design lead',
      'SLA & priority delivery',
    ],
    cta: 'Contact Us',
    highlight: false,
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
              Everything your brand<br />
              <span className="text-gradient-blue">needs to stand out</span>
            </h1>
            <p className="text-[#A0A0A0] text-lg leading-relaxed max-w-2xl">
              From brand strategy to pixel-perfect interfaces — we offer end-to-end design and development services that help ambitious brands grow.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Service Details */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide space-y-5">
          {serviceDetails.map((s, i) => (
            <SectionReveal key={s.id} delay={i * 0.05}>
              <div id={s.id} className="grid lg:grid-cols-2 gap-8 p-8 rounded-2xl border border-[#2A2A2E] bg-[#1A1A1E]">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#4A4AFF]/12 border border-[#4A4AFF]/20 flex items-center justify-center text-[#4A4AFF] mb-5">
                    {s.icon}
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-[#F7F7F7] mb-3">{s.title}</h2>
                  <p className="text-[#A0A0A0] leading-relaxed">{s.desc}</p>
                </div>
                <div>
                  <h4 className="text-[#A0A0A0] text-xs font-medium tracking-widest uppercase mb-4">What&apos;s Included</h4>
                  <ul className="space-y-3">
                    {s.benefits.map(b => (
                      <li key={b} className="flex items-center gap-3 text-[#F7F7F7] text-sm">
                        <CheckCircle2 size={16} className="text-[#4A4AFF] shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
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
            </div>
          </SectionReveal>

          <div className="grid lg:grid-cols-3 gap-5">
            {tiers.map((tier, i) => (
              <SectionReveal key={tier.name} delay={i * 0.1}>
                <div className={`relative p-8 rounded-2xl border flex flex-col h-full ${tier.highlight ? 'border-[#4A4AFF]/60 bg-[#4A4AFF]/8 shadow-[0_0_40px_rgba(74,74,255,0.15)]' : 'border-[#2A2A2E] bg-[#1A1A1E]'}`}>
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#4A4AFF] rounded-full text-white text-xs font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <div className="text-[#A0A0A0] text-sm font-medium mb-2">{tier.name}</div>
                    <div className="font-heading text-4xl font-bold text-[#F7F7F7]">{tier.price}</div>
                    <p className="text-[#A0A0A0] text-sm mt-3 leading-relaxed">{tier.desc}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-[#F7F7F7]">
                        <CheckCircle2 size={15} className={tier.highlight ? 'text-[#4A4AFF]' : 'text-[#A0A0A0]'} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" variant={tier.highlight ? 'primary' : 'secondary'} className="w-full justify-center">
                    {tier.cta}
                  </Button>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
