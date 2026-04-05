import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { LoadingButton } from "@/components/ui/loading-button"
import { LabeledInput } from "@/components/ui/labeled-input"

import { useSignup } from "../hooks"
import { type SignupValues, signupSchema } from "../schemas"

type SignupStepProps = {
  email: string
  verifiedEmailToken: string
  onSuccess?: () => void
}

export function SignupStep({ email, verifiedEmailToken, onSuccess }: SignupStepProps) {
  const signupMutation = useSignup()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      verifiedEmailToken,
      name: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: SignupValues) {
    await signupMutation.mutateAsync({
      verifiedEmailToken: values.verifiedEmailToken,
      name: values.name,
      phoneNumber: values.phoneNumber,
      password: values.password,
      confirmPassword: values.confirmPassword,
    })
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <input type="hidden" {...register("verifiedEmailToken")} />

      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Create your account</h2>
        <p className="text-muted-foreground text-sm">
          Add your details and a strong password to finish signing up.
        </p>
      </div>

      <LabeledInput
        label="Name"
        autoComplete="name"
        placeholder="Jane Doe"
        error={errors.name?.message}
        {...register("name")}
      />

      <LabeledInput
        label="Phone number"
        type="tel"
        autoComplete="tel"
        inputMode="numeric"
        maxLength={10}
        placeholder="9876543210"
        error={errors.phoneNumber?.message}
        {...register("phoneNumber")}
      />

      <LabeledInput
        label="Email"
        type="email"
        autoComplete="email"
        readOnly
        value={email}
        className="bg-muted/50"
        error={undefined}
      />

      <LabeledInput
        label="Password"
        type="password"
        autoComplete="new-password"
        placeholder="Upper, lower, number, special (8–64)"
        error={errors.password?.message}
        {...register("password")}
      />

      <LabeledInput
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        placeholder="Repeat password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <LoadingButton
        type="submit"
        className="w-full"
        loading={isSubmitting}
        loadingLabel="Creating account"
      >
        Create account
      </LoadingButton>
    </form>
  )
}
