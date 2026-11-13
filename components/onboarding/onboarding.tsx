"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Logo } from "@/components/logo"
import { PrimaryButton, Tap } from "@/components/tap"
import { useT } from "@/lib/i18n"
import type { Profile } from "@/lib/types"
import { initialDraft, isStepValid, TOTAL_STEPS, type Draft } from "./draft"
import { StepBody } from "./step-body"
import { StepDays } from "./step-days"
import { StepEquipment } from "./step-equipment"
import { StepGoal } from "./step-goal"
import { StepIntro } from "./step-intro"

interface OnboardingProps {
  onComplete: (profile: Omit<Profile, "language" | "createdAt">) => void
}

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 24 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -24 }),
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const { t } = useT()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [draft, setDraft] = useState<Draft>(initialDraft)

  const update = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }))
  const valid = isStepValid(step, draft)
  const isLast = step === TOTAL_STEPS - 1

  const goNext = () => {
    if (!isStepValid(step, draft)) return
    if (isLast) {
      const { gender, goal, level, daysPerWeek } = draft
      if (!gender || !goal || !level || !daysPerWeek) return
      onComplete({ ...draft, name: draft.name.trim(), gender, goal, level, daysPerWeek })
      return
    }
    setDirection(1)
    setStep((s) => s + 1)
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => Math.max(0, s - 1))
  }

  const steps = [
    <StepIntro key="intro" draft={draft} update={update} onSubmit={goNext} />,
    <StepBody key="body" draft={draft} update={update} />,
    <StepGoal key="goal" draft={draft} update={update} />,
    <StepEquipment key="equipment" draft={draft} update={update} />,
    <StepDays key="days" draft={draft} update={update} />,
  ]

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="pt-safe sticky top-0 z-20 bg-ink/85 px-5 pb-3">
        <div className="flex h-12 items-center justify-between">
          <Tap
            onClick={goBack}
            aria-label={t("common.back")}
            className={`-ml-3 flex size-12 items-center justify-center rounded-full text-fg transition-opacity ${step === 0 ? "pointer-events-none opacity-0" : ""}`}
            tabIndex={step === 0 ? -1 : 0}
            aria-hidden={step === 0}
          >
            <ArrowLeft className="size-5" strokeWidth={1.5} aria-hidden="true" />
          </Tap>
          <Logo size="sm" />
          <span className="w-12 text-right text-xs font-medium tabular-nums text-muted-fg">
            {step + 1}/{TOTAL_STEPS}
          </span>
        </div>
        <div
          role="progressbar"
          aria-label={t("common.stepOf", { n: step + 1, total: TOTAL_STEPS })}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={step + 1}
          className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/[0.06]"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
            initial={false}
            animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </header>

      <main className="relative flex-1 overflow-x-hidden px-5 pt-6 pb-8">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="pb-safe sticky bottom-0 z-20 bg-gradient-to-t from-ink via-ink/95 to-ink/0 px-5 pt-6">
        <PrimaryButton onClick={goNext} disabled={!valid}>
          {isLast ? t("common.createPlan") : t("common.next")}
          <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </PrimaryButton>
      </footer>
    </div>
  )
}
