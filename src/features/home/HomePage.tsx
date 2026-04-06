import { useNavigate } from "react-router-dom"

import { ThemeToggle } from "@/components/theme-toggle"
import { LoadingButton } from "@/components/ui/loading-button"
import { useLogout } from "@/features/auth/hooks"
import { useAuthStore } from "@/features/auth/store/useAuthStore"

export default function HomePage() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((s) => s.logout)
  const logoutMutation = useLogout()

  async function handleLogout() {
    try {
      await logoutMutation.mutateAsync()
    } finally {
      clearAuth()
      navigate("/", { replace: true })
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
      <p className="text-muted-foreground max-w-md text-center text-sm">
        You are signed in. Chat and other features can be wired here next.
      </p>
      <LoadingButton
        variant="outline"
        type="button"
        loading={logoutMutation.isPending}
        loadingLabel="Signing out"
        onClick={handleLogout}
      >
        Log out
      </LoadingButton>
    </div>
  )
}
