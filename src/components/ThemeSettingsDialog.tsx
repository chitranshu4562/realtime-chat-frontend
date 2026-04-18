import * as React from "react"
import { Circle, Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Label, RadioGroup } from "radix-ui"

import { AppModal } from "@/components/ui/app-modal"
import { BaseButton } from "@/components/ui/base-button"
import { SecondaryButton } from "@/components/ui/secondary-button"
import { cn } from "@/lib/utils"

const radioItemClass = cn(
  "aspect-square size-4 shrink-0 rounded-full border-2 border-primary text-primary",
  "ring-offset-background transition-[box-shadow,color] outline-none",
  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "data-[state=checked]:border-primary",
)

const themeRowClass = cn(
  "flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card/40 p-3.5 transition-colors",
  "hover:bg-[hsl(var(--color-nav-item-bg-hover))]",
  "has-[[data-state=checked]]:border-primary/60 has-[[data-state=checked]]:bg-accent/50",
)

type ThemeSettingsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThemeSettingsDialog({
  open,
  onOpenChange,
}: ThemeSettingsDialogProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const themeValue = theme ?? "system"

  return (
    <AppModal.Root variant="dialog" open={open} onOpenChange={onOpenChange}>
      <AppModal.Overlay />
      <AppModal.Content onOpenAutoFocus={(e) => e.preventDefault()}>
        <AppModal.Title>Appearance</AppModal.Title>
        <AppModal.Description className="mt-1.5">
          Choose how Realtime Chat looks. System follows your device setting.
        </AppModal.Description>

        <RadioGroup.Root
          className="mt-6 grid gap-2.5"
          value={themeValue}
          onValueChange={(v) => setTheme(v)}
          disabled={!mounted}
          aria-label="Color theme"
        >
          <div className={themeRowClass}>
            <RadioGroup.Item
              value="system"
              id="theme-system"
              className={radioItemClass}
            >
              <RadioGroup.Indicator className="flex size-full items-center justify-center">
                <Circle className="size-2 fill-primary" />
              </RadioGroup.Indicator>
            </RadioGroup.Item>
            <Label.Root
              htmlFor="theme-system"
              className="flex flex-1 cursor-pointer flex-col gap-0.5"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Monitor className="size-4 text-muted-foreground" />
                System
              </span>
              <span className="text-xs text-muted-foreground">
                Use device theme
              </span>
            </Label.Root>
          </div>

          <div className={themeRowClass}>
            <RadioGroup.Item
              value="light"
              id="theme-light"
              className={radioItemClass}
            >
              <RadioGroup.Indicator className="flex size-full items-center justify-center">
                <Circle className="size-2 fill-primary" />
              </RadioGroup.Indicator>
            </RadioGroup.Item>
            <Label.Root
              htmlFor="theme-light"
              className="flex flex-1 cursor-pointer flex-col gap-0.5"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Sun className="size-4 text-muted-foreground" />
                Light
              </span>
              <span className="text-xs text-muted-foreground">
                Always light interface
              </span>
            </Label.Root>
          </div>

          <div className={themeRowClass}>
            <RadioGroup.Item
              value="dark"
              id="theme-dark"
              className={radioItemClass}
            >
              <RadioGroup.Indicator className="flex size-full items-center justify-center">
                <Circle className="size-2 fill-primary" />
              </RadioGroup.Indicator>
            </RadioGroup.Item>
            <Label.Root
              htmlFor="theme-dark"
              className="flex flex-1 cursor-pointer flex-col gap-0.5"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Moon className="size-4 text-muted-foreground" />
                Dark
              </span>
              <span className="text-xs text-muted-foreground">
                Always dark interface
              </span>
            </Label.Root>
          </div>
        </RadioGroup.Root>

        {!mounted ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Loading theme preferences…
          </p>
        ) : null}

        <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <AppModal.Dismiss asChild>
            <SecondaryButton
              type="button"
              className="w-full rounded-xl sm:w-auto sm:min-w-24"
            >
              Close
            </SecondaryButton>
          </AppModal.Dismiss>
          <AppModal.Dismiss asChild>
            <BaseButton
              type="button"
              className="w-full rounded-xl sm:w-auto sm:min-w-24"
            >
              Done
            </BaseButton>
          </AppModal.Dismiss>
        </div>
      </AppModal.Content>
    </AppModal.Root>
  )
}
