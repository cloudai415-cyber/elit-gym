"use client"

import { useT } from "@/lib/i18n"
import type { Draft, UpdateDraft } from "./draft"
import { StepHeading } from "./step-heading"
import { Stepper } from "./stepper"

interface Props {
  draft: Draft
  update: UpdateDraft
}

export function StepBody({ draft, update }: Props) {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-8">
      <StepHeading title={t("onb.s2.title")} subtitle={t("onb.s2.subtitle")} />
      <div className="flex flex-col gap-3">
        <Stepper
          label={t("field.age")}
          unit={t("unit.years")}
          value={draft.age}
          min={12}
          max={90}
          onChange={(age) => update({ age })}
        />
        <Stepper
          label={t("field.weight")}
          unit={t("unit.kg")}
          value={draft.weight}
          min={30}
          max={250}
          onChange={(weight) => update({ weight })}
        />
        <Stepper
          label={t("field.height")}
          unit={t("unit.cm")}
          value={draft.height}
          min={120}
          max={230}
          onChange={(height) => update({ height })}
        />
      </div>
    </div>
  )
}
