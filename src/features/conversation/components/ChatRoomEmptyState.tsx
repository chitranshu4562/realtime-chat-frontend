import { MessagesSquare } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 28 },
  },
}

export type ChatRoomEmptyStateProps = {
  className?: string
}

export function ChatRoomEmptyState({ className }: ChatRoomEmptyStateProps) {
  return (
    <section
      className={cn(
        "flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden bg-[hsl(var(--color-bg-page))] px-6 py-12",
        className,
      )}
      aria-label="No conversation selected"
    >
      <motion.div
        className="relative flex max-w-md flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="relative mb-8"
          variants={item}
          aria-hidden
        >
          <motion.div
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={cn(
              "relative flex size-24 items-center justify-center rounded-2xl",
              "bg-primary/12 text-primary ring-1 ring-primary/25",
              "shadow-[0_0_0_1px_hsl(var(--color-border-default)/0.35)]",
            )}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <MessagesSquare
              className="size-11"
              strokeWidth={2}
              aria-hidden
            />
          </motion.div>
        </motion.div>

        <motion.h2
          variants={item}
          className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          Select a conversation
        </motion.h2>
        <motion.p
          variants={item}
          className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground"
        >
          Choose someone from the list on the left to open their chat room.
          Your thread will load here.
        </motion.p>
      </motion.div>
    </section>
  )
}
