import { Toaster as Sonner, type ToasterProps } from "sonner"

import { cn } from "@/lib/utils"

export function Toaster({
  className,
  toastOptions,
  theme = "light",
  ...props
}: ToasterProps) {
  return (
    <Sonner
      className={cn("toaster group", className)}
      theme={theme}
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...toastOptions?.classNames,
          toast: cn(
            "group toast group-[.toaster]:border-border group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:shadow-lg",
            toastOptions?.classNames?.toast,
          ),
          description: cn(
            "group-[.toast]:text-muted-foreground",
            toastOptions?.classNames?.description,
          ),
          actionButton: cn(
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            toastOptions?.classNames?.actionButton,
          ),
          cancelButton: cn(
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            toastOptions?.classNames?.cancelButton,
          ),
        },
      }}
      {...props}
    />
  )
}
