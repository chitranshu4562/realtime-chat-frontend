import { Link } from "react-router-dom"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground text-center">This page does not exist.</p>
      <Button asChild>
        <Link to="/">Back home</Link>
      </Button>
    </div>
  )
}
