"use client";

import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const stats = [
  { value: "100+", label: "WEBSITES COMPLETED" },
  { value: "15+", label: "MARKETING BRANDS" },
  { value: "5+", label: "APPLICATIONS" },
  { value: "3+", label: "COUNTRIES SERVED" },
];

export default function StatsBlock() {
  return (
    <SectionReveal>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 w-full">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-[#1A1A1E] border border-[#2A2A2E] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center hover:bg-[#202025] hover:border-[#4A4AFF]/30 transition-all duration-300"
          >
            <h4 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#8B8BFF] mb-2">
              {stat.value}
            </h4>
            <p className="text-[10px] md:text-xs text-[#F7F7F7] uppercase tracking-widest font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionReveal>
  );
}
