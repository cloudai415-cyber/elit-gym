"use client"

import { Check } from "lucide-react"
import { useT } from "@/lib/i18n"
import type { DayStatus } from "@/lib/types"
import { cn } from "@/lib/utils"
import { WEEKDAYS } from "@/lib/weekdays"

function DayMark({ status }: { status: DayStatus }) {
  switch (status) {
    case "done":
      return (
        <span className="flex size-9 items-center justify-center rounded-full bg-gold/[0.12] text-gold">
          <Check className="size-4" strokeWidth={2.25} aria-hidden="true" />
        </span>
      )
    case "today":
      return <span className="size-9 rounded-full border-[1.5px] border-gold" />
    case "rest":
      return (
        <span className="flex size-9 items-center justify-center">
          <span className="h-0.5 w-3 rounded-full bg-white/20" />
        </span>
      )
    default:
      return <span className="size-9 rounded-full border border-white/[0.06]" />
  }
}

export function WeekStrip({ days }: { days: DayStatus[] }) {
  const { t } = useT()

  return (
    <section aria-labelledby="week-label" className="surface flex flex-col gap-4 p-5">
      <h2 id="week-label" className="text-xs font-medium uppercase tracking-[0.18em] text-muted-fg">
        {t("home.week.label")}
      </h2>
      <ol className="grid grid-cols-7 gap-1">
        {days.map((status, i) => (
          <li key={WEEKDAYS[i]} className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "text-[11px] font-medium uppercase",
                status === "today" ? "text-gold-light" : "text-muted-fg",
              )}
            >
              {t(`weekday.${WEEKDAYS[i]}`)}
            </span>
            <DayMark status={status} />
            <span className="sr-only">{t(`day.${status}`)}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
