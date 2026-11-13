"use client"

import { Check, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Tap } from "@/components/tap"
import { cn } from "@/lib/utils"

interface OptionCardProps {
  selected: boolean
  onSelect: () => void
  title: string
  description?: string
  icon?: LucideIcon
  trailing?: ReactNode
  multi?: boolean
  layout?: "row" | "tile"
  className?: string
  children?: ReactNode
}

export function OptionCard({
  selected,
  onSelect,
  title,
  description,
  icon: Icon,
  trailing,
  multi = false,
  layout = "row",
  className,
  children,
}: OptionCardProps) {
  const isTile = layout === "tile"

  return (
    <Tap
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "surface w-full text-left transition-colors duration-200",
        selected && "is-selected",
        isTile ? "flex min-h-32 flex-col items-start justify-between gap-4 p-5" : "flex min-h-16 items-center gap-4 px-5 py-4",
        className,
      )}
    >
      {Icon ? (
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-2xl border transition-colors duration-200",
            selected ? "border-gold/40 text-gold" : "border-white/[0.08] text-muted-fg",
          )}
        >
          <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
      ) : null}

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-base font-semibold text-fg text-pretty">{title}</span>
        {description ? <span className="text-sm leading-snug text-muted-fg text-pretty">{description}</span> : null}
        {children}
      </span>

      {trailing ??
        (!isTile ? (
          <span
            aria-hidden="true"
            className={cn(
              "flex size-6 shrink-0 items-center justify-center border transition-colors duration-200",
              multi ? "rounded-lg" : "rounded-full",
              selected ? "border-gold bg-gold text-ink" : "border-white/15",
            )}
          >
            {selected ? <Check className="size-3.5" strokeWidth={2.5} /> : null}
          </span>
        ) : null)}
    </Tap>
  )
}
