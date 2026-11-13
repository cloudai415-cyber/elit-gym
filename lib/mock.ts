import type { DayStatus, Quote, Stats, Workout } from "./types"

export const todayWorkout: Workout = {
  id: "w-upper-power",
  titleKey: "workout.upper.title",
  durationMin: 45,
  muscles: ["chest", "back", "shoulders", "arms"],
  exercises: [
    { id: "e1", nameKey: "exercise.pushups", sets: 4, reps: 12, muscles: ["chest", "arms"] },
    { id: "e2", nameKey: "exercise.pullups", sets: 4, reps: 8, muscles: ["back", "arms"] },
    { id: "e3", nameKey: "exercise.dbPress", sets: 3, reps: 10, muscles: ["shoulders"] },
    { id: "e4", nameKey: "exercise.rows", sets: 3, reps: 12, muscles: ["back"] },
    { id: "e5", nameKey: "exercise.dips", sets: 3, reps: 10, muscles: ["chest", "arms"] },
    { id: "e6", nameKey: "exercise.plank", sets: 3, reps: 45, muscles: ["core"] },
  ],
}

/** Holds one placeholder; extend to 30 entries and getQuoteOfDay rotates them by date. */
export const quotes: Quote[] = [{ id: "q1", textKey: "quote.q1.text", authorKey: "quote.q1.author" }]

export function getQuoteOfDay(date: Date = new Date(), list: Quote[] = quotes): Quote {
  const startOfYear = new Date(date.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86_400_000)
  return list[dayOfYear % list.length]
}

export const stats: Stats = {
  workoutsThisMonth: 12,
  totalMinutes: 540,
  streak: 5,
}

/** Placeholder history, Monday first. */
const weekHistory: Exclude<DayStatus, "today" | "upcoming">[] = ["done", "done", "rest", "done", "done", "rest", "done"]

export function getWeekStatus(date: Date = new Date()): DayStatus[] {
  const todayIndex = (date.getDay() + 6) % 7
  return weekHistory.map((status, i) => {
    if (i < todayIndex) return status
    if (i === todayIndex) return "today"
    return "upcoming"
  })
}
