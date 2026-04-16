"use client"

import { useEffect, useRef } from "react"
import { getDwellTimeBucket, trackHomeEvent } from "@/lib/lp-tracking"

const SECTION_TARGETS = [
  { id: "hero", section: "hero" },
  { id: "impacto-inicial", section: "impacto_inicial" },
  { id: "beneficios", section: "beneficios" },
  { id: "galeria", section: "galeria" },
  { id: "recursos", section: "recursos" },
  { id: "precos", section: "precos" },
  { id: "faq", section: "faq" },
  { id: "final-cta", section: "final_cta" },
] as const

const SCROLL_BUCKETS = [25, 50, 75, 100] as const

function getScrollProgress() {
  const scrollTop = window.scrollY
  const doc = document.documentElement
  const maxScroll = doc.scrollHeight - window.innerHeight
  if (maxScroll <= 0) return 100
  return Math.min(100, Math.round((scrollTop / maxScroll) * 100))
}

export default function HomeTracking() {
  const seenSectionsRef = useRef(new Set<string>())
  const seenScrollBucketsRef = useRef(new Set<number>())
  const hasSentDwellRef = useRef(false)
  const startedAtRef = useRef<number>(Date.now())

  useEffect(() => {
    trackHomeEvent({ eventName: "lp_page_view", section: "hero" })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const section = SECTION_TARGETS.find((target) => target.id === entry.target.id)?.section
          if (!section || seenSectionsRef.current.has(section)) continue
          seenSectionsRef.current.add(section)
          trackHomeEvent({ eventName: "section_view", section })
        }
      },
      { threshold: 0.45 }
    )

    for (const target of SECTION_TARGETS) {
      const element = document.getElementById(target.id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const progress = getScrollProgress()
      for (const bucket of SCROLL_BUCKETS) {
        if (progress < bucket || seenScrollBucketsRef.current.has(bucket)) continue
        seenScrollBucketsRef.current.add(bucket)
        trackHomeEvent({ eventName: "scroll_depth", section: "hero", scrollBucket: bucket })
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  useEffect(() => {
    const sendDwellTime = () => {
      if (hasSentDwellRef.current) return
      hasSentDwellRef.current = true
      trackHomeEvent(
        {
          eventName: "dwell_time",
          section: "hero",
          dwellTimeBucket: getDwellTimeBucket(Date.now() - startedAtRef.current),
        },
        { preferBeacon: true }
      )
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendDwellTime()
    }

    window.addEventListener("pagehide", sendDwellTime)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("pagehide", sendDwellTime)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      sendDwellTime()
    }
  }, [])

  return null
}
