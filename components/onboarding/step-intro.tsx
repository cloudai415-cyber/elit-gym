"use client"

import { Mars, Venus } from "lucide-react"
import { LANGS, useT } from "@/lib/i18n"
import { setLang } from "@/lib/store"
import type { Gender } from "@/lib/types"
import type { Draft, UpdateDraft } from "./draft"
import { OptionCard } from "./option-card"
import { FieldLabel, StepHeading } from "./step-heading"

const genders: { value: Gender; icon: typeof Mars }[] = [
  { value: "male", icon: Mars },
  { value: "female", icon: Venus },
]

interface Props {
  draft: Draft
  update: UpdateDraft
  onSubmit: () => void
}

export function StepIntro({ draft, update, onSubmit }: Props) {
  const { t, lang } = useT()

  return (
    <div className="flex flex-col gap-8">
      <StepHeading title={t("onb.s1.title")} subtitle={t("onb.s1.subtitle")} />

      <section className="flex flex-col gap-3">
        <FieldLabel id="lang-label">{t("onb.lang.label")}</FieldLabel>
        <div role="radiogroup" aria-labelledby="lang-label" className="flex flex-col gap-2.5">
          {LANGS.map((code) => (
            <OptionCard
              key={code}
              selected={lang === code}
              onSelect={() => setLang(code)}
              title={t(`lang.${code}`)}
              trailing={
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-fg">{code}</span>
              }
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <label htmlFor="name" className="text-xs font-medium uppercase tracking-[0.18em] text-muted-fg">
          {t("onb.name.label")}
        </label>
        <input
          id="name"
          value={draft.name}
          onChange={(e) => update({ name: e.target.value })}
          onKeyDown={(e) => {
            if (e.key !== "Enter" || e.nativeEvent.isComposing || e.keyCode === 229) return
            e.preventDefault()
            onSubmit()
          }}
          placeholder={t("onb.name.placeholder")}
          autoComplete="given-name"
          enterKeyHint="next"
          maxLength={32}
          className="surface h-14 w-full px-5 text-base text-fg placeholder:text-muted-fg/70 focus:border-gold/50 focus:outline-none"
        />
      </section>

      <section className="flex flex-col gap-3">
        <FieldLabel id="gender-label">{t("onb.gender.label")}</FieldLabel>
        <div role="radiogroup" aria-labelledby="gender-label" className="grid grid-cols-2 gap-3">
          {genders.map(({ value, icon }) => (
            <OptionCard
              key={value}
              layout="tile"
              icon={icon}
              selected={draft.gender === value}
              onSelect={() => update({ gender: value })}
              title={t(`gender.${value}`)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
