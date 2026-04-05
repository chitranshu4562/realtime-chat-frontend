import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { LoadingButton } from "@/components/ui/loading-button"
import { LabeledInput } from "@/components/ui/labeled-input"

import { useSendOtp } from "../hooks"
import { type SendOtpValues, sendOtpSchema } from "../schemas"

type SendOtpStepProps = {
  defaultEmail?: string
  onContinue: (email: string) => void
}

export function SendOtpStep({
  defaultEmail = "",
  onContinue,
}: SendOtpStepProps) {
  const sendOtpMutation = useSendOtp()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendOtpValues>({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: { email: defaultEmail },
  })

  async function onSubmit(values: SendOtpValues) {
    const email = values.email.trim()
    await sendOtpMutation.mutateAsync({ email })
    onContinue(email)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Enter your email</h2>
        <p className="text-muted-foreground text-sm">
          We&apos;ll send a one-time code to verify it&apos;s you.
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

      <LoadingButton
        type="submit"
        className="w-full"
        loading={sendOtpMutation.isPending}
        loadingLabel="Sending code"
      >
        Send verification code
      </LoadingButton>
    </form>
  )
}
