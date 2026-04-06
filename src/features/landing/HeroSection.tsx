import { motion } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import FloatingBubbles from "./FloatingBubbles.tsx"
import styles from "./landing-page.module.css"

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div
        className={cn(
          styles.animatePulseGlow,
          "absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]",
        )}
      />
      <div
        className={cn(
          styles.animatePulseGlow,
          "absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]",
        )}
        style={{ animationDelay: "1.5s" }}
      />

      <FloatingBubbles />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={cn(
              styles.glass,
              "text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm",
            )}
          >
            <Zap className="text-accent h-4 w-4" />
            <span>Real-time messaging, reimagined</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading mb-6 text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Chat at the
            <br />
            <span className={styles.textGradient}>speed of thought</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg leading-relaxed sm:text-xl"
          >
            Lightning-fast messaging that keeps you connected.
            No lag. No limits. Just pure conversation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className={cn(
                styles.bgGradientPrimary,
                styles.glowLg,
                "group h-auto px-8 py-6 text-lg font-semibold text-primary-foreground transition-all hover:opacity-90",
              )}
              asChild
            >
              <Link to="/signup">
                Get started free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8"
          >
            {[
              { value: "10M+", label: "Messages/day" },
              { value: "<50ms", label: "Latency" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className={cn(
                    styles.textGradient,
                    "font-heading text-2xl font-bold sm:text-3xl",
                  )}
                >
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-1 text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="from-background absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t to-transparent" />
    </section>
  )
}
