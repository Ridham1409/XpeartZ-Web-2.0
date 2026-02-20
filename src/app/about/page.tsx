import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Xpeartz — our story, values, mission, and the team behind the work.',
}

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
              Design with purpose,<br />
              <span className="text-gradient-blue">built to last</span>
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
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#1A1A1E] border border-[#2A2A2E]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(74,74,255,0.12)_0%,transparent_70%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="font-heading text-8xl font-bold text-gradient-blue">X</div>
                    <div className="text-[#A0A0A0] text-sm tracking-widest">XPEARTZ</div>
                  </div>
                </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl border border-[#2A2A2E] bg-[#1A1A1E] h-full">
                  <CheckCircle2 size={20} className="text-[#4A4AFF] mb-4" />
                  <h3 className="font-heading font-semibold text-[#F7F7F7] mb-2">{v.title}</h3>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
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
              <div className="p-8 rounded-2xl border border-[#2A2A2E] bg-[#1A1A1E] text-center w-64">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #4A4AFF33, #4A4AFF66)', border: '1px solid #4A4AFF40' }}
                >
                  <img src="/logo.png" alt="Xpeartz" className="w-14 h-14 object-contain" />
                </div>
                <h3 className="font-heading font-semibold text-[#F7F7F7]">Ridham Bhavnagariya</h3>
                <p className="text-[#A0A0A0] text-xs mt-1">Founder & Creative Director</p>
              </div>
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
