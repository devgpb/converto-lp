"use client"

import { API_URL } from "@/lib/api"

export type TrackingEventName =
  | "lp_page_view"
  | "section_view"
  | "scroll_depth"
  | "cta_click"
  | "faq_open"
  | "gallery_interaction"
  | "dwell_time"

export type DwellTimeBucket = "0_10s" | "10_30s" | "30_60s" | "60_180s" | "180s_plus"
export type DeviceType = "mobile" | "tablet" | "desktop"
export type ScreenCategory = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
type MetadataValue = string | number | boolean

export type TrackingPayload = {
  event_name: TrackingEventName
  page: "/"
  section?: string
  cta_id?: string
  scroll_bucket?: 25 | 50 | 75 | 100
  dwell_time_bucket?: DwellTimeBucket
  referrer_host?: string
  device_type: DeviceType
  screen_category: ScreenCategory
  occurred_at: string
  metadata: Record<string, MetadataValue>
}

type TrackHomeEventInput = {
  eventName: TrackingEventName
  section?: string
  ctaId?: string
  scrollBucket?: 25 | 50 | 75 | 100
  dwellTimeBucket?: DwellTimeBucket
  metadata?: Record<string, MetadataValue | null | undefined>
}

const TRACKING_ENDPOINT = `${API_URL.replace(/\/$/, "")}/lp-events`
const SENT_EVENTS_STORAGE_KEY = "lp_tracking_sent_events"

type SentEventsStore = Partial<{
  [K in TrackingEventName]: true | string[]
}>

function getReferrerHost() {
  if (typeof document === "undefined" || !document.referrer) return undefined
  try {
    return new URL(document.referrer).hostname.replace(/^www\./, "")
  } catch {
    return undefined
  }
}

export function getDeviceType(width?: number): DeviceType {
  const viewportWidth = width ?? (typeof window !== "undefined" ? window.innerWidth : 1280)
  if (viewportWidth < 768) return "mobile"
  if (viewportWidth < 1024) return "tablet"
  return "desktop"
}

export function getScreenCategory(width?: number): ScreenCategory {
  const viewportWidth = width ?? (typeof window !== "undefined" ? window.innerWidth : 1280)
  if (viewportWidth < 640) return "xs"
  if (viewportWidth < 768) return "sm"
  if (viewportWidth < 1024) return "md"
  if (viewportWidth < 1280) return "lg"
  if (viewportWidth < 1536) return "xl"
  return "2xl"
}

export function getDwellTimeBucket(durationMs: number): DwellTimeBucket {
  const durationSeconds = durationMs / 1000
  if (durationSeconds < 10) return "0_10s"
  if (durationSeconds < 30) return "10_30s"
  if (durationSeconds < 60) return "30_60s"
  if (durationSeconds < 180) return "60_180s"
  return "180s_plus"
}

function sanitizeMetadata(metadata?: Record<string, MetadataValue | null | undefined>) {
  const entries = Object.entries(metadata ?? {}).filter(([, value]) => value !== null && value !== undefined)
  return Object.fromEntries(entries) as Record<string, MetadataValue>
}

function getSentEventsStore(): SentEventsStore {
  if (typeof window === "undefined") return {}

  try {
    const raw = window.localStorage.getItem(SENT_EVENTS_STORAGE_KEY)
    if (!raw) return {}

    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {}

    return parsed as SentEventsStore
  } catch {
    return {}
  }
}

function setSentEventsStore(store: SentEventsStore) {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(SENT_EVENTS_STORAGE_KEY, JSON.stringify(store))
  } catch {
    // Storage failures should not block the page flow.
  }
}

function getEventMarker(input: TrackHomeEventInput): string | null {
  if (input.scrollBucket) return String(input.scrollBucket)
  if (input.dwellTimeBucket) return input.dwellTimeBucket
  if (input.ctaId) return input.ctaId
  if (input.section && input.eventName === "section_view") return input.section
  return null
}

function hasSentEvent(input: TrackHomeEventInput) {
  const store = getSentEventsStore()
  const marker = getEventMarker(input)
  const entry = store[input.eventName]

  if (marker === null) return entry === true
  if (!Array.isArray(entry)) return false
  return entry.includes(marker)
}

function markEventAsSent(input: TrackHomeEventInput) {
  const store = getSentEventsStore()
  const marker = getEventMarker(input)

  if (marker === null) {
    store[input.eventName] = true
    setSentEventsStore(store)
    return
  }

  const storedEntry = store[input.eventName]
  const currentMarkers: string[] = Array.isArray(storedEntry) ? storedEntry : []

  if (!currentMarkers.includes(marker)) {
    store[input.eventName] = [...currentMarkers, marker]
    setSentEventsStore(store)
  }
}

export function buildTrackingPayload(input: TrackHomeEventInput): TrackingPayload | null {
  if (typeof window === "undefined" || window.location.pathname !== "/") return null

  return {
    event_name: input.eventName,
    page: "/",
    section: input.section,
    cta_id: input.ctaId,
    scroll_bucket: input.scrollBucket,
    dwell_time_bucket: input.dwellTimeBucket,
    referrer_host: getReferrerHost(),
    device_type: getDeviceType(),
    screen_category: getScreenCategory(),
    occurred_at: new Date().toISOString(),
    metadata: sanitizeMetadata(input.metadata),
  }
}

function postTrackingPayload(payload: TrackingPayload, preferBeacon = false) {
  const body = JSON.stringify(payload)

  if (preferBeacon && typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([body], { type: "application/json" })
    if (navigator.sendBeacon(TRACKING_ENDPOINT, blob)) return
  }

  void fetch(TRACKING_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: preferBeacon,
    cache: "no-store",
  }).catch(() => {
    // Tracking must never interfere with the page flow.
  })
}

export function trackHomeEvent(input: TrackHomeEventInput, options?: { preferBeacon?: boolean }) {
  const payload = buildTrackingPayload(input)
  if (!payload) return
  if (hasSentEvent(input)) return
  markEventAsSent(input)
  postTrackingPayload(payload, options?.preferBeacon ?? false)
}

export function trackHomeEventOnce(
  input: TrackHomeEventInput,
  _onceKey: string,
  options?: { preferBeacon?: boolean }
) {
  trackHomeEvent(input, options)
}
