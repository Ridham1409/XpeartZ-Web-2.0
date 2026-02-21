'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Mail, MapPin, Clock } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import SpotlightCards from '@/components/ui/SpotlightCards'
import { Slider } from "@/components/base/slider/slider"

const countryOptions = [
  { code: '+91', label: 'IN (+91)', placeholder: '98765 43210' },
  { code: '+1', label: 'US/CA (+1)', placeholder: '202-555-0123' },
  { code: '+44', label: 'UK (+44)', placeholder: '7123 456789' },
  { code: '+61', label: 'AU (+61)', placeholder: '412 345 678' },
  { code: '+971', label: 'UAE (+971)', placeholder: '50 123 4567' },
  { code: '+49', label: 'DE (+49)', placeholder: '1512 3456789' },
  { code: '+33', label: 'FR (+33)', placeholder: '6 12 34 56 78' },
  { code: '+81', label: 'JP (+81)', placeholder: '090-1234-5678' },
  { code: '+86', label: 'CN (+86)', placeholder: '139 1234 5678' },
  { code: '+65', label: 'SG (+65)', placeholder: '8123 4567' },
  { code: '+55', label: 'BR (+55)', placeholder: '11 91234-5678' },
]

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  countryCode: z.string(),
  phone: z.string().min(10, 'Please enter a valid phone number').optional().or(z.literal('')),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.array(z.number()).length(2),
  message: z.string().min(20, 'Please tell us a bit more (at least 20 characters)'),
}).refine((data) => {
  return (data.email && data.email.length > 0) || (data.phone && data.phone.length > 9);
}, {
  message: "Either Email or Phone is required",
  path: ["email"], // Attach error to email field
});

type FormData = z.infer<typeof schema>

const projectTypes = ['Web Design & Development', 'Brand Identity', 'Mobile UI', 'Design System', 'Other']

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
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      countryCode: '+91',
      budget: [89, 500] // Start from user requested 89
    }
  })

  const [submitError, setSubmitError] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    setSubmitError(null)
    try {
      // Format budget range into a readable string for the email
      const budgetRange = `$${data.budget[0]} - ${data.budget[1] === 1000 ? '$1,000+' : `$${data.budget[1]}`}`
      
      const payload = {
        access_key: "32a8b85a-6718-452b-9aa8-af7944b20bbd",
        subject: "New Project Inquiry from Xpeartz Website",
        name: data.name,
        email: data.email,
        phone: `${data.countryCode} ${data.phone}`,
        company: data.company || "Not provided",
        project_type: data.projectType,
        budget: budgetRange,
        message: data.message
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true)
        reset()
      } else {
        setSubmitError(result.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setSubmitError("Failed to send message. Please check your connection and try again.")
      console.error(error)
    }
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
                <SpotlightCards
                  items={contactInfo.map((item, i) => ({
                    title: item.label,
                    description: item.value,
                    icon: i === 0 ? <Mail size={18} strokeWidth={1.9} color="#4A4AFF" /> : 
                        i === 1 ? <MapPin size={18} strokeWidth={1.9} color="#CC44BB" /> : 
                        <Clock size={18} strokeWidth={1.9} color="#EFCB68" />,
                    color: i === 0 ? "#4A4AFF" : i === 1 ? "#CC44BB" : "#EFCB68"
                  }))}
                  className="!px-0 !py-0 !bg-transparent [&>div:last-child]:grid-cols-1 [&>div:last-child]:gap-4"
                />
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
                        <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Email Address <span className="text-[#A0A0A0]/50 lowercase">(Required if no phone)</span></label>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full px-4 py-3 rounded-xl bg-[#1A1A1E] border border-[#2A2A2E] text-[#F7F7F7] text-sm placeholder:text-[#A0A0A0]/50 focus:outline-none focus:border-[#4A4AFF]/60 focus:bg-[#4A4AFF]/5 transition-all"
                          placeholder="john@company.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Phone Number <span className="text-[#A0A0A0]/50 lowercase">(Required if no email)</span></label>
                        <div className="flex gap-2">
                          <div className="relative w-[115px]">
                            <select
                              {...register('countryCode')}
                              className="w-full h-full px-3 py-3 rounded-xl bg-[#1A1A1E] border border-[#2A2A2E] text-[#F7F7F7] text-sm focus:outline-none focus:border-[#4A4AFF]/60 focus:bg-[#4A4AFF]/5 transition-all appearance-none cursor-pointer"
                            >
                              {countryOptions.map(opt => (
                                <option key={opt.code} value={opt.code} className="bg-[#1A1A1E] text-[#F7F7F7] py-2">
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#A0A0A0]">
                              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <input
                              {...register('phone')}
                              type="tel"
                              className="w-full px-4 py-3 rounded-xl bg-[#1A1A1E] border border-[#2A2A2E] text-[#F7F7F7] text-sm placeholder:text-[#A0A0A0]/50 focus:outline-none focus:border-[#4A4AFF]/60 focus:bg-[#4A4AFF]/5 transition-all"
                              placeholder={countryOptions.find(opt => opt.code === watch('countryCode'))?.placeholder || "98765 43210"}
                            />
                            {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>}
                          </div>
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
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Project Type *</label>
                        <div className="relative">
                          <select
                            {...register('projectType')}
                            className="w-full px-4 py-3 rounded-xl bg-[#1A1A1E] border border-[#2A2A2E] text-[#F7F7F7] text-sm focus:outline-none focus:border-[#4A4AFF]/60 focus:bg-[#4A4AFF]/5 transition-all appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-[#1A1A1E] text-[#A0A0A0]">Select type</option>
                            {projectTypes.map(t => <option key={t} value={t} className="bg-[#1A1A1E] text-[#F7F7F7]">{t}</option>)}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A0A0A0]">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                        {errors.projectType && <p className="text-red-400 text-xs mt-1.5">{errors.projectType.message}</p>}
                      </div>
                      <div>
                        <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-5">Budget Range ($) *</label>
                        <Controller
                          control={control}
                          name="budget"
                          render={({ field }) => (
                            <div className="pt-2 px-2">
                              <Slider
                                min={89}
                                max={1000}
                                step={10}
                                value={field.value}
                                onValueChange={field.onChange}
                              />
                              <div className="flex justify-between mt-5 text-[#F7F7F7] font-medium text-sm">
                                <span>${field.value?.[0]}</span>
                                <span>{field.value?.[1] === 1000 ? '$1,000+' : `$${field.value?.[1]}`}</span>
                              </div>
                            </div>
                          )}
                        />
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

                    {submitError && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {submitError}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 py-4 bg-[#4A4AFF] text-white font-medium rounded-xl hover:bg-[#3B3BDD] hover:shadow-[0_0_30px_rgba(74,74,255,0.4)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
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
