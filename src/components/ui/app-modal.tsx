import * as React from "react"
import { AlertDialog, Dialog } from "radix-ui"

import { cn } from "@/lib/utils"

export const appModalOverlayClass = cn(
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
  "bg-[hsl(var(--color-bg-overlay))]",
)

export const appModalContentClass = cn(
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-xl duration-200",
  "focus:outline-none",
)

export const appModalTitleClass =
  "text-xl font-semibold tracking-tight text-foreground"

export const appModalDescriptionClass =
  "text-sm leading-relaxed text-muted-foreground"

type AppModalVariant = "dialog" | "alert"

const VariantContext = React.createContext<AppModalVariant>("dialog")

function useVariant(): AppModalVariant {
  return React.useContext(VariantContext)
}

type RootProps = {
  variant: AppModalVariant
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

function Root({ variant, open, onOpenChange, children }: RootProps) {
  const tree = (
    <VariantContext.Provider value={variant}>
      {variant === "alert" ? (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
          <AlertDialog.Portal>{children}</AlertDialog.Portal>
        </AlertDialog.Root>
      ) : (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
          <Dialog.Portal>{children}</Dialog.Portal>
        </Dialog.Root>
      )}
    </VariantContext.Provider>
  )
  return tree
}

function Overlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Overlay>) {
  const variant = useVariant()
  const Cmp = variant === "alert" ? AlertDialog.Overlay : Dialog.Overlay
  return (
    <Cmp className={cn(appModalOverlayClass, className)} {...props} />
  )
}

function Content({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Content>) {
  const variant = useVariant()
  const Cmp = variant === "alert" ? AlertDialog.Content : Dialog.Content
  return (
    <Cmp className={cn(appModalContentClass, className)} {...props} />
  )
}

function Title({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Title>) {
  const variant = useVariant()
  const Cmp = variant === "alert" ? AlertDialog.Title : Dialog.Title
  return (
    <Cmp className={cn(appModalTitleClass, className)} {...props} />
  )
}

function Description({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Description>) {
  const variant = useVariant()
  const Cmp =
    variant === "alert" ? AlertDialog.Description : Dialog.Description
  return (
    <Cmp className={cn(appModalDescriptionClass, className)} {...props} />
  )
}

/** Dialog: `Dialog.Close`. Alert: `AlertDialog.Cancel` (safe dismissal). */
function Dismiss({
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Close>) {
  const variant = useVariant()
  const Cmp = variant === "alert" ? AlertDialog.Cancel : Dialog.Close
  return <Cmp {...props} />
}

/** Only for `variant="alert"`. Confirms the alert (focus management). */
function Confirm({
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialog.Action>) {
  return <AlertDialog.Action {...props} />
}

export const AppModal = {
  Root,
  Overlay,
  Content,
  Title,
  Description,
  Dismiss,
  Confirm,
}
