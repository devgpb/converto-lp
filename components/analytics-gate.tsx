"use client"

import { useEffect } from "react"
import { hasConsent } from "@/lib/consent"
import { Analytics } from '@vercel/analytics/next'

export default function AnalyticsGate() {
  useEffect(() => {
    if (hasConsent("analytics")) {
      { <Analytics /> }
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

