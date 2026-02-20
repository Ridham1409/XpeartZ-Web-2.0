import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Star, Quote } from 'lucide-react'
import { getProjectBySlug, projects } from '@/lib/projects'
import SectionReveal from '@/components/ui/SectionReveal'
import Button from '@/components/ui/Button'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.description,
  }
}

export default function CaseStudyPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <>
      {/* Back */}
      <div className="pt-24 pb-0 border-b border-[#2A2A2E]">
        <div className="container-wide py-5">
          <Link href="/work" className="inline-flex items-center gap-2 text-[#A0A0A0] text-sm hover:text-[#F7F7F7] transition-colors">
            <ArrowLeft size={15} />
            Back to Work
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionReveal>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#4A4AFF]/15 text-[#8B8BFF] border border-[#4A4AFF]/20">
                {project.category}
              </span>
              <span className="text-[#A0A0A0] text-sm">{project.year}</span>
              <span className="text-[#2A2A2E]">·</span>
              <span className="text-[#A0A0A0] text-sm">{project.client}</span>
            </div>
            <h1 className="font-heading text-5xl lg:text-6xl font-bold text-[#F7F7F7] tracking-tight leading-[1.08] mb-4">
              {project.title}
            </h1>
            <p className="text-[#A0A0A0] text-xl leading-relaxed max-w-2xl">{project.subtitle}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-xs rounded-lg bg-[#1A1A1E] border border-[#2A2A2E] text-[#A0A0A0]">
                  {tag}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Main thumbnail */}
      <section className="border-t border-[#2A2A2E]">
        <div className="container-wide py-8">
          <SectionReveal>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#2A2A2E]">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Problem / Solution / Outcome */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-5">
            {[
              { label: 'The Challenge', color: '#CC44BB', content: project.problem },
              { label: 'Our Approach', color: '#4A4AFF', content: project.solution },
              { label: 'The Outcome', color: '#4A4AFF', content: project.outcome },
            ].map((block, i) => (
              <SectionReveal key={block.label} delay={i * 0.1}>
                <div className="p-7 rounded-2xl border border-[#2A2A2E] bg-[#1A1A1E] h-full">
                  <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: block.color }}>
                    {block.label}
                  </div>
                  <p className="text-[#A0A0A0] leading-relaxed text-sm">{block.content}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      {project.screenshots.length > 0 && (
        <section className="section-padding border-t border-[#2A2A2E]">
          <div className="container-wide">
            <SectionReveal>
              <h2 className="font-heading text-3xl font-bold text-[#F7F7F7] mb-8">Project Screens</h2>
            </SectionReveal>
            <div className="space-y-5">
              {project.screenshots.map((src, i) => (
                <SectionReveal key={i} delay={i * 0.1}>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#2A2A2E]">
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="section-padding border-t border-[#2A2A2E]">
          <div className="container-wide">
            <SectionReveal>
              <div className="max-w-3xl mx-auto p-10 rounded-3xl border border-[#2A2A2E] bg-[#1A1A1E] text-center">
                <Quote size={32} className="text-[#4A4AFF]/40 mx-auto mb-6" />
                <blockquote className="font-heading text-2xl text-[#F7F7F7] font-medium leading-relaxed mb-8">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4A4AFF]/20 flex items-center justify-center text-[#4A4AFF] font-heading font-bold">
                    {project.testimonial.author[0]}
                  </div>
                  <div className="text-left">
                    <div className="text-[#F7F7F7] font-medium text-sm">{project.testimonial.author}</div>
                    <div className="text-[#A0A0A0] text-xs">{project.testimonial.role}</div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Next Steps CTA */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide text-center">
          <SectionReveal>
            <h2 className="font-heading text-3xl font-bold text-[#F7F7F7] mb-4">Ready to build something like this?</h2>
            <p className="text-[#A0A0A0] mb-8">Let&apos;s talk about your project.</p>
            <div className="flex justify-center gap-3">
              <Button href="/contact" variant="primary" size="lg">Start a Project</Button>
              <Button href="/work" variant="secondary" size="lg">More Work</Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
