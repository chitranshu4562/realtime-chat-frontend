import { AnimatePresence, motion } from "framer-motion"
import { Outlet, useLocation } from "react-router-dom"

const carouselXTransition = {
  type: "tween" as const,
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as const,
}

export function PageTransitionLayout() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={location.pathname}
          className="absolute top-0 left-0 min-h-screen w-full overflow-x-hidden overflow-y-auto bg-background"
          initial={{ x: "100%", zIndex: 1 }}
          animate={{ x: 0, zIndex: 1 }}
          exit={{ x: "-100%", zIndex: 0 }}
          transition={{
            x: carouselXTransition,
            zIndex: { duration: 0 },
          }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
