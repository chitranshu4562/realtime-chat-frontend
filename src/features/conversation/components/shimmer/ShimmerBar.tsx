import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export type ShimmerBarProps = {
  className?: string
}

export function ShimmerBar({ className }: ShimmerBarProps) {
  return (
    <span
      className={cn("relative block overflow-hidden rounded-md bg-muted", className)}
      aria-hidden
    >
      <motion.span
        className="pointer-events-none absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-foreground/12 to-transparent dark:via-foreground/18"
        initial={{ x: "-60%" }}
        animate={{ x: "280%" }}
        transition={{
          duration: 1.35,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </span>
  )
}
