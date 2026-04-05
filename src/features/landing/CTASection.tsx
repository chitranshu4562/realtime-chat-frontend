import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import styles from "./landing-page.module.css"

export default function CTASection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={cn(
            styles.glassStrong,
            "relative overflow-hidden rounded-3xl p-10 text-center sm:p-16",
          )}
        >
          <div className={cn(styles.bgGradientPrimary, "absolute inset-0 opacity-[0.03]")} />
          <div className="bg-primary/10 absolute top-0 right-0 h-64 w-64 rounded-full blur-[80px]" />
          <div className="bg-secondary/10 absolute bottom-0 left-0 h-48 w-48 rounded-full blur-[60px]" />

          <div className="relative z-10">
            <h2 className="font-heading mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Ready to <span className={styles.textGradient}>start chatting</span>?
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-lg text-lg">
              Join millions who chose faster, more private messaging.
            </p>
            <Button
              size="lg"
              className={cn(
                styles.bgGradientPrimary,
                styles.glowLg,
                "group h-auto px-10 py-6 text-lg font-semibold text-primary-foreground transition-all hover:opacity-90",
              )}
              asChild
            >
              <Link to="/signup">
                Create free account
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="text-muted-foreground text-center text-sm">
          © {new Date().getFullYear()} RealtimeChat. Built with care for real conversations.
        </div>
      </div>
    </section>
  )
}
