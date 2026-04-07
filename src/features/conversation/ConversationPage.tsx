import { ConversationHeader } from "./ConversationHeader"

export default function ConversationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--color-bg-page))]">
      <ConversationHeader />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Conversation
        </h1>
        <p className="max-w-md text-center text-sm text-muted-foreground">
          You are signed in. Chat and other features can be wired here next.
        </p>
      </main>
    </div>
  )
}
