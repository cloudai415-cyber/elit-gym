"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useState } from "react"
import { BottomNav, type Tab } from "@/components/bottom-nav"
import { ComingSoon } from "@/components/coming-soon"
import { HomeScreen } from "@/components/home/home-screen"
import { LoadingScreen } from "@/components/loading-screen"
import { Onboarding } from "@/components/onboarding/onboarding"
import { saveProfile, useAppStore } from "@/lib/store"
import type { Profile } from "@/lib/types"

export function AppShell() {
  const { hydrated, profile, lang } = useAppStore()
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<Tab>("home")

  const handleComplete = (data: Omit<Profile, "language" | "createdAt">) => {
    saveProfile({ ...data, language: lang, createdAt: new Date().toISOString() })
    setTab("home")
    setLoading(true)
  }

  const finishLoading = useCallback(() => setLoading(false), [])

  if (!hydrated) return <div className="min-h-dvh" aria-hidden="true" />

  const view = loading ? "loading" : profile ? "app" : "onboarding"

  return (
    <AnimatePresence mode="wait" initial={false}>
      {view === "onboarding" ? (
        <motion.div key="onboarding" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <Onboarding onComplete={handleComplete} />
        </motion.div>
      ) : view === "loading" ? (
        <LoadingScreen key="loading" onDone={finishLoading} />
      ) : profile ? (
        <motion.div
          key="app"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <main className="pt-safe px-5 pb-32">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="pt-3"
              >
                {tab === "home" ? <HomeScreen profile={profile} /> : <ComingSoon tab={tab} />}
              </motion.div>
            </AnimatePresence>
          </main>
          <BottomNav active={tab} onChange={setTab} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
