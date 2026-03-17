import type { ConsentCategories } from "@/lib/consent"

export const GOOGLE_ADS_ID = "AW-17996028524"
export const GOOGLE_ADS_CHECKOUT_CONVERSION = "AW-17996028524/LAfdCIug-okcEOy0loVD"

type GoogleConsentState = "granted" | "denied"

type GoogleConsentSettings = {
  analytics_storage: GoogleConsentState
  ad_storage: GoogleConsentState
  ad_user_data: GoogleConsentState
  ad_personalization: GoogleConsentState
}

type GoogleAdsConversionOptions = {
  url?: string
  transactionId: string
  enabled?: boolean
  sendTo?: string
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function getGoogleConsentSettings(
  consent?: Pick<ConsentCategories, "analytics" | "marketing"> | null,
): GoogleConsentSettings {
  const analyticsStorage: GoogleConsentState = consent?.analytics ? "granted" : "denied"
  const marketingStorage: GoogleConsentState = consent?.marketing ? "granted" : "denied"

  return {
    analytics_storage: analyticsStorage,
    ad_storage: marketingStorage,
    ad_user_data: marketingStorage,
    ad_personalization: marketingStorage,
  }
}

export function applyGoogleConsent(
  consent?: Pick<ConsentCategories, "analytics" | "marketing"> | null,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return
  }

  window.gtag("consent", "update", getGoogleConsentSettings(consent))
}

export function extractCheckoutTransactionId(checkoutUrl: string, tenantId: string) {
  const decodedUrl = decodeURIComponent(checkoutUrl)
  const sessionIdMatch =
    decodedUrl.match(/\/(cs_(?:test_|live_)?[A-Za-z0-9_]+)/) ??
    decodedUrl.match(/session_id=(cs_(?:test_|live_)?[A-Za-z0-9_]+)/)

  if (sessionIdMatch?.[1]) {
    return sessionIdMatch[1]
  }

  return `checkout-${tenantId}-${Date.now()}`
}

export function reportGoogleAdsConversion({
  url,
  transactionId,
  enabled = true,
  sendTo = GOOGLE_ADS_CHECKOUT_CONVERSION,
}: GoogleAdsConversionOptions) {
  if (typeof window === "undefined") {
    return
  }

  let hasRedirected = false

  const callback = () => {
    if (hasRedirected) return
    hasRedirected = true

    if (url) {
      window.location.href = url
    }
  }

  if (!enabled || typeof window.gtag !== "function") {
    callback()
    return
  }

  window.gtag("event", "conversion", {
    send_to: sendTo,
    transaction_id: transactionId,
    event_callback: callback,
  })

  window.setTimeout(callback, 1200)
}
