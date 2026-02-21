"use client";

/**
 * @author dorianbaffier
 * @description Feature grid with aurora ambient, magnetic 3D tilt, and focus-dim siblings.
 * @version 2.0.0
 * @date 2025-02-20
 * @license MIT
 * @website https://kokonutui.com
 * @github https://github.com/kokonut-labs/kokonutui
 */

import type { LucideIcon } from "lucide-react";
import { Cloud, Code, Cpu, Globe, Lock, Zap } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Constants ──────────────────────────────────────────────────────────────────

const TILT_MAX = 9;
const TILT_SPRING = { stiffness: 300, damping: 28 } as const;
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;

// ─── Data ────────────────────────────────────────────────────────────────────────

export interface SpotlightItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const DEFAULT_ITEMS: SpotlightItem[] = [
  {
    icon: <Zap size={18} strokeWidth={1.9} color="#f59e0b" />,
    title: "Instant",
    description:
      "Sub-100ms latency on every request, globally distributed across every region.",
    color: "#f59e0b",
  },
  {
    icon: <Lock size={18} strokeWidth={1.9} color="#60a5fa" />,
    title: "Secure",
    description:
      "Zero-trust by default. SOC 2 certified with end-to-end encryption throughout.",
    color: "#60a5fa",
  },
  {
    icon: <Globe size={18} strokeWidth={1.9} color="#34d399" />,
    title: "Global",
    description:
      "Edge-deployed to 300+ locations. Your users always hit a nearby server.",
    color: "#34d399",
  },
  {
    icon: <Code size={18} strokeWidth={1.9} color="#a78bfa" />,
    title: "Developer first",
    description:
      "Type-safe SDKs in five languages, a complete REST API, and honest docs.",
    color: "#a78bfa",
  },
  {
    icon: <Cpu size={18} strokeWidth={1.9} color="#38bdf8" />,
    title: "Scalable",
    description:
      "From side project to Series B without touching your infrastructure config.",
    color: "#38bdf8",
  },
  {
    icon: <Cloud size={18} strokeWidth={1.9} color="#f472b6" />,
    title: "Serverless",
    description:
      "No servers to provision, patch, or babysit. Just deploy and move on.",
    color: "#f472b6",
  },
];

// ─── Card ────────────────────────────────────────────────────────────────────────

interface CardProps {
  item: SpotlightItem;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function Card({ item, dimmed, onHoverStart, onHoverEnd }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);

  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);

  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);
  const glowOpacity = useSpring(0, GLOW_SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    glowOpacity.set(1);
    onHoverStart();
  };

  const handleMouseLeave = () => {
    normX.set(0.5);
    normY.set(0.5);
    glowOpacity.set(0);
    onHoverEnd();
  };

  return (
    <motion.div
      animate={{
        scale: dimmed ? 0.96 : 1,
        opacity: dimmed ? 0.5 : 1,
      }}
      className={cn(
        "group relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-6 h-full",
        // Dark premium style adaptation
        "border-[#2A2A2E] bg-[#1A1A1E] shadow-none",
        "transition-[border-color] duration-300",
        "hover:border-[#4A4AFF]/40"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {/* Static accent tint — always visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${item.color}14, transparent 65%)`,
        }}
      />

      {/* Hover glow layer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at 20% 20%, ${item.color}2e, transparent 65%)`,
        }}
      />

      {/* Shimmer sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
      />

      {/* Icon badge */}
      <div
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          background: `${item.color}18`,
          boxShadow: `inset 0 0 0 1px ${item.color}30`,
        }}
      >
        {item.icon}
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col gap-2 mt-auto">
        <h3 className="font-heading font-semibold text-[#F7F7F7] tracking-tight">
          {item.title}
        </h3>
        <p className="text-sm text-[#A0A0A0] leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Accent bottom line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
        style={{
          background: `linear-gradient(to right, ${item.color}80, transparent)`,
        }}
      />
    </motion.div>
  );
}

Card.displayName = "Card";

// ─── Main export ──────────────────────────────────────────────────────────────────

export interface SpotlightCardsProps {
  items?: SpotlightItem[];
  eyebrow?: string;
  heading?: string;
  className?: string;
}

export default function SpotlightCards({
  items = DEFAULT_ITEMS,
  eyebrow,
  heading,
  className,
}: SpotlightCardsProps) {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Header */}
      {(eyebrow || heading) && (
        <div className="relative mb-12 flex flex-col gap-4">
          {eyebrow && (
            <span className="text-[#4A4AFF] text-sm font-medium tracking-widest uppercase">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="font-heading text-4xl font-bold text-[#F7F7F7] tracking-tight">
              {heading}
            </h2>
          )}
        </div>
      )}

      {/* Card grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <div key={item.title} className="h-full">
            <Card
              dimmed={hoveredTitle !== null && hoveredTitle !== item.title}
              item={item}
              onHoverEnd={() => setHoveredTitle(null)}
              onHoverStart={() => setHoveredTitle(item.title)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
