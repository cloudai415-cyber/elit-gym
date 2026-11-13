"use client"

import { useT } from "@/lib/i18n"
import type { Stats } from "@/lib/types"

export function StatsGrid({ stats }: { stats: Stats }) {
  const { t } = useT()
  const hours = (stats.totalMinutes / 60).toFixed(stats.totalMinutes % 60 === 0 ? 0 : 1)

  const items = [
    { label: t("stats.workouts"), value: String(stats.workoutsThisMonth), unit: "" },
    { label: t("stats.time"), value: hours, unit: t("unit.h") },
    { label: t("stats.streak"), value: String(stats.streak), unit: "" },
  ]

  return (
    <dl className="grid grid-cols-3 gap-2.5">
      {items.map((item) => (
        <div key={item.label} className="surface flex flex-col justify-between gap-3 rounded-[20px] p-4">
          <dt className="text-[11px] leading-snug text-muted-fg text-pretty">{item.label}</dt>
          <dd className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold tabular-nums tracking-tight text-gold-light">{item.value}</span>
            {item.unit ? <span className="text-xs text-muted-fg">{item.unit}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}
