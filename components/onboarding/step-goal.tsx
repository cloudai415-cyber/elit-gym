"use client"

import { Activity, Dumbbell, Flame, Target, type LucideIcon } from "lucide-react"
import { Tap } from "@/components/tap"
import { useT } from "@/lib/i18n"
import type { Goal, Level } from "@/lib/types"
import { cn } from "@/lib/utils"
import type { Draft, UpdateDraft } from "./draft"
import { OptionCard } from "./option-card"
import { FieldLabel, StepHeading } from "./step-heading"

const goals: { value: Goal; icon: LucideIcon }[] = [
  { value: "cut", icon: Flame },
  { value: "bulk", icon: Dumbbell },
  { value: "tone", icon: Target },
  { value: "endurance", icon: Activity },
]

const levels: { value: Level; range: string }[] = [
  { value: "l0_5", range: "0–5" },
  { value: "l6_15", range: "6–15" },
  { value: "l16_30", range: "16–30" },
  { value: "l30_plus", range: "30+" },
]

interface Props {
  draft: Draft
  update: UpdateDraft
}

export function StepGoal({ draft, update }: Props) {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-8">
      <StepHeading title={t("onb.s3.title")} subtitle={t("onb.s3.subtitle")} />

      <div role="radiogroup" aria-label={t("onb.s3.title")} className="flex flex-col gap-2.5">
        {goals.map(({ value, icon }) => (
          <OptionCard
            key={value}
            icon={icon}
            selected={draft.goal === value}
            onSelect={() => update({ goal: value })}
            title={t(`goal.${value}.title`)}
            description={t(`goal.${value}.desc`)}
          />
        ))}
      </div>

      <section className="flex flex-col gap-3">
        <FieldLabel id="level-label">{t("level.label")}</FieldLabel>
        <div role="radiogroup" aria-labelledby="level-label" className="grid grid-cols-2 gap-2.5">
          {levels.map(({ value, range }) => {
            const selected = draft.level === value
            return (
              <Tap
                key={value}
                role="radio"
                aria-checked={selected}
                onClick={() => update({ level: value })}
                className={cn(
                  "surface flex min-h-20 flex-col items-start justify-center gap-0.5 px-5 py-3 text-left transition-colors duration-200",
                  selected && "is-selected",
                )}
              >
                <span className={cn("text-2xl font-semibold tabular-nums", selected ? "text-gold-light" : "text-fg")}>
                  {range}
                </span>
                <span className="text-sm text-muted-fg">{t(`level.${value}.hint`)}</span>
              </Tap>
            )
          })}
        </div>
      </section>
    </div>
  )
}
