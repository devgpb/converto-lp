"use client"

import { useLayoutEffect } from "react"

export default function InitialScrollGuard() {
  useLayoutEffect(() => {
    const root = document.documentElement
    const previousInlineValue = root.style.scrollBehavior

    root.style.scrollBehavior = "auto"

    const restore = () => {
      root.style.scrollBehavior = previousInlineValue
    }

    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(restore)
      return () => window.cancelAnimationFrame(secondFrame)
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      restore()
    }
  }, [])

  return null
}
