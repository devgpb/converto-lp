import type { ComponentPropsWithoutRef } from "react"
import { Cog } from "lucide-react"
import { cn } from "@/lib/utils"

type GearCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right"
type GearSize = "small" | "medium" | "large" | "giant"

type GearBackgroundDivProps = ComponentPropsWithoutRef<"div"> & {
  corner?: GearCorner
  size?: GearSize
  gearClassName?: string
}

const cornerClasses: Record<GearCorner, string> = {
  "top-left": "-left-6 -top-6",
  "top-right": "-right-6 -top-6",
  "bottom-left": "-bottom-6 -left-6",
  "bottom-right": "-bottom-6 -right-16",
}

const sizeClasses: Record<GearSize, string> = {
  small: "h-16 w-16 sm:h-20 sm:w-20",
  medium: "h-24 w-24 sm:h-32 sm:w-32",
  large: "h-36 w-36 sm:h-48 sm:w-48",
  giant: "h-52 w-52 sm:h-72 sm:w-72",
}

export function GearBackgroundDiv({
  corner = "bottom-right",
  size = "medium",
  className,
  gearClassName,
  children,
  ...props
}: GearBackgroundDivProps) {
  return (
    <div className={cn("relative overflow-visible", className)} {...props}>
      <Cog
        className={cn(
          "pointer-events-none absolute z-0 animate-spin-even-slower text-emerald-600",
          cornerClasses[corner],
          sizeClasses[size],
          gearClassName
        )}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
