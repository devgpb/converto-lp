"use client"

export type ConsentCategories = {
  essential: true
  analytics: boolean
  marketing: boolean
}

const CONSENT_KEY = "consent_prefs"

export function getConsent(): ConsentCategories | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentCategories
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    }
  } catch {
    return null
  }
}

export function setConsent(consent: Omit<ConsentCategories, "essential">) {
  if (typeof window === "undefined") return
  const value: ConsentCategories = { essential: true, ...consent }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(value))
  window.dispatchEvent(new Event("consent:updated"))
}

export function hasConsent(category: keyof ConsentCategories): boolean {
  if (category === "essential") return true
  const prefs = getConsent()
  return Boolean(prefs && prefs[category])
}

