import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, Star } from 'lucide-react'

const bottomLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
]

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/xpeartz', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A2E] bg-[#0F0F11]">
      <div className="container-wide py-16 lg:py-20 flex flex-col items-center">
        
        {/* Top Blocks Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 w-full border-b border-[#2A2A2E] pb-12 mb-8">
          
          {/* Brand block */}
          <div className="space-y-6 lg:pr-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Xpeartz"
                width={150}
                height={44}
                className="object-contain block"
              />
            </Link>
            <p className="text-[#A0A0A0] text-sm leading-relaxed max-w-sm">
              Your One-Stop Solution for websites, impactful branding, and strategic digital solutions that help businesses grow faster, stand out stronger, and build lasting trust.
            </p>
          </div>

          {/* Need Help */}
          <div className="space-y-4">
             <h4 className="text-[#F7F7F7] font-semibold text-lg font-heading">Need Help?</h4>
             <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#CC44BB]/20 flex items-center justify-center shrink-0 border border-[#CC44BB]/30">
                   <Phone size={18} className="text-[#CC44BB]" />
                </div>
                <div className="flex flex-col gap-1 mt-1">
                   <a href="tel:+919876543210" className="text-[#A0A0A0] text-sm hover:text-[#CC44BB] transition-colors">
                     +91 98765 43210
                   </a>
                   <a href="mailto:info@xpeartz.com" className="text-[#A0A0A0] text-sm hover:text-[#CC44BB] transition-colors flex items-center gap-1.5 mt-1">
                     <Mail size={14} /> info@xpeartz.com
                   </a>
                </div>
             </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
             <h4 className="text-[#F7F7F7] font-semibold text-lg font-heading">Location</h4>
             <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4A4AFF]/20 flex items-center justify-center shrink-0 border border-[#4A4AFF]/30">
                   <MapPin size={18} className="text-[#4A4AFF]" />
                </div>
                <p className="text-[#A0A0A0] text-sm max-w-[200px] leading-relaxed mt-1">
                   C-10, 2nd Floor, New Bus Port, Palanpur, Gujarat 385001
                </p>
             </div>
          </div>

          {/* Industry Recognitions */}
          <div className="space-y-4">
             <h4 className="text-[#F7F7F7] font-semibold text-lg font-heading">Industry Recognitions</h4>
             <div className="flex items-center gap-[1px] text-3xl font-bold tracking-tighter mb-4 mt-2">
               <span className="text-[#4285F4]">G</span>
               <span className="text-[#EA4335]">o</span>
               <span className="text-[#FBBC05]">o</span>
               <span className="text-[#4285F4]">g</span>
               <span className="text-[#34A853]">l</span>
               <span className="text-[#EA4335]">e</span>
             </div>
             <p className="text-[#F7F7F7] font-medium text-base mb-2">Reviews</p>
             <div className="flex flex-col sm:flex-row sm:items-center gap-2">
               <span className="text-[#A0A0A0] text-sm font-medium">4.9/5</span>
               <div className="flex">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} size={14} className="text-[#FBBC05] fill-[#FBBC05]" />
                 ))}
               </div>
             </div>
          </div>

        </div>

        {/* Links & Socials Row */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-12 px-2">
           <ul className="flex flex-wrap items-center justify-center md:justify-start gap-6 font-medium text-sm">
             {bottomLinks.map(link => (
                <li key={link.label}>
                   <Link href={link.href} className="text-[#A0A0A0] hover:text-[#F7F7F7] transition-colors">
                      {link.label}
                   </Link>
                </li>
             ))}
           </ul>

           <div className="flex items-center gap-4">
             <span className="text-[#F7F7F7] font-medium text-sm">Follow Us:</span>
             <div className="flex gap-2">
               {socials.map(({ icon: Icon, href, label }) => (
                 <a
                   key={label}
                   href={href}
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label={label}
                   className="w-10 h-10 rounded-md border border-[#2A2A2E] flex items-center justify-center text-[#A0A0A0] hover:text-[#F7F7F7] hover:border-[#4A4AFF] hover:bg-[#4A4AFF]/10 transition-all duration-200"
                 >
                   <Icon size={18} />
                 </a>
               ))}
             </div>
           </div>
        </div>

        {/* Copyright Pill */}
        <div className="px-8 py-3 bg-[#4A4AFF]/10 border border-[#4A4AFF]/20 rounded-full text-center inline-block">
          <p className="text-[#8B8BFF] text-sm font-medium">
             © {new Date().getFullYear()} XPEARTZ. || All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
