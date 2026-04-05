import { Link } from "react-router-dom"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="text-muted-foreground text-center text-sm">
        Auth UI can be wired here next.
      </p>
      <Button variant="outline" asChild>
        <Link to="/">← Back to home</Link>
      </Button>
    </div>
  )
}
