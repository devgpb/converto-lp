"use client"

import { useEffect } from "react"

import { getConsent } from "@/lib/consent"
import { applyGoogleConsent } from "@/lib/google-ads"

export default function GoogleAdsConsentSync() {
  useEffect(() => {
    const syncConsent = () => {
      applyGoogleConsent(getConsent())
    }

    syncConsent()
    window.addEventListener("consent:updated", syncConsent)

    return () => {
      window.removeEventListener("consent:updated", syncConsent)
    }
  }, [])

  return null
}
