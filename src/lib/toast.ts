import type { ReactNode } from "react"
import { toast, type ExternalToast } from "sonner"

export { toast }
export type { ExternalToast }

/** @returns Toast id for `toast.dismiss(id)`; safe to ignore if you only need to show the message. */
export function notifySuccess(
  message: ReactNode,
  options?: ExternalToast,
): string | number {
  return toast.success(message, options)
}

/** @returns Toast id for `toast.dismiss(id)`; safe to ignore if you only need to show the message. */
export function notifyError(
  message: ReactNode,
  options?: ExternalToast,
): string | number {
  return toast.error(message, options)
}
