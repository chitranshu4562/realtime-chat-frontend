import * as React from "react"

import { cn } from "@/lib/utils"

export type LabeledInputProps = Omit<React.ComponentProps<"input">, "id"> & {
  label: React.ReactNode
  id?: string
  error?: string
}

const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  function LabeledInput({ label, id, error, className, ...props }, ref) {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const errorId = `${inputId}-error`
    const hasError = Boolean(error)

    return (
      <div className="grid w-full gap-1.5">
        <label
          htmlFor={inputId}
          className="text-md font-medium leading-none text-foreground select-none"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(
            "flex h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-md text-foreground transition-[color,box-shadow] outline-none",
            "placeholder:text-muted-foreground",
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasError &&
              "border-destructive ring-[3px] ring-destructive/20 focus-visible:border-destructive focus-visible:ring-destructive/20 dark:border-destructive/50 dark:ring-destructive/40 dark:focus-visible:border-destructive/50 dark:focus-visible:ring-destructive/40",
            className
          )}
          {...props}
        />
        {hasError ? (
          <p id={errorId} role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    )
  }
)

LabeledInput.displayName = "LabeledInput"

export { LabeledInput }
