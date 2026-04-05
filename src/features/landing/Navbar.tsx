import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import styles from "./landing-page.module.css"

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(styles.glassStrong, "fixed top-0 right-0 left-0 z-50")}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div
              className={cn(
                styles.bgGradientPrimary,
                "flex h-9 w-9 items-center justify-center rounded-lg",
              )}
            >
              <MessageCircle className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="font-heading text-foreground text-xl font-bold">
              Realtime<span className={styles.textGradient}>Chat</span>
            </span>
          </motion.div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="text-muted-foreground hover:text-foreground" />
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button
            className={cn(
              styles.bgGradientPrimary,
              styles.glow,
              "font-semibold text-primary-foreground transition-opacity hover:opacity-90",
            )}
            asChild
          >
            <Link to="/signup">Sign up free</Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
