import { QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { BrowserRouter } from "react-router-dom"

import { THEME_STORAGE_KEY } from "@/lib/constants"
import { queryClient } from "@/lib/queryClient"
import { AppRoutes } from "@/routes"
import { ThemedToaster } from "./components/themed-toaster"

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey={THEME_STORAGE_KEY}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
          <ThemedToaster position="top-center" richColors closeButton />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
