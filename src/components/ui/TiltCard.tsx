"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export default function TiltCard({ children, className, color = "#4A4AFF" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);
  
  const TILT_MAX = 8;
  const TILT_SPRING = { stiffness: 300, damping: 28 };
  
  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);
  
  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);
  
  const glowOpacity = useSpring(0, { stiffness: 180, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => glowOpacity.set(1);
  const handleMouseLeave = () => {
    normX.set(0.5);
    normY.set(0.5);
    glowOpacity.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn(
        "group relative overflow-hidden transition-[border-color] duration-300 rounded-2xl",
        className
      )}
    >
      {/* Static accent tint (very subtle) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-50 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${color}10, transparent 65%)`,
        }}
      />

      {/* Hover glow layer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at 80% 80%, ${color}25, transparent 65%)`,
        }}
      />

      {/* Shimmer sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
      />

      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
