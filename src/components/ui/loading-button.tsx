import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "./button"
import styles from "./loading-button.module.css"

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>

/**
 * Which global HSL token sets loading icon color (`--loading-btn-spinner` on the button).
 * Values are bare `H S% L%` triples from `index.css`.
 */
const SPINNER_CSS_VAR: Record<ButtonVariant, string> = {
  default: "--color-btn-primary-text",
  outline: "--foreground",
  secondary: "--secondary-foreground",
  ghost: "--color-btn-ghost-text",
  destructive: "--destructive",
  link: "--color-text-link",
}

export type LoadingButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "asChild"
> & {
  loading?: boolean
  /** Optional text announced while `loading` is true (visually hidden). */
  loadingLabel?: string
}

function styleWithSpinnerVar(
  userStyle: React.CSSProperties | undefined,
  variant: ButtonVariant
): React.CSSProperties {
  const token = SPINNER_CSS_VAR[variant]
  return {
    ...userStyle,
    "--loading-btn-spinner": `var(${token})`,
  } as React.CSSProperties
}

function LoadingSpinnerOverlay({
  visible,
  screenReaderLabel,
}: {
  visible: boolean
  screenReaderLabel?: string
}) {
  if (!visible) return null

  return (
    <>
      <Loader2
        className={cn(
          styles.spinnerIcon,
          "size-[1.15em] shrink-0 animate-spin",
        )}
        aria-hidden
      />
      {screenReaderLabel ? (
        <span className={styles.visuallyHidden}>{screenReaderLabel}</span>
      ) : null}
    </>
  )
}

function LoadingButton({
  className,
  variant = "default",
  loading = false,
  loadingLabel,
  disabled,
  children,
  style,
  ...rest
}: LoadingButtonProps) {
  const resolvedVariant: ButtonVariant = variant ?? "default"

  return (
    <Button
      variant={variant}
      disabled={disabled || loading}
      aria-busy={loading}
      data-loading={loading ? "true" : "false"}
      className={cn(
        styles.root,
        "h-auto min-h-10 px-4 py-2 text-lg",
        className,
      )}
      style={styleWithSpinnerVar(style, resolvedVariant)}
      {...rest}
    >
      <span
        className={cn(styles.content, loading && styles.contentHidden)}
        aria-hidden={loading}
      >
        {children}
      </span>

      <LoadingSpinnerOverlay
        visible={loading}
        screenReaderLabel={loadingLabel}
      />
    </Button>
  )
}

export { LoadingButton }
