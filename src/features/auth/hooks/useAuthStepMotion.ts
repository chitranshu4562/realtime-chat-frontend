import { useMemo } from "react"
import { useReducedMotion } from "framer-motion"

const STEP_TRANSITION = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }

/** Framer Motion variants for auth flows (signup steps, login card, etc.). */
export function useAuthStepMotion() {
  const reduceMotion = useReducedMotion()

  const variants = useMemo(
    () =>
      reduceMotion
        ? {
            enter: { opacity: 0 },
            center: { opacity: 1 },
            exit: { opacity: 0 },
          }
        : {
            enter: (dir: number) => ({
              opacity: 0,
              x: dir * 28,
              filter: "blur(4px)",
            }),
            center: {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            },
            exit: (dir: number) => ({
              opacity: 0,
              x: dir * -28,
              filter: "blur(3px)",
            }),
          },
    [reduceMotion]
  )

  const transition = reduceMotion ? { duration: 0.15 } : STEP_TRANSITION

  return { variants, transition }
}
