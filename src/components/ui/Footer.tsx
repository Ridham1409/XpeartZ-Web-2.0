import Link from 'next/link'
import Image from 'next/image'
import { Twitter, Linkedin, Dribbble, Instagram, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Our Designs', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Insights', href: '/blog' },
  ],
  Services: [
    { label: 'Web Design', href: '/services#web' },
    { label: 'Brand Identity', href: '/services#brand' },
    { label: 'Mobile UI', href: '/services#mobile' },
    { label: 'Design Systems', href: '/services#systems' },
  ],
  Connect: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Start a Project', href: '/contact' },
  ],
}

const socials = [
  { icon: Twitter, href: 'https://twitter.com/xpeartz', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/xpeartz', label: 'LinkedIn' },
  { icon: Dribbble, href: 'https://dribbble.com/xpeartz', label: 'Dribbble' },
  { icon: Instagram, href: 'https://instagram.com/xpeartz', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A2E] bg-[#0F0F11]">
      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Xpeartz"
                width={130}
                height={38}
                className="object-contain block"
              />
            </Link>
            <p className="text-[#A0A0A0] text-sm leading-relaxed max-w-xs">
              Premium digital solutions — crafting award-worthy websites, user interfaces, and brand experiences for ambitious businesses.
            </p>
            <a
              href="mailto:ridhambhavnagariya@gmail.com"
              className="text-[#4A4AFF] text-sm font-medium hover:text-[#6B6BFF] transition-colors"
            >
              ridhambhavnagariya@gmail.com
            </a>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-[#2A2A2E] flex items-center justify-center text-[#A0A0A0] hover:text-[#F7F7F7] hover:border-[#4A4AFF] hover:bg-[#4A4AFF]/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="space-y-4">
              <h4 className="text-[#F7F7F7] text-sm font-heading font-semibold">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#A0A0A0] text-sm hover:text-[#F7F7F7] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider & bottom row */}
        <div className="mt-14 pt-8 border-t border-[#2A2A2E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A0A0A0] text-xs">
            © {new Date().getFullYear()} Xpeartz. All rights reserved.
          </p>
          <a
            href="mailto:ridhambhavnagariya@gmail.com"
            className="flex items-center gap-1.5 text-[#A0A0A0] text-xs hover:text-[#4A4AFF] transition-colors group"
          >
            ridhambhavnagariya@gmail.com
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  )
}
