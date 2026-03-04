"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Monitor, Code2, Zap, Rocket, Star } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import LeadGenModal from "@/components/ui/LeadGenModal";
import SpotlightCards from "@/components/ui/SpotlightCards";

const benefits = [
  "Custom Next.js Development",
  "Lightning fast load speeds",
  "Mobile-first, responsive design",
  "Technical SEO optimization built-in",
  "Conversion-focused user journeys",
  "Easy-to-manage Content System"
];

const features = [
  {
    icon: <Monitor size={18} strokeWidth={1.9} color="#4A4AFF" />,
    title: "Beautiful Design",
    description: "Websites that look modern, trustworthy, and premium out of the box.",
    color: "#4A4AFF",
  },
  {
    icon: <Code2 size={18} strokeWidth={1.9} color="#34d399" />,
    title: "Clean Code",
    description: "Built on robust frameworks ensuring maintenance is a breeze.",
    color: "#34d399",
  },
  {
    icon: <Zap size={18} strokeWidth={1.9} color="#f59e0b" />,
    title: "Fast Performance",
    description: "High Core Web Vitals scores leading to better Google rankings.",
    color: "#f59e0b",
  },
  {
    icon: <Rocket size={18} strokeWidth={1.9} color="#ec4899" />,
    title: "Growth Ready",
    description: "Scalable architecture allowing you to add features as your business grows.",
    color: "#ec4899",
  },
];

export default function SmallBusinessWebsitesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-36 pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_10%,rgba(74,74,255,0.08)_0%,transparent_80%)] pointer-events-none" />
        
        <div className="container-wide relative z-10 w-full mt-10">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div className="flex-1">
              <span className="text-[#4A4AFF] text-sm font-medium tracking-widest uppercase mb-4 block">
                Professional Services
              </span>
              <h1 className="font-heading text-5xl sm:text-6xl font-bold text-[#F7F7F7] leading-[1.1] tracking-tight mb-6">
                Website Developer for <span className="text-gradient-blue">Small Businesses</span>
              </h1>
              <p className="text-[#A0A0A0] text-lg leading-relaxed mb-8 max-w-lg">
                Stop losing customers to outdated design. We build SEO-optimized, fast-loading, and mobile-friendly websites that actively generate leads and increase sales for your small business.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#4A4AFF] text-white font-medium rounded-xl hover:bg-[#3B3BDD] hover:shadow-[0_0_30px_rgba(74,74,255,0.4)] transition-all duration-300 relative z-50"
                >
                  Start Your Project
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2 mt-2 sm:mt-0 text-[#A0A0A0] text-sm">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-[#EFCB68] fill-[#EFCB68]" />
                    ))}
                  </div>
                  <span>Trusted by 50+ businesses</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-lg relative">
               <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#2A2A2E] bg-[#1A1A1E] shadow-[0_0_50px_rgba(74,74,255,0.1)] relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A1E] via-[#2A2A2E] to-[#1A1A1E] opacity-50"></div>
                  <div className="absolute top-4 left-4 right-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="absolute inset-x-8 top-12 bottom-0 bg-[#0F0F11] border-t border-l border-r border-[#3A3A3E] rounded-t-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                      <h2 className="text-[#F7F7F7] font-heading font-bold text-2xl mb-2">Drive More Leads</h2>
                      <p className="text-[#A0A0A0] text-sm mb-6">High-converting websites tailored for your specific industry.</p>
                      <div className="w-full h-24 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E] animate-pulse"></div>
                  </div>
               </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Why Us / Benefits */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SectionReveal>
            <div className="flex flex-col md:flex-row gap-12 justify-between">
              <div className="md:w-1/2">
                <span className="text-[#34d399] text-sm font-medium tracking-widest uppercase mb-3 block">
                  The Xpeartz Advantage
                </span>
                <h2 className="font-heading text-4xl font-bold text-[#F7F7F7] tracking-tight mb-6">
                  Why A Professional Website Matters
                </h2>
                <p className="text-[#A0A0A0] mb-8 leading-relaxed">
                  Your website is your 24/7 salesperson. If it is slow, confusing, or doesn't rank on Google, you are losing money to your competitors every single day. We build digital assets that pay for themselves.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-center gap-3">
                      <CheckCircle2 className="text-[#34d399] shrink-0" size={18} />
                      <span className="text-[#F7F7F7] text-sm">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-5/12">
                 <div className="p-8 rounded-2xl bg-[#1A1A1E] border border-[#2A2A2E]">
                    <h3 className="text-xl font-bold text-[#F7F7F7] mb-4">Our Guarantee</h3>
                    <p className="text-[#A0A0A0] text-sm leading-relaxed mb-6">
                      We don't just hand over a pretty design. We deliver a fully functional, SEO-optimized business tool designed to capture leads and drive growth. 
                    </p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-[#F7F7F7] rounded-xl transition-all font-medium text-sm"
                    >
                      Book a Free Consultation
                    </button>
                 </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Features Spotlight */}
      <section className="section-padding border-t border-[#2A2A2E]">
        <div className="container-wide">
          <SpotlightCards
            heading="Everything you need to succeed online"
            eyebrow="Core Features"
            items={features}
            className="!px-0 !bg-transparent"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-20 border-t border-[#2A2A2E] bg-gradient-to-b from-transparent to-[#4A4AFF]/5">
        <div className="container-wide text-center">
          <SectionReveal>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#F7F7F7] tracking-tight mb-6 max-w-2xl mx-auto">
              Ready to Upgrade Your Digital Presence?
            </h2>
            <p className="text-[#A0A0A0] text-lg mb-10 max-w-xl mx-auto">
              Get an agency-quality website without the typical agency bureaucracy. Fill out the form below to get started.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#4A4AFF] text-white font-medium rounded-xl hover:bg-[#3B3BDD] shadow-[0_0_30px_rgba(74,74,255,0.3)] transition-all duration-300 text-base"
            >
              Start Your Project Today
              <ArrowRight size={18} />
            </button>
          </SectionReveal>
        </div>
      </section>

      <LeadGenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
