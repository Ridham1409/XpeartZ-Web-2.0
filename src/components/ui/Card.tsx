'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.25) }}
    >
      <Link href={`/designs/${project.slug}.html`} target="_blank" rel="noopener noreferrer" className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-[#1A1A1E] border border-[#2A2A2E] hover:border-[#4A4AFF]/40 transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          {/* Thumbnail */}
          <div className="relative overflow-hidden bg-[#0F0F11]">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={0}
              height={0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              loading={index < 10 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Arrow icon */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#0F0F11]/80 backdrop-blur border border-[#2A2A2E] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <ArrowUpRight size={16} className="text-[#F7F7F7]" />
            </div>
          </div>

          {/* Meta */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-[#4A4AFF]/15 text-[#8B8BFF] border border-[#4A4AFF]/20">
                {project.category}
              </span>
              <span className="text-[#A0A0A0] text-xs">{project.year}</span>
            </div>
            <h3 className="font-heading font-semibold text-[#F7F7F7] text-lg mt-2 group-hover:text-gradient-blue transition-all">
              {project.title}
            </h3>
            <p className="text-[#A0A0A0] text-sm mt-1 leading-relaxed line-clamp-2">
              {project.subtitle}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[#2A2A2E] text-[#A0A0A0]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index?: number
}

export function FeatureCard({ icon, title, description, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-6 rounded-2xl border border-[#2A2A2E] bg-[#1A1A1E] hover:border-[#4A4AFF]/40 hover:bg-[#1A1A1E] transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
    >
      <div className="w-11 h-11 rounded-xl bg-[#4A4AFF]/15 border border-[#4A4AFF]/20 flex items-center justify-center text-[#4A4AFF] mb-5 group-hover:bg-[#4A4AFF]/25 group-hover:shadow-[0_0_20px_rgba(74,74,255,0.2)] transition-all">
        {icon}
      </div>
      <h3 className="font-heading font-semibold text-[#F7F7F7] text-lg mb-2">{title}</h3>
      <p className="text-[#A0A0A0] text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}
