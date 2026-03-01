'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2 } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Slider } from "@/components/base/slider/slider"
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

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
  path: ["email"],
});

type FormData = z.infer<typeof schema>

const projectTypes = ['Web Design & Development', 'Brand Identity', 'Mobile UI', 'Design System', 'Other']

interface LeadGenModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LeadGenModal({ isOpen, onClose }: LeadGenModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

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
      budget: [89, 500] 
    }
  })

  // Escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const onSubmit = async (data: FormData) => {
    setSubmitError(null)
    try {
      const budgetRange = `$${data.budget[0]} - ${data.budget[1] === 1000 ? '$1,000+' : `$${data.budget[1]}`}`
      
      const formData = {
        name: data.name,
        email: data.email || null,
        phone: `${data.countryCode} ${data.phone}`,
        company: data.company || null,
        projectType: data.projectType,
        budget: {
          min: data.budget[0],
          max: data.budget[1] === 1000 ? 1000 : data.budget[1],
          isMaximum: data.budget[1] === 1000
        },
        message: data.message,
        createdAt: serverTimestamp(),
        source: 'modal_strategy_call'
      }

      // 1. Save to Firestore
      await addDoc(collection(db, 'leads'), formData)

      // 2. Send Email via Web3Forms (Backup/Notification)
      
      const payload = {
        access_key: "32a8b85a-6718-452b-9aa8-af7944b20bbd",
        subject: "New MODAL Project Inquiry from Xpeartz Website",
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#1A1A1E] border border-[#2A2A2E] rounded-[32px] overflow-hidden shadow-2xl my-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-[#A0A0A0] hover:text-white transition-colors z-50"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-[#4A4AFF]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#4A4AFF]">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="font-heading text-3xl font-bold text-[#F7F7F7] mb-4">
                  Request Received!
                </h2>
                <p className="text-[#A0A0A0] text-lg leading-relaxed mb-8">
                  Thank you for reaching out. We&apos;ll review your project brief and try to respond within 24 hours.
                </p>
                <button 
                  onClick={onClose}
                  className="px-10 py-4 border border-[#2A2A2E] text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A4AFF]/10 text-[#4A4AFF] text-xs font-bold uppercase tracking-widest mb-4">
                    Exclusive Strategy
                  </div>
                  <h2 className="font-heading text-3xl md:text-3xl font-bold text-[#F7F7F7] leading-tight mb-4">
                    Book Your <span className="text-gradient-blue">Free Strategy</span> Call
                  </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Full Name *</label>
                      <input
                        {...register('name')}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F0F11] border border-[#232326] text-[#F7F7F7] text-sm placeholder:text-[#A0A0A0]/50 focus:outline-none focus:border-[#4A4AFF] transition-all"
                        placeholder="John Smith"
                      />
                      {errors.name && <p className="text-red-400 text-[10px] mt-1.5">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Email Address</label>
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-[#0F0F11] border border-[#232326] text-[#F7F7F7] text-sm placeholder:text-[#A0A0A0]/50 focus:outline-none focus:border-[#4A4AFF] transition-all"
                        placeholder="john@company.com"
                      />
                      {errors.email && <p className="text-red-400 text-[10px] mt-1.5">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Phone Number</label>
                      <div className="flex gap-2">
                        <div className="relative w-[100px]">
                          <select
                            {...register('countryCode')}
                            className="w-full h-full px-2 py-3 rounded-xl bg-[#0F0F11] border border-[#232326] text-[#F7F7F7] text-xs focus:outline-none focus:border-[#4A4AFF] appearance-none cursor-pointer"
                          >
                            {countryOptions.map(opt => (
                              <option key={opt.code} value={opt.code} className="bg-[#1A1A1E]">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          {...register('phone')}
                          className="flex-1 px-4 py-3 rounded-xl bg-[#0F0F11] border border-[#232326] text-[#F7F7F7] text-sm placeholder:text-[#A0A0A0]/50 focus:outline-none focus:border-[#4A4AFF]"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Project Type *</label>
                      <select
                        {...register('projectType')}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F0F11] border border-[#232326] text-[#F7F7F7] text-sm focus:outline-none focus:border-[#4A4AFF] appearance-none cursor-pointer"
                      >
                        <option value="">Select type</option>
                        {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.projectType && <p className="text-red-400 text-[10px] mt-1.5">{errors.projectType.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-4">Budget Range ($) *</label>
                    <Controller
                      control={control}
                      name="budget"
                      render={({ field }) => (
                        <div className="px-2">
                          <Slider
                            min={89}
                            max={1000}
                            step={10}
                            value={field.value}
                            onValueChange={field.onChange}
                          />
                          <div className="flex justify-between mt-4 text-[#F7F7F7] font-medium text-xs">
                            <span>${field.value?.[0]}</span>
                            <span>{field.value?.[1] === 1000 ? '$1,000+' : `$${field.value?.[1]}`}</span>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-[#A0A0A0] text-xs uppercase tracking-widest mb-2">Project Details *</label>
                    <textarea
                      {...register('message')}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-[#0F0F11] border border-[#232326] text-[#F7F7F7] text-sm placeholder:text-[#A0A0A0]/50 focus:outline-none focus:border-[#4A4AFF] resize-none"
                      placeholder="Briefly describe your project goals..."
                    />
                    {errors.message && <p className="text-red-400 text-[10px] mt-1.5">{errors.message.message}</p>}
                  </div>

                  {submitError && (
                    <p className="text-red-400 text-xs text-center">{submitError}</p>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#4A4AFF] text-white font-bold rounded-xl hover:bg-[#3B3BDD] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send Message'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
