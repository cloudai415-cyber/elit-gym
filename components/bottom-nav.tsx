"use client"

import { motion } from "framer-motion"
import { CalendarDays, Dumbbell, Home, Trophy, UserRound, type LucideIcon } from "lucide-react"
import { Tap } from "@/components/tap"
import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export type Tab = "home" | "workouts" | "calendar" | "rewards" | "profile"

const tabs: { id: Tab; icon: LucideIcon }[] = [
  { id: "home", icon: Home },
  { id: "workouts", icon: Dumbbell },
  { id: "calendar", icon: CalendarDays },
  { id: "rewards", icon: Trophy },
  { id: "profile", icon: UserRound },
]

export function BottomNav({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  const { t } = useT()

  return (
    <nav
      aria-label={t("nav.label")}
      className="pb-safe fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md px-3"
    >
      <ul className="glass glass-blur flex items-stretch justify-between px-1.5 py-1.5">
        {tabs.map(({ id, icon: Icon }) => {
          const isActive = id === active
          return (
            <li key={id} className="flex-1">
              <Tap
                onClick={() => onChange(id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex min-h-14 w-full flex-col items-center justify-center gap-1 rounded-2xl transition-colors duration-200",
                  isActive ? "text-gold" : "text-muted-fg",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute top-0 h-0.5 w-6 rounded-full bg-gold"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                ) : null}
                <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-[10px] font-medium">{t(`nav.${id}`)}</span>
              </Tap>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
