import { useTheme } from "next-themes"
import type { ToasterProps } from "sonner"

import { Toaster } from "@/components/ui/sonner"

export function ThemedToaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === "dark" ? "dark" : "light"

  return <Toaster {...props} theme={theme} />
}
