"use client"

import { useEffect } from "react"
import { hasConsent } from "@/lib/consent"

export default function AnalyticsGate() {
  useEffect(() => {
    if (hasConsent("analytics")) {
      // Initialize analytics here if integrated (guarded by consent)
    }
    const handler = () => {
      if (hasConsent("analytics")) {
        // Initialize analytics after consent updated
      }
    }
    window.addEventListener("consent:updated", handler)
    return () => window.removeEventListener("consent:updated", handler)
  }, [])
  return null
}

