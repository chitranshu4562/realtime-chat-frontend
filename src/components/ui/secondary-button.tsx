import * as React from "react"

import { BaseButton } from "./base-button"

export type SecondaryButtonProps = Omit<
  React.ComponentProps<typeof BaseButton>,
  "variant"
>

function SecondaryButton(props: SecondaryButtonProps) {
  return <BaseButton variant="secondary" {...props} />
}

export { SecondaryButton }
