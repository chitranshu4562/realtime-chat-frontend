import { ConversationDashboard } from "./components/ConversationDashboard"
import { ConversationHeader } from "./components/ConversationHeader"

export default function ConversationPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[hsl(var(--color-bg-page))]">
      <ConversationHeader />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden">
        <ConversationDashboard />
      </main>
    </div>
  )
}
