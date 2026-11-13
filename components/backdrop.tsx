/** Radial gradients instead of blur filters keep the backdrop cheap on low-end phones. */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute -top-56 -right-48 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,0.08),transparent)]" />
      <div className="absolute -bottom-64 -left-56 size-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.10),transparent)]" />
      <div className="bg-lines absolute inset-0" />
    </div>
  )
}
