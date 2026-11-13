"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Logo } from "@/components/logo"
import { useT } from "@/lib/i18n"

const MESSAGES = ["loading.1", "loading.2", "loading.3"] as const
const DURATION_MS = 3000
const RADIUS = 72
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const { t } = useT()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const step = DURATION_MS / MESSAGES.length
    const rotate = setInterval(() => setIndex((i) => Math.min(i + 1, MESSAGES.length - 1)), step)
    const finish = setTimeout(onDone, DURATION_MS + 200)
    return () => {
      clearInterval(rotate)
      clearTimeout(finish)
    }
  }, [onDone])

  return (
    <motion.main
      role="status"
      aria-label={t("loading.aria")}
      className="flex min-h-dvh flex-col items-center justify-center gap-10 px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex size-44 items-center justify-center">
        <svg viewBox="0 0 160 160" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
          <defs>
            <linearGradient id="ring-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F0D98C" />
              <stop offset="60%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8A6D2B" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
          <motion.circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            stroke="url(#ring-gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: DURATION_MS / 1000, ease: "easeInOut" }}
          />
        </svg>
        <Logo size="lg" showText={false} />
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="text-sm font-semibold tracking-[0.42em] text-fg">{t("brand.name")}</span>
        <div className="relative h-6 w-full min-w-64 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              className="absolute inset-x-0 text-base text-muted-fg"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {t(MESSAGES[index])}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  )
}
