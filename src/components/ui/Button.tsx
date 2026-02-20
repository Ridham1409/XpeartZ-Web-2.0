import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  icon?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer'

const variants = {
  primary: 'bg-[#4A4AFF] text-white hover:bg-[#3B3BDD] hover:shadow-[0_0_24px_rgba(74,74,255,0.4)] active:scale-[0.98]',
  secondary: 'border border-[#2A2A2E] text-[#F7F7F7] hover:border-[#4A4AFF]/60 hover:bg-[#4A4AFF]/8 active:scale-[0.98]',
  ghost: 'text-[#A0A0A0] hover:text-[#F7F7F7] hover:bg-[#1A1A1E] active:scale-[0.98]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  className,
  icon = false,
  disabled,
  type = 'button',
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {icon && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
      {icon && <ArrowRight size={16} />}
    </button>
  )
}
