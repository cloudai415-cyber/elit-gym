export type Lang = "en" | "ru" | "uz"

export type Gender = "male" | "female"

export type Goal = "cut" | "bulk" | "tone" | "endurance"

export type Level = "l0_5" | "l6_15" | "l16_30" | "l30_plus"

export type Equipment = "gym" | "dumbbells" | "bodyweight" | "pullup" | "dips"

export type DaysPerWeek = 3 | 4 | 5

export type Muscle = "chest" | "back" | "shoulders" | "arms" | "core" | "legs"

export interface Profile {
  name: string
  gender: Gender
  age: number
  weight: number
  height: number
  goal: Goal
  level: Level
  equipment: Equipment[]
  daysPerWeek: DaysPerWeek
  language: Lang
  createdAt: string
}

/** Text fields hold i18n keys so placeholder content stays translatable. */
export interface Exercise {
  id: string
  nameKey: string
  sets: number
  reps: number
  muscles: Muscle[]
}

export interface Workout {
  id: string
  titleKey: string
  durationMin: number
  muscles: Muscle[]
  exercises: Exercise[]
}

export interface Quote {
  id: string
  textKey: string
  authorKey: string
}

export type DayStatus = "done" | "today" | "rest" | "upcoming"

export interface Stats {
  workoutsThisMonth: number
  totalMinutes: number
  streak: number
}
