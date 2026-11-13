"use client"

import { Minus, Plus } from "lucide-react"
import { useEffect, useRef } from "react"
import { Tap } from "@/components/tap"
import { useT } from "@/lib/i18n"

interface StepperProps {
  label: string
  unit: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
}

const HOLD_DELAY = 380
const HOLD_INTERVAL = 70

export function Stepper({ label, unit, value, min, max, step = 1, onChange }: StepperProps) {
  const { t } = useT()
  const valueRef = useRef(value)
  const timers = useRef<{ delay?: ReturnType<typeof setTimeout>; repeat?: ReturnType<typeof setInterval> }>({})
  valueRef.current = value

  const stop = () => {
    clearTimeout(timers.current.delay)
    clearInterval(timers.current.repeat)
    timers.current = {}
  }

  useEffect(() => stop, [])

  const nudge = (direction: 1 | -1) => {
    const next = Math.min(max, Math.max(min, valueRef.current + direction * step))
    if (next === valueRef.current) return stop()
    valueRef.current = next
    onChange(next)
  }

  const holdHandlers = (direction: 1 | -1) => ({
    onPointerDown: (e: React.PointerEvent) => {
      if (e.button !== 0) return
      nudge(direction)
      timers.current.delay = setTimeout(() => {
        timers.current.repeat = setInterval(() => nudge(direction), HOLD_INTERVAL)
      }, HOLD_DELAY)
    },
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
    onClick: (e: React.MouseEvent) => {
      // Keyboard activation reports detail 0; pointer presses are already handled on pointerdown.
      if (e.detail === 0) nudge(direction)
    },
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  })

  return (
    <div className="surface flex items-center justify-between gap-3 p-3 pl-5">
      <div className="flex min-w-0 flex-col">
        <span className="text-sm text-muted-fg">{label}</span>
        <span className="flex items-baseline gap-1.5" aria-live="polite">
          <span className="text-4xl font-semibold tabular-nums tracking-tight text-fg">{value}</span>
          <span className="text-sm text-muted-fg">{unit}</span>
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Tap
          aria-label={t("stepper.decrease", { label })}
          disabled={value <= min}
          className="flex size-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-fg disabled:opacity-40"
          {...holdHandlers(-1)}
        >
          <Minus className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </Tap>
        <Tap
          aria-label={t("stepper.increase", { label })}
          disabled={value >= max}
          className="flex size-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-fg disabled:opacity-40"
          {...holdHandlers(1)}
        >
          <Plus className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </Tap>
      </div>
    </div>
  )
}
