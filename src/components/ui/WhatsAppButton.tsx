'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const phoneNumber = '917016495030'
  const message = encodeURIComponent("Hi Xpeartz! I saw your website and I'm interested in discussing a project with your agency.")
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="mb-2 px-4 py-2 bg-[#1A1A1E] border border-[#2A2A2E] rounded-xl text-[#F7F7F7] text-xs font-medium shadow-2xl backdrop-blur-md hidden md:block"
          >
            Have a project? Chat with us! 🚀
          </motion.div>
          
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-no-cursor="true"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-shadow duration-300 relative group"
          >
            {/* Pulsing effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
            />
            
            <MessageCircle size={32} fill="currentColor" strokeWidth={1.5} />
            
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#CC44BB] rounded-full border-2 border-[#0F0F11]" />
          </motion.a>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
