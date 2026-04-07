import * as React from "react"
import { LogOut, MessageCircle, MoreVertical, Palette } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { DropdownMenu } from "radix-ui"

import { AppModal } from "@/components/ui/app-modal"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"
import { SecondaryButton } from "@/components/ui/secondary-button"
import { useLogout } from "@/features/auth/hooks"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { cn } from "@/lib/utils"

import { ThemeSettingsDialog } from "./ThemeSettingsDialog"

const menuContentClass = cn(
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 z-50 min-w-[11rem] overflow-hidden rounded-xl border p-1 shadow-lg",
  "border-[hsl(var(--color-border-default))] bg-popover text-popover-foreground",
)

const menuItemClass = cn(
  "relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-2 text-sm outline-none",
  "text-[hsl(var(--color-nav-item-text))]",
  "focus:bg-[hsl(var(--color-nav-item-bg-hover))] data-[highlighted]:bg-[hsl(var(--color-nav-item-bg-hover))]",
)

export function ConversationHeader() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((s) => s.logout)
  const logoutMutation = useLogout()

  const [themeOpen, setThemeOpen] = React.useState(false)
  const [logoutOpen, setLogoutOpen] = React.useState(false)

  async function confirmLogout() {
    try {
      await logoutMutation.mutateAsync()
    } finally {
      clearAuth()
      navigate("/", { replace: true })
      setLogoutOpen(false)
    }
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-4 px-4 sm:px-6",
          "border-b border-[hsl(var(--color-nav-border))]",
          "bg-[hsl(var(--app-header-bg))] [backdrop-filter:blur(var(--app-header-blur))]",
          "shadow-[0_1px_0_0_hsl(var(--app-header-shadow))]",
        )}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20"
            aria-hidden
          >
            <MessageCircle className="size-[1.125rem]" strokeWidth={2.25} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold tracking-tight text-foreground">
              Realtime Chat
            </p>
          </div>
        </div>

        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Trigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              className="rounded-xl text-[hsl(var(--color-nav-item-text))] hover:bg-[hsl(var(--color-nav-item-bg-hover))]"
              aria-label="Open menu"
            >
              <MoreVertical className="size-5" strokeWidth={2} />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={menuContentClass}
              sideOffset={8}
              align="end"
            >
              <DropdownMenu.Item
                className={menuItemClass}
                onSelect={() => setThemeOpen(true)}
              >
                <Palette className="size-4 opacity-80" />
                Theme
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-border" />
              <DropdownMenu.Item
                className={cn(menuItemClass, "text-destructive focus:text-destructive")}
                onSelect={() => setLogoutOpen(true)}
              >
                <LogOut className="size-4 opacity-90" />
                Log out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </header>

      <ThemeSettingsDialog open={themeOpen} onOpenChange={setThemeOpen} />

      <AppModal.Root
        variant="alert"
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
      >
        <AppModal.Overlay />
        <AppModal.Content>
          <AppModal.Title>Sign out?</AppModal.Title>
          <AppModal.Description className="mt-2">
            You will need to sign in again to access your conversations.
          </AppModal.Description>
          <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
            <AppModal.Dismiss asChild>
              <SecondaryButton
                type="button"
                className="w-full sm:w-auto"
                disabled={logoutMutation.isPending}
              >
                Cancel
              </SecondaryButton>
            </AppModal.Dismiss>
            <AppModal.Confirm asChild>
              <LoadingButton
                type="button"
                variant="destructive"
                className="w-full rounded-xl sm:w-auto"
                loading={logoutMutation.isPending}
                loadingLabel="Signing out"
                onClick={() => void confirmLogout()}
              >
                Log out
              </LoadingButton>
            </AppModal.Confirm>
          </div>
        </AppModal.Content>
      </AppModal.Root>
    </>
  )
}
