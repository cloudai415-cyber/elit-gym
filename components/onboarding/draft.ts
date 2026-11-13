import type { DaysPerWeek, Equipment, Gender, Goal, Level } from "@/lib/types"

export interface Draft {
  name: string
  gender: Gender | null
  age: number
  weight: number
  height: number
  goal: Goal | null
  level: Level | null
  equipment: Equipment[]
  daysPerWeek: DaysPerWeek | null
}

export const initialDraft: Draft = {
  name: "",
  gender: null,
  age: 25,
  weight: 70,
  height: 175,
  goal: null,
  level: null,
  equipment: [],
  daysPerWeek: null,
}

export type UpdateDraft = (patch: Partial<Draft>) => void

export const TOTAL_STEPS = 5

export function isStepValid(step: number, draft: Draft): boolean {
  switch (step) {
    case 0:
      return draft.name.trim().length >= 2 && draft.gender !== null
    case 1:
      return draft.age > 0 && draft.weight > 0 && draft.height > 0
    case 2:
      return draft.goal !== null && draft.level !== null
    case 3:
      return draft.equipment.length > 0
    case 4:
      return draft.daysPerWeek !== null
    default:
      return false
  }
}

export function toggleEquipment(current: Equipment[], item: Equipment): Equipment[] {
  if (current.includes(item)) return current.filter((e) => e !== item)
  if (item === "bodyweight") return ["bodyweight"]
  return [...current.filter((e) => e !== "bodyweight"), item]
}
