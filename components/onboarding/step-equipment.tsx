"use client"

import { ArrowUpFromLine, Columns2, Dumbbell, PersonStanding, Warehouse, type LucideIcon } from "lucide-react"
import { useT } from "@/lib/i18n"
import type { Equipment } from "@/lib/types"
import { toggleEquipment, type Draft, type UpdateDraft } from "./draft"
import { OptionCard } from "./option-card"
import { StepHeading } from "./step-heading"

const options: { value: Equipment; icon: LucideIcon }[] = [
  { value: "gym", icon: Warehouse },
  { value: "dumbbells", icon: Dumbbell },
  { value: "bodyweight", icon: PersonStanding },
  { value: "pullup", icon: ArrowUpFromLine },
  { value: "dips", icon: Columns2 },
]

interface Props {
  draft: Draft
  update: UpdateDraft
}

export function StepEquipment({ draft, update }: Props) {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-8">
      <StepHeading title={t("onb.s4.title")} subtitle={t("onb.s4.subtitle")} />
      <div role="group" aria-label={t("onb.s4.title")} className="flex flex-col gap-2.5">
        {options.map(({ value, icon }) => (
          <OptionCard
            key={value}
            multi
            icon={icon}
            selected={draft.equipment.includes(value)}
            onSelect={() => update({ equipment: toggleEquipment(draft.equipment, value) })}
            title={t(`equip.${value}`)}
          />
        ))}
      </div>
    </div>
  )
}
