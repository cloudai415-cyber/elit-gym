"use client"

import { Flame } from "lucide-react"
import { Logo } from "@/components/logo"
import { useT } from "@/lib/i18n"

function greetingKey(hour: number) {
  if (hour < 12) return "home.greeting.morning"
  if (hour < 18) return "home.greeting.afternoon"
  return "home.greeting.evening"
}

export function HomeHeader({ name, streak }: { name: string; streak: number }) {
  const { t } = useT()

  return (
    <header className="flex flex-col gap-5">
      <div className="flex h-12 items-center justify-between">
        <Logo size="sm" />
        <div
          className="flex h-9 items-center gap-1.5 rounded-full border border-gold/25 bg-gold/[0.06] px-3"
          aria-label={t("home.streak.aria", { n: streak })}
        >
          <Flame className="size-4 text-gold" strokeWidth={1.75} aria-hidden="true" />
          <span className="text-sm font-semibold tabular-nums text-gold-light" aria-hidden="true">
            {streak}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-fg text-balance">
          {t(greetingKey(new Date().getHours()), { name })}
        </h1>
        <p className="text-sm text-muted-fg">{t("home.subtitle")}</p>
      </div>
    </header>
  )
}
