"use client"

import { getQuoteOfDay, getWeekStatus, stats, todayWorkout } from "@/lib/mock"
import type { Profile } from "@/lib/types"
import { HomeHeader } from "./home-header"
import { QuoteCard } from "./quote-card"
import { StatsGrid } from "./stats-grid"
import { TodayWorkoutCard } from "./today-workout-card"
import { WeekStrip } from "./week-strip"

export function HomeScreen({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col gap-4">
      <HomeHeader name={profile.name} streak={stats.streak} />
      <div className="mt-2 flex flex-col gap-4">
        <TodayWorkoutCard workout={todayWorkout} />
        <QuoteCard quote={getQuoteOfDay()} />
        <WeekStrip days={getWeekStatus()} />
        <StatsGrid stats={stats} />
      </div>
    </div>
  )
}
