import * as React from "react"

import { cn } from "@/lib/utils"

import { Button } from "./button"

export type BaseButtonProps = React.ComponentProps<typeof Button>

function BaseButton({ className, ...props }: BaseButtonProps) {
  return (
    <Button
      className={cn(
        "h-auto min-h-10 cursor-pointer gap-2 px-4 py-2.5 text-base [&_svg:not([class*='size-'])]:size-[1.125rem]",
        className,
      )}
      {...props}
    />
  )
}

export { BaseButton }
