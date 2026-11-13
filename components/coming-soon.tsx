"use client"

import { Sparkles } from "lucide-react"
import { Tap } from "@/components/tap"
import { LANGS, useT } from "@/lib/i18n"
import { clearProfile, setLang } from "@/lib/store"
import { cn } from "@/lib/utils"
import type { Tab } from "./bottom-nav"

export function ComingSoon({ tab }: { tab: Exclude<Tab, "home"> }) {
  const { t, lang } = useT()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="pt-3 text-2xl font-semibold tracking-tight text-fg">{t(`nav.${tab}`)}</h1>

      <div className="surface flex flex-col items-center gap-4 px-6 py-12 text-center">
        <span className="flex size-14 items-center justify-center rounded-full border border-gold/30 text-gold">
          <Sparkles className="size-6" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1.5">
          <p className="text-lg font-semibold text-fg">{t("soon.title")}</p>
          <p className="text-sm text-muted-fg text-pretty">{t("soon.desc")}</p>
        </div>
      </div>

      {tab === "profile" ? (
        <section aria-labelledby="profile-lang" className="flex flex-col gap-3">
          <h2 id="profile-lang" className="text-xs font-medium uppercase tracking-[0.18em] text-muted-fg">
            {t("profile.language")}
          </h2>
          <div role="radiogroup" aria-labelledby="profile-lang" className="grid grid-cols-3 gap-2">
            {LANGS.map((code) => (
              <Tap
                key={code}
                role="radio"
                aria-checked={lang === code}
                onClick={() => setLang(code)}
                className={cn(
                  "surface min-h-12 rounded-2xl px-2 text-sm font-medium transition-colors duration-200",
                  lang === code ? "is-selected text-fg" : "text-muted-fg",
                )}
              >
                {t(`lang.${code}`)}
              </Tap>
            ))}
          </div>
          <Tap
            onClick={clearProfile}
            className="mt-2 min-h-12 rounded-2xl border border-white/[0.08] text-sm font-medium text-muted-fg"
          >
            {t("profile.reset")}
          </Tap>
        </section>
      ) : null}
    </div>
  )
}
