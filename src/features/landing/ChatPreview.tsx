import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

import styles from "./landing-page.module.css"

const messages = [
  { text: "Hey! Have you tried RealtimeChat? 🚀", sender: "left", delay: 0 },
  { text: "Not yet, is it any good?", sender: "right", delay: 0.8 },
  { text: "It's insanely fast. Like, instant.", sender: "left", delay: 1.6 },
  { text: "Plus end-to-end encrypted 🔒", sender: "left", delay: 2.2 },
  { text: "Okay I'm sold. Signing up now!", sender: "right", delay: 3 },
]

export default function ChatPreview() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="bg-primary/5 absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            See it <span className={styles.textGradientAccent}>in action</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={cn(
            styles.glassStrong,
            styles.glowLg,
            "mx-auto max-w-md rounded-3xl p-6",
          )}
        >
          <div className="border-border/50 mb-4 flex items-center gap-3 border-b pb-4">
            <div className={cn(styles.bgGradientPrimary, "h-10 w-10 rounded-full")} />
            <div>
              <div className="font-heading text-foreground text-sm font-semibold">
                Sarah
              </div>
              <div className="text-accent text-xs">Online</div>
            </div>
          </div>

          <div className="min-h-[280px] space-y-3">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.sender === "left" ? -20 : 20, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: msg.delay }}
                className={`flex ${msg.sender === "right" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                    msg.sender === "right"
                      ? cn(
                          styles.bgGradientPrimary,
                          "text-primary-foreground rounded-br-md",
                        )
                      : "bg-muted text-foreground rounded-bl-md",
                  )}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="border-border/50 bg-muted/50 flex h-10 flex-1 items-center rounded-full border px-4">
              <span className="text-muted-foreground text-sm">
                Type a message...
              </span>
            </div>
            <div
              className={cn(
                styles.bgGradientPrimary,
                "flex h-10 w-10 items-center justify-center rounded-full",
              )}
            >
              <svg
                className="text-primary-foreground h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
