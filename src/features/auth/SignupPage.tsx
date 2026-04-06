import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

import { SendOtpStep, SignupStep, VerifyOtpStep } from "./components"
import { useSignupStepMotion } from "./hooks"

const STEP_KEYS = ["email", "otp", "register"] as const

type Step = 0 | 1 | 2

export default function SignupPage() {
  const navigate = useNavigate()
  const { variants: stepMotion, transition } = useSignupStepMotion()
  const [step, setStep] = useState<Step>(0)
  const [direction, setDirection] = useState(1)
  const [email, setEmail] = useState("")
  const [verifiedEmailToken, setVerifiedEmailToken] = useState("")

  function go(next: Step) {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-12">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
        <p className="text-muted-foreground mt-1 text-sm">A few quick steps to get started</p>
      </div>

      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border/80 bg-card p-8
          shadow-[0_1px_2px_rgb(0_0_0/_0.04),0_8px_24px_-4px_rgb(0_0_0/_0.08),0_24px_48px_-12px_rgb(0_0_0/_0.12),0_48px_80px_-24px_rgb(0_0_0/_0.14)]
          dark:border-border/60 dark:shadow-[0_1px_2px_rgb(0_0_0/_0.2),0_12px_32px_-6px_rgb(0_0_0/_0.45),0_40px_72px_-20px_rgb(0_0_0/_0.55)]"
      >
        <div
          className="mb-8 flex justify-center gap-2"
          role="group"
          aria-label="Sign up progress"
        >
          {([0, 1, 2] as const).map((i) => (
            <span
              key={i}
              aria-current={step === i ? "step" : undefined}
              className={`h-1.5 w-8 rounded-full transition-[background-color,transform] duration-300 ${
                step === i ? "bg-primary scale-105" : step > i ? "bg-primary/45" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={STEP_KEYS[step]}
            custom={direction}
            variants={stepMotion}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            {step === 0 ? (
              <SendOtpStep
                defaultEmail={email}
                onContinue={(nextEmail) => {
                  setEmail(nextEmail)
                  go(1)
                }}
              />
            ) : null}
            {step === 1 ? (
              <VerifyOtpStep
                email={email}
                onVerified={(token) => {
                  setVerifiedEmailToken(token)
                  go(2)
                }}
                onBack={() => go(0)}
              />
            ) : null}
            {step === 2 ? (
              <SignupStep
                key={verifiedEmailToken}
                email={email}
                verifiedEmailToken={verifiedEmailToken}
                onSuccess={() => navigate("/home", { replace: true })}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <Button variant="ghost" asChild>
        <Link to="/">← Back to home</Link>
      </Button>
    </div>
  )
}
