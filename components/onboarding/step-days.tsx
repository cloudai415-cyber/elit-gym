"use client"

import { Tap } from "@/components/tap"
import { useT } from "@/lib/i18n"
import type { DaysPerWeek } from "@/lib/types"
import { cn } from "@/lib/utils"
import { WEEKDAYS } from "@/lib/weekdays"
import type { Draft, UpdateDraft } from "./draft"
import { StepHeading } from "./step-heading"

/** Monday-first training-day patterns for each frequency. */
const schedules: Record<DaysPerWeek, boolean[]> = {
  3: [true, false, true, false, true, false, false],
  4: [true, true, false, true, true, false, false],
  5: [true, true, true, false, true, true, false],
}

const options: DaysPerWeek[] = [3, 4, 5]

interface Props {
  draft: Draft
  update: UpdateDraft
}

export function StepDays({ draft, update }: Props) {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-8">
      <StepHeading title={t("onb.s5.title")} subtitle={t("onb.s5.subtitle")} />
      <div role="radiogroup" aria-label={t("onb.s5.title")} className="flex flex-col gap-3">
        {options.map((n) => {
          const selected = draft.daysPerWeek === n
          return (
            <Tap
              key={n}
              role="radio"
              aria-checked={selected}
              onClick={() => update({ daysPerWeek: n })}
              className={cn(
                "surface flex w-full flex-col gap-5 p-5 text-left transition-colors duration-200",
                selected && "is-selected",
              )}
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className={cn("text-2xl font-semibold tabular-nums", selected ? "text-gold-light" : "text-fg")}>
                  {t(`days.option.${n}`)}
                </span>
                <span className="text-sm text-muted-fg">{t(`days.hint.${n}`)}</span>
              </span>
              <span className="grid grid-cols-7 gap-1.5" aria-hidden="true">
                {schedules[n].map((active, i) => (
                  <span key={WEEKDAYS[i]} className="flex flex-col items-center gap-2">
                    <span
                      className={cn(
                        "size-2 rounded-full transition-colors duration-200",
                        active ? (selected ? "bg-gold" : "bg-gold/60") : "bg-white/10",
                      )}
                    />
                    <span className="text-[10px] font-medium uppercase text-muted-fg">
                      {t(`weekday.${WEEKDAYS[i]}`)}
                    </span>
                  </span>
                ))}
              </span>
            </Tap>
          )
        })}
      </div>
    </div>
  )
}
