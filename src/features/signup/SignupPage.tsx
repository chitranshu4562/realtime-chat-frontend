import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <p className="text-muted-foreground text-center text-sm">
        Registration form can be added here next.
      </p>
      <Button variant="outline" asChild>
        <Link to="/">← Back to home</Link>
      </Button>
    </div>
  )
}
