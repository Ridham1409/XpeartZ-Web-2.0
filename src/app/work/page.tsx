'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectCard } from '@/components/ui/Card'
import { projects } from '@/lib/projects'
import SectionReveal from '@/components/ui/SectionReveal'

const CATEGORIES = ['All', 'Food & Cafe', 'Health & Gym', 'Real Estate', 'Corporate & Services', 'E-commerce', 'Beauty & Jewelry'] as const
const PAGE_SIZE = 15

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function WorkPage() {
  const [active, setActive] = useState<string>('All')
  const [visible, setVisible] = useState(PAGE_SIZE)
  // New random seed every time 'All' is selected
  const [shuffleSeed, setShuffleSeed] = useState(() => Math.random())

  const filtered = useMemo(() => {
    if (active === 'All') {
      // shuffleSeed is used as dependency so list re-shuffles each time 'All' is clicked
      void shuffleSeed
      return shuffle(projects)
    }
    return projects.filter(p => p.category === active)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, shuffleSeed])

  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  function handleCategory(cat: string) {
    setActive(cat)
    setVisible(PAGE_SIZE)
    if (cat === 'All') setShuffleSeed(Math.random()) // new random order each time All is selected
  }

  return (
    <>
      {/* Hero */}
      <section className="section-padding pt-36">
        <div className="container-wide">
          <SectionReveal>
            <span className="text-[#4A4AFF] text-sm font-medium tracking-widest uppercase">Our Work</span>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-[#F7F7F7] mt-4 mb-6 tracking-tight leading-[1.08]">
              Portfolio of the<br />
              <span className="text-gradient-gold">Best Freelance Agency</span>
            </h1>
            <p className="text-[#A0A0A0] text-lg leading-relaxed max-w-2xl">
              A curated selection of branding, web, and mobile projects — each built around a clear strategy and refined through close collaboration.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="border-t border-[#2A2A2E]">
        <div className="container-wide py-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active === cat
                    ? 'bg-[#4A4AFF] text-white shadow-[0_0_20px_rgba(74,74,255,0.3)]'
                    : 'border border-[#2A2A2E] text-[#A0A0A0] hover:text-[#F7F7F7] hover:border-[#4A4AFF]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-5"
            >
              {shown.map((project, i) => (
                <div key={project.id} className="break-inside-avoid mb-5" data-no-cursor="true">
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisible(v => v + PAGE_SIZE)}
                className="px-8 py-3 rounded-full border border-[#4A4AFF]/50 text-[#8B8BFF] text-sm font-medium hover:bg-[#4A4AFF]/10 hover:border-[#4A4AFF] transition-all duration-300"
              >
                Load More ({filtered.length - visible} remaining)
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
