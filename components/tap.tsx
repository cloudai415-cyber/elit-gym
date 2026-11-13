"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export const Tap = forwardRef<HTMLButtonElement, HTMLMotionProps<"button">>(function Tap(
  { className, disabled, type = "button", ...props },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn("touch-manipulation select-none disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
})

export const PrimaryButton = forwardRef<HTMLButtonElement, HTMLMotionProps<"button">>(function PrimaryButton(
  { className, disabled, ...props },
  ref,
) {
  return (
    <Tap
      ref={ref}
      disabled={disabled}
      className={cn(
        "flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-base font-semibold transition-colors duration-200",
        disabled ? "bg-white/[0.06] text-muted-fg" : "btn-gold",
        className,
      )}
      {...props}
    />
  )
})
