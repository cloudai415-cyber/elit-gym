"use client"

import { Clock, ListChecks, Play } from "lucide-react"
import { PrimaryButton } from "@/components/tap"
import { useT } from "@/lib/i18n"
import type { Workout } from "@/lib/types"

export function TodayWorkoutCard({ workout, onStart }: { workout: Workout; onStart?: () => void }) {
  const { t } = useT()

  return (
    <section aria-labelledby="today-title" className="glass glass-blur flex flex-col gap-5 p-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-fg">{t("home.today.label")}</span>
        <h2 id="today-title" className="text-2xl font-semibold tracking-tight text-fg text-balance">
          {t(workout.titleKey)}
        </h2>
      </div>

      <dl className="flex items-center gap-5 text-sm text-muted-fg">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">{t("stats.time")}</dt>
          <Clock className="size-4" strokeWidth={1.5} aria-hidden="true" />
          <dd className="tabular-nums text-fg">{t("home.today.minutes", { n: workout.durationMin })}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">{t("nav.workouts")}</dt>
          <ListChecks className="size-4" strokeWidth={1.5} aria-hidden="true" />
          <dd className="tabular-nums text-fg">{t("home.today.exercises", { n: workout.exercises.length })}</dd>
        </div>
      </dl>

      <ul className="flex flex-wrap gap-2">
        {workout.muscles.map((m) => (
          <li
            key={m}
            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted-fg"
          >
            {t(`muscle.${m}`)}
          </li>
        ))}
      </ul>

      <PrimaryButton onClick={onStart}>
        <Play className="size-4 fill-current" strokeWidth={1.75} aria-hidden="true" />
        {t("home.start")}
      </PrimaryButton>
    </section>
  )
}
