import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"
import { LabeledInput } from "@/components/ui/labeled-input"

import { useAuthStepMotion, useLogin } from "./hooks"
import { useAuthStore } from "./store/useAuthStore"
import { type LoginValues, loginSchema } from "./schemas"

export default function LoginPage() {
  const navigate = useNavigate()
  const { variants: stepMotion, transition } = useAuthStepMotion()
  const loginMutation = useLogin()
  const setAccessToken = useAuthStore((s) => s.setAccessToken)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: LoginValues) {
    const { accessToken } = await loginMutation.mutateAsync({
      email: values.email.trim(),
      password: values.password,
    })
    setAccessToken(accessToken)
    navigate("/home", { replace: true })
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-12">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        <p className="text-muted-foreground mt-1 text-sm">Welcome back — sign in to continue</p>
      </div>

      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border/80 bg-card p-8
          shadow-[0_1px_2px_rgb(0_0_0/_0.04),0_8px_24px_-4px_rgb(0_0_0/_0.08),0_24px_48px_-12px_rgb(0_0_0/_0.12),0_48px_80px_-24px_rgb(0_0_0/_0.14)]
          dark:border-border/60 dark:shadow-[0_1px_2px_rgb(0_0_0/_0.2),0_12px_32px_-6px_rgb(0_0_0/_0.45),0_40px_72px_-20px_rgb(0_0_0/_0.55)]"
      >
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key="login"
            custom={1}
            variants={stepMotion}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">Sign in</h2>
                <p className="text-muted-foreground text-sm">
                  Use the email and password for your account.
                </p>
              </div>

              <LabeledInput
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <LabeledInput
                label="Password"
                type="password"
                autoComplete="current-password"
                placeholder="Your password"
                error={errors.password?.message}
                {...register("password")}
              />

              <LoadingButton
                type="submit"
                className="w-full"
                loading={isSubmitting}
                loadingLabel="Signing in"
              >
                Sign in
              </LoadingButton>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="text-muted-foreground text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-primary font-medium underline-offset-4 hover:underline">
          Sign up
        </Link>
      </p>

      <Button variant="ghost" asChild>
        <Link to="/">← Back to home</Link>
      </Button>
    </div>
  )
}
