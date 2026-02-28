"use client"

import { useState } from 'react'
import Link from 'next/link'
import SectionReveal from '@/components/ui/SectionReveal'
import { blogPosts, categories } from '@/lib/blog-data'
import { ArrowRight, Search, Tag } from 'lucide-react'

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory ? post.category === activeCategory : true
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.keyword.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <section className="section-padding pt-36 pb-12">
        <div className="container-wide">
          <SectionReveal>
            <span className="text-[#CC44BB] text-sm font-medium tracking-widest uppercase">Insights & Growth</span>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-[#F7F7F7] mt-4 mb-6 tracking-tight leading-[1.08] max-w-4xl">
              Strategies to <span className="text-gradient-purple">Build & Scale</span> Your Online Business
            </h1>
            <p className="text-[#A0A0A0] text-lg leading-relaxed max-w-2xl mb-12">
              Actionable guides, deep dives, and case studies on e-commerce, digital marketing, funnels, and business operations to help you grow.
            </p>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-t border-[#2A2A2E] pt-8">
              <div className="relative w-full md:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A0A0A0]" size={18} />
                <input 
                  type="text" 
                  placeholder="Search insights..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1A1A1E] border border-[#2A2A2E] text-[#F7F7F7] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#4A4AFF] transition-colors"
                />
              </div>

              {/* Mobile categories scrollable list */}
              <div className="flex overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide gap-2">
                <button 
                  onClick={() => setActiveCategory(null)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === null 
                      ? 'bg-[#4A4AFF] text-white' 
                      : 'bg-[#1A1A1E] border border-[#2A2A2E] text-[#A0A0A0] hover:text-[#F7F7F7]'
                  }`}
                >
                  All Topics
                </button>
                {categories.map(category => (
                  <button 
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category 
                        ? 'bg-[#4A4AFF] text-white' 
                        : 'bg-[#1A1A1E] border border-[#2A2A2E] text-[#A0A0A0] hover:text-[#F7F7F7]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="section-padding pt-0 min-h-[50vh]">
        <div className="container-wide">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-[#0C0C0E] rounded-3xl border border-[#2A2A2E]">
              <p className="text-[#A0A0A0] text-lg">No articles found matching your criteria.</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory(null);}}
                className="mt-4 text-[#4A4AFF] font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, i) => (
                <SectionReveal key={post.id} delay={(i % 10) * 0.05}>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col justify-between h-full p-8 bg-[#0C0C0E] border border-[#232326] rounded-[24px] hover:border-[#4A4AFF]/40 hover:bg-[#121215] transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-[#4A4AFF]/0 to-transparent group-hover:via-[#4A4AFF]/50 transition-all duration-500" />
                    
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Tag size={14} className="text-[#CC44BB]" />
                        <span className="text-[#A0A0A0] text-xs font-medium uppercase tracking-wider">{post.category}</span>
                      </div>
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-[#F7F7F7] mb-4 leading-snug group-hover:text-white">
                        {post.title}
                      </h3>
                      <p className="text-[#8A8A8C] text-sm leading-relaxed mb-8 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[#4A4AFF] font-medium text-sm mt-auto">
                      Read Article 
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
