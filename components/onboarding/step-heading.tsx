interface StepHeadingProps {
  title: string
  subtitle: string
}

export function StepHeading({ title, subtitle }: StepHeadingProps) {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold leading-tight tracking-tight text-fg text-balance">{title}</h1>
      <p className="text-base text-muted-fg text-pretty">{subtitle}</p>
    </header>
  )
}

export function FieldLabel({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <span id={id} className="text-xs font-medium uppercase tracking-[0.18em] text-muted-fg">
      {children}
    </span>
  )
}
