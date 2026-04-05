import { zodResolver } from "@hookform/resolvers/zod"
import { REGEXP_ONLY_DIGITS, type RenderProps } from "input-otp"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { InputOTP } from "@/components/ui/input-otp"
import { LoadingButton } from "@/components/ui/loading-button"
import { notifyError } from "@/lib/toast"
import { cn } from "@/lib/utils"

import { useVerifyOtp } from "../hooks"
import { type VerifyOtpValues, verifyOtpSchema } from "../schemas"

type VerifyOtpStepProps = {
  email: string
  onVerified: (verifiedEmailToken: string) => void
  onBack: () => void
}

function OtpSlots({
  slots,
  showCode,
  invalid,
}: Pick<RenderProps, "slots"> & { showCode: boolean; invalid: boolean }) {
  return (
    <div
      className="grid w-full grid-cols-6 gap-2"
      role="group"
      aria-label="Verification code digits"
      aria-invalid={invalid || undefined}
    >
      {slots.map((slot, index) => (
        <div
          key={index}
          data-slot="input-otp-slot"
          data-active={slot.isActive}
          className={cn(
            "relative flex aspect-square min-h-10 w-full min-w-0 items-center justify-center rounded-lg border border-input bg-background text-base font-medium tabular-nums transition-all outline-none",
            "dark:bg-input/30",
            invalid && "border-destructive dark:border-destructive/50",
            slot.isActive && !invalid && "z-10 border-ring ring-[3px] ring-ring/50",
            slot.isActive && invalid && "z-10 ring-[3px] ring-destructive/20 dark:ring-destructive/40",
          )}
        >
          {slot.char != null ? (showCode ? slot.char : "•") : null}
          {slot.hasFakeCaret ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export function VerifyOtpStep({ email, onVerified, onBack }: VerifyOtpStepProps) {
  const [showOtp, setShowOtp] = useState(false)
  const [changingEmail, setChangingEmail] = useState(false)
  const verifyOtpMutation = useVerifyOtp()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: "" },
  })

  async function onSubmit(values: VerifyOtpValues) {
    const { verifiedEmailToken } = await verifyOtpMutation.mutateAsync({
      email,
      otp: values.otp,
    })
    if (!verifiedEmailToken) {
      notifyError(
        "Verification succeeded but no token was returned. Please try again.",
      )
      return
    }
    onVerified(verifiedEmailToken)
  }

  function handleChangeEmail() {
    setChangingEmail(true)
    window.setTimeout(() => {
      onBack()
    }, 320)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Verify your email</h2>
        <p className="text-muted-foreground text-sm">
          Enter the 6-digit code we sent to{" "}
          <span className="text-foreground font-medium">{email}</span>.
        </p>
      </div>

      <div className="grid w-full gap-2">
        <label htmlFor="verify-otp" className="sr-only">
          One-time verification code
        </label>
        <Controller
          control={control}
          name="otp"
          render={({ field }) => (
            <div className="flex w-full flex-col gap-2">
              <InputOTP
                id="verify-otp"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                autoComplete="one-time-code"
                inputMode="numeric"
                type={showOtp ? "text" : "password"}
                containerClassName="w-full"
                value={field.value}
                onChange={field.onChange}
                render={({ slots }) => (
                  <OtpSlots
                    slots={slots}
                    showCode={showOtp}
                    invalid={Boolean(errors.otp)}
                  />
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  onClick={() => setShowOtp((v) => !v)}
                  aria-label={showOtp ? "Hide verification code" : "Show verification code"}
                >
                  {showOtp ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
              {errors.otp ? (
                <p
                  role="alert"
                  className="max-w-full text-center text-sm text-destructive sm:text-left"
                >
                  {errors.otp.message}
                </p>
              ) : null}
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
        <LoadingButton
          type="submit"
          className="h-11 w-full"
          loading={isSubmitting}
          loadingLabel="Verifying code"
        >
          Verify OTP
        </LoadingButton>
        <LoadingButton
          type="button"
          variant="outline"
          className="h-11 w-full"
          loading={changingEmail}
          loadingLabel="Going back"
          onClick={handleChangeEmail}
        >
          Change email
        </LoadingButton>
      </div>
    </form>
  )
}
