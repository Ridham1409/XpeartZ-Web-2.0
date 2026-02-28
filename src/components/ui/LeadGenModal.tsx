'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2 } from 'lucide-react'

interface LeadGenModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LeadGenModal({ isOpen, onClose }: LeadGenModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setStep('success')
    }, 1500)
  }

  // Escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#1A1A1E] border border-[#2A2A2E] rounded-[32px] overflow-hidden shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-[#A0A0A0] hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            {step === 'form' ? (
              <div className="p-10 md:p-12">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A4AFF]/10 text-[#4A4AFF] text-xs font-bold uppercase tracking-widest mb-4">
                    Unlock Exclusive Strategy
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#F7F7F7] leading-tight mb-4">
                    Book Your <span className="text-gradient-blue">Free Growth</span> Strategy Call
                  </h2>
                  <p className="text-[#A0A0A0] text-sm md:text-base">
                    Discover how we can transform your brand into a world-class digital authority. No strings attached.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name" 
                      className="w-full bg-[#0F0F11] border border-[#232326] rounded-xl px-5 py-4 text-[#F7F7F7] focus:outline-none focus:border-[#4A4AFF] transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      required
                      placeholder="Work Email" 
                      className="w-full bg-[#0F0F11] border border-[#232326] rounded-xl px-5 py-4 text-[#F7F7F7] focus:outline-none focus:border-[#4A4AFF] transition-colors"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Tell us briefly about your project..." 
                      rows={3}
                      className="w-full bg-[#0F0F11] border border-[#232326] rounded-xl px-5 py-4 text-[#F7F7F7] focus:outline-none focus:border-[#4A4AFF] transition-colors resize-none"
                    ></textarea>
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full py-4 bg-[#4A4AFF] text-white font-bold rounded-xl hover:bg-[#3B3BDD] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#4A4AFF]/20"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Request Strategy Call <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-[#4A4AFF]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#4A4AFF]">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="font-heading text-3xl font-bold text-[#F7F7F7] mb-4">
                  Request Received!
                </h2>
                <p className="text-[#A0A0A0] text-lg leading-relaxed mb-8">
                  Our lead strategist will review your project and get back to you within 24 hours to schedule your call.
                </p>
                <button 
                  onClick={onClose}
                  className="px-10 py-4 border border-[#2A2A2E] text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
