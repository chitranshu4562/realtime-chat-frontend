import { useState } from "react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"

export default function SignupPage() {
  const [submitting, setSubmitting] = useState(false)

  function handleCreateAccount() {
    setSubmitting(true)
    window.setTimeout(() => setSubmitting(false), 1600)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <p className="text-muted-foreground text-center text-sm">
        Registration form can be added here next.
      </p>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <LoadingButton
          type="button"
          loading={submitting}
          loadingLabel="Creating account"
          onClick={handleCreateAccount}
        >
          Create account
        </LoadingButton>
        <Button variant="outline" asChild>
          <Link to="/">← Back to home</Link>
        </Button>
      </div>
    </div>
  )
}
