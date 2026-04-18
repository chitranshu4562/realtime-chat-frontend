import { useState } from "react"
import { ConversationHeader } from "./components/ConversationHeader"
import { MembersDialog } from "./components/MembersDialog"
import { NoConversationFound } from "./components/NoConversationFound"

export default function ConversationPage() {
  const [membersOpen, setMembersOpen] = useState(false)

  function handleStartNewPage() {
    setMembersOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--color-bg-page))]">
      <ConversationHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-10">
        <NoConversationFound onStartNewChat={handleStartNewPage} />
      </main>
      <MembersDialog open={membersOpen} onOpenChange={setMembersOpen} />
    </div>
  )
}
