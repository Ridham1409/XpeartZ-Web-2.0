"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function TrustBanner() {
  return (
    <div className="w-full border-t border-b border-[#2A2A2E] bg-[#0F0F11]/80 backdrop-blur-sm overflow-hidden py-8">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 md:divide-x md:divide-[#2A2A2E]">
          
          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left md:pr-4"
          >
            <h3 className="text-xl md:text-2xl font-heading font-medium text-[#8B8BFF] leading-snug">
              Looking to lead with the next wave of technology?
            </h3>
            <p className="text-[#A0A0A0] text-sm mt-2">
              Let&apos;s innovate together and set new standards in Web &amp; Mobile Development.
            </p>
          </motion.div>

          {/* Upwork section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex-1 flex flex-col items-center justify-center md:px-4"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[#34d399] font-bold text-2xl tracking-tighter">Upwork</span>
            </div>
            <div className="text-[#F7F7F7] text-sm font-medium">100% Job Success</div>
            <div className="text-[#34d399] text-xs font-bold mt-1.5 flex items-center gap-1 bg-[#34d399]/10 px-2 py-0.5 rounded">
              <span className="text-sm">👑</span> TOP RATED PLUS
            </div>
          </motion.div>

          {/* Google section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-1 flex flex-col items-center justify-center md:px-4"
          >
            <div className="text-[28px] font-bold tracking-tight mb-1 flex items-center gap-[1px]">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#4A4AFF] font-bold text-lg">5.0</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-[#FBBC05] fill-[#FBBC05]" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats sections */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex-1 flex flex-col justify-center items-center md:px-4"
          >
            <div className="text-[#4A4AFF] text-3xl font-heading font-bold mb-1">11+</div>
            <div className="text-[#A0A0A0] text-sm">In-House Experts</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex-1 flex flex-col justify-center items-center md:pl-4"
          >
            <div className="text-[#4A4AFF] text-3xl font-heading font-bold mb-1">100+</div>
            <div className="text-[#A0A0A0] text-sm">Projects Delivered</div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
