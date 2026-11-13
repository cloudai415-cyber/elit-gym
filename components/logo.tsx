"use client"

import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

const sizes = {
  sm: { icon: 22, text: "text-[11px] tracking-[0.32em]" },
  md: { icon: 30, text: "text-sm tracking-[0.36em]" },
  lg: { icon: 56, text: "text-lg tracking-[0.42em]" },
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const { t } = useT()
  const s = sizes[size]

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0 text-gold"
      >
        <path
          d="M5 15 16 5.5 27 15M8 12.5V26.5H24V12.5M13.5 26.5V20H18.5V26.5"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {showText ? (
        <span className={cn("font-semibold text-fg", s.text)}>{t("brand.name")}</span>
      ) : (
        <span className="sr-only">{t("brand.name")}</span>
      )}
    </div>
  )
}
