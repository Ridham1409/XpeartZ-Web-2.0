'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Mail, MapPin, Clock } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(20, 'Please tell us a bit more (at least 20 characters)'),
})

type FormData = z.infer<typeof schema>

const projectTypes = ['Web Design & Development', 'Brand Identity', 'Mobile UI', 'Design System', 'Other']
const budgets = ['$1,000 – $2,500', '$2,500 – $7,500', '$7,500 – $15,000', '$15,000+', 'Let\'s discuss']

const contactInfo = [
  { icon: <Mail size={18} />, label: 'Email', value: 'ridhambhavnagariya@gmail.com' },
  { icon: <MapPin size={18} />, label: 'Location', value: 'Gujarat, India (Remote)' },
  { icon: <Clock size={18} />, label: 'Response Time', value: 'We try to reply within 24 hours' },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200))
    console.log('Form data:', data)
    setSubmitted(true)
    reset()
  }

  return (
    <>
      {/* Hero */}
      <section className="section-padding pt-36">
        <div className="container-wide">
          <SectionReveal>
            <span className="text-[#4A4AFF] text-sm font-medium tracking-widest uppercase">Contact</span>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-[#F7F7F7] mt-4 mb-6 tracking-tight leading-[1.08] max-w-3xl">
              Let&apos;s build something<br />
              <span className="text-gradient-blue">remarkable together</span>
            </h1>
            <p className="text-[#A0A0A0] text-lg leading-relaxed max-w-xl">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a thoughtful response.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <SectionReveal>
                <h2 className="font-heading text-2xl font-bold text-[#F7F7F7] mb-8">Get in Touch</h2>
                <div className="space-y-5">
                  {contactInfo.map(item => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[#1A1A1E] border border-[#2A2A2E] flex items-center justify-center text-[#4A4AFF] shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[#A0A0A0] text-xs uppercase tracking-widest mb-1">{item.label}</div>
                        <div className="text-[#F7F7F7] text-sm">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="p-6 rounded-2xl border border-[#2A2A2E] bg-[#1A1A1E] mt-8">
                  <h3 className="font-heading font-semibold text-[#F7F7F7] mb-2">Our Process</h3>
                  <ol className="space-y-3 text-sm text-[#A0A0A0]">
                    {['Discovery call', 'Proposal & scope', 'Kickoff & design', 'Review & revise', 'Handoff'].map((step, i) => (
                      <li key={step} className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#4A4AFF]/15 border border-[#4A4AFF]/30 flex items-center justify-center text-[#4A4AFF] text-xs font-bold shrink-0">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </SectionReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <SectionReveal delay={0.15}>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center p-16 rounded-3xl border border-[#2A2A2E] bg-[#1A1A1E] min-h-[400px]">
                    <div className="w-16 h-16 rounded-2xl bg-[#4A4AFF]/15 border border-[#4A4AFF]/30 flex items-center justify-center mb-6">
                      <CheckCircle2 size={28} className="text-[#4A4AFF]" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-[#F7F7F7] mb-3">Message Received!</h3>
                    <p className="text-[#A0A0A0] leading-relaxed max-w-sm mb-8">
                      Thank you for reaching out. We&apos;ll review your project brief and try to respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[#4A4AFF] text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Full Name *</label>
                        <input
                          {...register('name')}
                          className="w-full px-4 py-3 rounded-xl bg-[#1A1A1E] border border-[#2A2A2E] text-[#F7F7F7] text-sm placeholder:text-[#A0A0A0]/50 focus:outline-none focus:border-[#4A4AFF]/60 focus:bg-[#4A4AFF]/5 transition-all"
                          placeholder="John Smith"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Email Address *</label>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full px-4 py-3 rounded-xl bg-[#1A1A1E] border border-[#2A2A2E] text-[#F7F7F7] text-sm placeholder:text-[#A0A0A0]/50 focus:outline-none focus:border-[#4A4AFF]/60 focus:bg-[#4A4AFF]/5 transition-all"
                          placeholder="john@company.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Company (Optional)</label>
                      <input
                        {...register('company')}
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1A1E] border border-[#2A2A2E] text-[#F7F7F7] text-sm placeholder:text-[#A0A0A0]/50 focus:outline-none focus:border-[#4A4AFF]/60 focus:bg-[#4A4AFF]/5 transition-all"
                        placeholder="Your company name"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Project Type *</label>
                        <select
                          {...register('projectType')}
                          className="w-full px-4 py-3 rounded-xl bg-[#1A1A1E] border border-[#2A2A2E] text-[#F7F7F7] text-sm focus:outline-none focus:border-[#4A4AFF]/60 transition-all appearance-none"
                        >
                          <option value="">Select type</option>
                          {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {errors.projectType && <p className="text-red-400 text-xs mt-1.5">{errors.projectType.message}</p>}
                      </div>
                      <div>
                        <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Budget Range *</label>
                        <select
                          {...register('budget')}
                          className="w-full px-4 py-3 rounded-xl bg-[#1A1A1E] border border-[#2A2A2E] text-[#F7F7F7] text-sm focus:outline-none focus:border-[#4A4AFF]/60 transition-all appearance-none"
                        >
                          <option value="">Select budget</option>
                          {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        {errors.budget && <p className="text-red-400 text-xs mt-1.5">{errors.budget.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Project Details *</label>
                      <textarea
                        {...register('message')}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1A1E] border border-[#2A2A2E] text-[#F7F7F7] text-sm placeholder:text-[#A0A0A0]/50 focus:outline-none focus:border-[#4A4AFF]/60 focus:bg-[#4A4AFF]/5 transition-all resize-none"
                        placeholder="Tell us about your project, goals, and timeline..."
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#4A4AFF] text-white font-medium rounded-xl hover:bg-[#3B3BDD] hover:shadow-[0_0_30px_rgba(74,74,255,0.4)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <p className="text-[#A0A0A0] text-xs text-center">
                      We reply to every message. No spam, ever.
                    </p>
                  </form>
                )}
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
