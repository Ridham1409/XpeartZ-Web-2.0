"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, ShoppingCart, Zap, ShieldCheck, CreditCard, Star } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import LeadGenModal from "@/components/ui/LeadGenModal";
import SpotlightCards from "@/components/ui/SpotlightCards";

const benefits = [
  "Custom Next.js & Shopify Integration",
  "High-converting product pages",
  "Mobile commerce optimized",
  "Lightning fast checkout flows",
  "Secure payment gateway setup",
  "Inventory management guidance"
];

const features = [
  {
    icon: <ShoppingCart size={18} strokeWidth={1.9} color="#CC44BB" />,
    title: "Storefront Design",
    description: "Visually stunning ecommerce layouts built to sell your products.",
    color: "#CC44BB",
  },
  {
    icon: <Zap size={18} strokeWidth={1.9} color="#f59e0b" />,
    title: "Speed Optimized",
    description: "Sub-second page loads to reduce bounce rates and abandoned carts.",
    color: "#f59e0b",
  },
  {
    icon: <CreditCard size={18} strokeWidth={1.9} color="#34d399" />,
    title: "Seamless Checkout",
    description: "Frictionless payment processes to maximize your conversion rate.",
    color: "#34d399",
  },
  {
    icon: <ShieldCheck size={18} strokeWidth={1.9} color="#4A4AFF" />,
    title: "Secure Platform",
    description: "Enterprise-grade security so you and your customers have peace of mind.",
    color: "#4A4AFF",
  },
];

export default function EcommerceSetupPage() {
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_10%,rgba(204,68,187,0.08)_0%,transparent_80%)] pointer-events-none" />
        
        <div className="container-wide relative z-10 w-full mt-10">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div className="flex-1">
              <span className="text-[#CC44BB] text-sm font-medium tracking-widest uppercase mb-4 block">
                Ecommerce Solutions
              </span>
              <h1 className="font-heading text-5xl sm:text-6xl font-bold text-[#F7F7F7] leading-[1.1] tracking-tight mb-6">
                Ecommerce Website Development <span className="text-gradient-gold">Services</span>
              </h1>
              <p className="text-[#A0A0A0] text-lg leading-relaxed mb-8 max-w-lg">
                Turn visitors into buyers. We build high-performance online stores and setup Etsy platforms that are designed for maximum conversions and scalability.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#CC44BB] text-white font-medium rounded-xl hover:bg-[#B33BAA] hover:shadow-[0_0_30px_rgba(204,68,187,0.4)] transition-all duration-300 relative z-50"
                >
                  Start Your Store
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2 mt-2 sm:mt-0 text-[#A0A0A0] text-sm">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-[#EFCB68] fill-[#EFCB68]" />
                    ))}
                  </div>
                  <span>$1M+ in client revenue generated</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-lg relative">
               <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#2A2A2E] bg-[#1A1A1E] shadow-[0_0_50px_rgba(204,68,187,0.1)] relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A1E] via-[#2A2A2E] to-[#1A1A1E] opacity-50"></div>
                  <div className="absolute top-4 left-4 right-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="absolute inset-x-8 top-12 bottom-0 bg-[#0F0F11] border-t border-l border-r border-[#3A3A3E] rounded-t-xl overflow-hidden flex flex-col p-6">
                      <div className="flex justify-between items-center mb-6">
                         <h2 className="text-[#F7F7F7] font-heading font-bold text-xl">Store Overview</h2>
                         <ShoppingCart size={20} className="text-[#CC44BB]" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="h-20 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E] flex flex-col justify-center px-4">
                           <span className="text-[#A0A0A0] text-xs">Total Sales</span>
                           <span className="text-[#34d399] font-bold text-lg">+$14,290</span>
                        </div>
                        <div className="h-20 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E] flex flex-col justify-center px-4">
                           <span className="text-[#A0A0A0] text-xs">Conversion Rate</span>
                           <span className="text-[#4A4AFF] font-bold text-lg">4.8%</span>
                        </div>
                      </div>
                      <div className="w-full flex-1 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E] animate-pulse"></div>
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
                <span className="text-[#EFCB68] text-sm font-medium tracking-widest uppercase mb-3 block">
                  Built to Sell
                </span>
                <h2 className="font-heading text-4xl font-bold text-[#F7F7F7] tracking-tight mb-6">
                  Ecommerce Systems That Scale
                </h2>
                <p className="text-[#A0A0A0] mb-8 leading-relaxed">
                  Selling online is highly competitive. Having a beautiful store is not enough; it needs to be incredibly fast, friction-free, and optimized for conversions across all devices. We engineer stores that eliminate barriers to purchase.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-center gap-3">
                      <CheckCircle2 className="text-[#EFCB68] shrink-0" size={18} />
                      <span className="text-[#F7F7F7] text-sm">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-5/12">
                 <div className="p-8 rounded-2xl bg-[#1A1A1E] border border-[#2A2A2E]">
                    <h3 className="text-xl font-bold text-[#F7F7F7] mb-4">Platform Expertise</h3>
                    <p className="text-[#A0A0A0] text-sm leading-relaxed mb-6">
                      Whether you need a fully custom headless Shopify build for maximum control, or a beautifully branded Etsy store setup to kickstart your craft business, we have the specialized expertise to launch it right.
                    </p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-[#F7F7F7] rounded-xl transition-all font-medium text-sm"
                    >
                      Discuss Your Store Needs
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
            heading="Everything you need to sell online"
            eyebrow="Core Features"
            items={features}
            className="!px-0 !bg-transparent"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-20 border-t border-[#2A2A2E] bg-gradient-to-b from-transparent to-[#CC44BB]/5">
        <div className="container-wide text-center">
          <SectionReveal>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#F7F7F7] tracking-tight mb-6 max-w-2xl mx-auto">
              Ready to Launch Your Online Store?
            </h2>
            <p className="text-[#A0A0A0] text-lg mb-10 max-w-xl mx-auto">
              Partner with ecommerce experts who understand that your website's primary job is to generate revenue.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#CC44BB] text-white font-medium rounded-xl hover:bg-[#B33BAA] shadow-[0_0_30px_rgba(204,68,187,0.3)] transition-all duration-300 text-base"
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
