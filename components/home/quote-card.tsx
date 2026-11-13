"use client"

import { Quote as QuoteIcon } from "lucide-react"
import { useT } from "@/lib/i18n"
import type { Quote } from "@/lib/types"

export function QuoteCard({ quote }: { quote: Quote }) {
  const { t } = useT()

  return (
    <section aria-labelledby="quote-label" className="glass flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2">
        <QuoteIcon className="size-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
        <h2 id="quote-label" className="text-xs font-medium uppercase tracking-[0.18em] text-muted-fg">
          {t("home.quote.label")}
        </h2>
      </div>
      <figure className="flex flex-col gap-2">
        <blockquote className="text-base leading-relaxed text-fg text-pretty">{t(quote.textKey)}</blockquote>
        <figcaption className="text-sm text-muted-fg">{"— "}{t(quote.authorKey)}</figcaption>
      </figure>
    </section>
  )
}
