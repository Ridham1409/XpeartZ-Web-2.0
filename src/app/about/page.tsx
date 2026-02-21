"use client"

import { CheckCircle2, Compass, Target, MessageSquare, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import Button from '@/components/ui/Button'
import SpotlightCards from '@/components/ui/SpotlightCards'
import TiltCard from '@/components/ui/TiltCard'

const values = [
  { title: 'Craft Over Speed', desc: 'We trade shortcuts for precision. Every pixel is intentional.' },
  { title: 'Strategy First', desc: 'Beautiful design that is also strategic and results-driven.' },
  { title: 'Radical Transparency', desc: 'Open communication and clear timelines at every stage.' },
  { title: 'Continuous Refinement', desc: 'We iterate until the work is genuinely exceptional.' },
]

const timeline = [
  { year: '2026', title: 'Founded in Surat', desc: 'Xpeartz was born with a mission to empower small and local businesses with smart design and strategic digital solutions.' },
  { year: '2026', title: 'Expanding Services', desc: 'Growing our capabilities across web, mobile, and brand identity to serve emerging brands effectively.' },
]

const team = [
  { name: 'Ridham Bhavnagariya', role: 'Founder & Creative Director', accent: '#4A4AFF' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding pt-36">
        <div className="container-wide">
          <SectionReveal>
            <span className="text-[#4A4AFF] text-sm font-medium tracking-widest uppercase">About Xpeartz</span>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-[#F7F7F7] mt-4 mb-6 tracking-tight leading-[1.08] max-w-3xl">
              The <span className="text-gradient-blue">Best Website Maker</span> & Freelance Agency with a mission
            </h1>
            <p className="text-[#A0A0A0] text-lg leading-relaxed max-w-2xl">
              Xpeartz is a premium digital design studio working at the intersection of craft, strategy, and technology. We partner with ambitious brands to create digital experiences that are not just beautiful — but effective.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <span className="text-[#CC44BB] text-sm font-medium tracking-widest uppercase">Our Story</span>
              <h2 className="font-heading text-4xl font-bold text-[#F7F7F7] mt-4 mb-6 tracking-tight">
                From a small studio to a trusted creative partner
              </h2>
              <div className="space-y-4 text-[#A0A0A0] leading-relaxed">
                <p>
                  Xpeartz was founded in 2026 in Surat with a clear purpose: We empower small businesses to grow and thrive online.
                </p>
                <p>
                  At Xpeartz, our goal is to help emerging and local businesses build a strong digital presence, attract more customers, and scale their brands effectively — through smart design and strategic digital solutions.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* Stat 1 */}
                <TiltCard color="#4A4AFF" className="p-6 bg-[#1A1A1E] border-[#2A2A2E] flex flex-col justify-between">
                  <div className="relative">
                    <div className="font-heading text-5xl font-bold text-[#4A4AFF]">50+</div>
                    <div className="text-[#F7F7F7] font-medium mt-1 text-sm">Projects Delivered</div>
                    <div className="text-[#A0A0A0] text-xs mt-1 leading-relaxed">Websites, brands & digital products shipped</div>
                  </div>
                  <div className="relative w-8 h-8 rounded-xl bg-[#4A4AFF]/20 flex items-center justify-center mt-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A4AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                  </div>
                </TiltCard>

                {/* Stat 2 */}
                <TiltCard color="#CC44BB" className="p-6 bg-[#1A1A1E] border-[#2A2A2E] flex flex-col justify-between">
                  <div className="relative">
                    <div className="font-heading text-5xl font-bold text-[#CC44BB]">100%</div>
                    <div className="text-[#F7F7F7] font-medium mt-1 text-sm">Client Satisfaction</div>
                    <div className="text-[#A0A0A0] text-xs mt-1 leading-relaxed">Every client leaves happy — guaranteed</div>
                  </div>
                  <div className="relative w-8 h-8 rounded-xl bg-[#CC44BB]/20 flex items-center justify-center mt-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CC44BB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                </TiltCard>

                {/* Stat 3 */}
                <TiltCard color="#EFCB68" className="p-6 bg-[#1A1A1E] border-[#2A2A2E] flex flex-col justify-between">
                  <div className="relative">
                    <div className="font-heading text-5xl font-bold text-[#EFCB68]">7d</div>
                    <div className="text-[#F7F7F7] font-medium mt-1 text-sm">Fast Turnaround</div>
                    <div className="text-[#A0A0A0] text-xs mt-1 leading-relaxed">Most websites live in under a week</div>
                  </div>
                  <div className="relative w-8 h-8 rounded-xl bg-[#EFCB68]/20 flex items-center justify-center mt-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EFCB68" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                </TiltCard>

                {/* Stat 4 */}
                <TiltCard color="#F7F7F7" className="p-6 bg-gradient-to-br from-[#4A4AFF]/20 to-[#CC44BB]/10 border-[#4A4AFF]/30 flex flex-col justify-between">
                  <div className="relative">
                    <div className="font-heading text-5xl font-bold text-[#F7F7F7]">1</div>
                    <div className="text-[#F7F7F7] font-medium mt-1 text-sm">Expert Studio</div>
                    <div className="text-[#A0A0A0] text-xs mt-1 leading-relaxed">Boutique quality, focused & passionate</div>
                  </div>
                  <div className="relative w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center mt-4 border border-white/20">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F7F7F7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                </TiltCard>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <span className="text-[#4A4AFF] text-sm font-medium tracking-widest uppercase">Our Values</span>
            <h2 className="font-heading text-4xl font-bold text-[#F7F7F7] mt-4 mb-12 tracking-tight">
              Principles we work by
            </h2>
          </SectionReveal>
          <SpotlightCards
            items={values.map((v, i) => ({
              title: v.title,
              description: v.desc,
              icon: i === 0 ? <Compass size={18} strokeWidth={1.9} color="#4A4AFF" /> :
                    i === 1 ? <Target size={18} strokeWidth={1.9} color="#CC44BB" /> :
                    i === 2 ? <MessageSquare size={18} strokeWidth={1.9} color="#EFCB68" /> :
                    <RefreshCw size={18} strokeWidth={1.9} color="#34d399" />,
              color: i === 0 ? "#4A4AFF" : i === 1 ? "#CC44BB" : i === 2 ? "#EFCB68" : "#34d399"
            }))}
            className="!px-0 !bg-transparent"
          />
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <span className="text-[#CC44BB] text-sm font-medium tracking-widest uppercase">Our Journey</span>
            <h2 className="font-heading text-4xl font-bold text-[#F7F7F7] mt-4 mb-12 tracking-tight">
              Our Beginnings
            </h2>
          </SectionReveal>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#2A2A2E] hidden sm:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <SectionReveal key={item.year} delay={i * 0.1}>
                  <div className="sm:pl-20 relative">
                    <div className="hidden sm:flex absolute left-0 w-12 h-12 rounded-xl bg-[#1A1A1E] border border-[#4A4AFF]/40 items-center justify-center top-0">
                      <span className="font-heading font-bold text-[#4A4AFF] text-xs">{item.year.slice(2)}</span>
                    </div>
                    <div className="p-6 rounded-2xl border border-[#2A2A2E] bg-[#1A1A1E]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="sm:hidden text-[#4A4AFF] text-xs font-bold">{item.year}</span>
                        <h3 className="font-heading font-semibold text-[#F7F7F7]">{item.title}</h3>
                      </div>
                      <p className="text-[#A0A0A0] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <span className="text-[#4A4AFF] text-sm font-medium tracking-widest uppercase">The Team</span>
            <h2 className="font-heading text-4xl font-bold text-[#F7F7F7] mt-4 mb-12 tracking-tight">
              The minds behind the work
            </h2>
          </SectionReveal>
          <div className="flex justify-center mb-14">
            <SectionReveal>
              <TiltCard color="#4A4AFF" className="p-8 bg-[#1A1A1E] border-[#2A2A2E] text-center w-64 mx-auto">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #4A4AFF33, #4A4AFF66)', border: '1px solid #4A4AFF40' }}
                >
                  <Image src="/logo.png" alt="Xpeartz" width={56} height={56} className="object-contain" />
                </div>
                <h3 className="font-heading font-semibold text-[#F7F7F7]">Ridham Bhavnagariya</h3>
                <p className="text-[#A0A0A0] text-xs mt-1">Founder & Creative Director</p>
              </TiltCard>
            </SectionReveal>
          </div>
          <SectionReveal>
            <div className="text-center">
              <Button href="/contact" variant="primary" size="lg">Work With Us</Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
