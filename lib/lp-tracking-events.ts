export type TrackingEventName =
  | "lp_page_view"
  | "section_view"
  | "scroll_depth"
  | "cta_click"
  | "faq_open"
  | "gallery_interaction"
  | "feature_zoom"
  | "video_play"
  | "dwell_time"

export type LpSection =
  | "hero"
  | "impacto_inicial"
  | "beneficios"
  | "galeria"
  | "recursos"
  | "precos"
  | "faq"
  | "final_cta"

export type LpCtaId =
  | "header_testar_gratis"
  | "mobile_header_testar_gratis"
  | "hero_ver_como_funciona"
  | "hero_saber_mais"
  | "beneficios_comecar_gratis"
  | "recursos_comecar_gratis"
  | "recursos_ver_beneficios"
  | "pricing_comecar_agora"
  | "finalcta_testar_gratis"
  | "finalcta_whatsapp"

export type ScrollBucket = 25 | 50 | 75 | 100
export type DwellTimeBucket = "0_10s" | "10_30s" | "30_60s" | "60_180s" | "180s_plus"
export type DeviceType = "mobile" | "tablet" | "desktop"
export type ScreenCategory = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type MetadataValue = string | number | boolean

export type TrackingPayload = {
  event_name: TrackingEventName
  page: "/"
  section?: LpSection | string
  cta_id?: LpCtaId | string
  scroll_bucket?: ScrollBucket
  dwell_time_bucket?: DwellTimeBucket
  referrer_host?: string
  device_type: DeviceType
  screen_category: ScreenCategory
  occurred_at: string
  metadata: Record<string, MetadataValue>
}

type BaseLpEventPayload = Omit<
  TrackingPayload,
  "event_name" | "section" | "cta_id" | "scroll_bucket" | "dwell_time_bucket" | "metadata"
>

export type LpPageViewPayload = BaseLpEventPayload & {
  event_name: "lp_page_view"
  section?: "hero"
  metadata: Record<string, MetadataValue>
}

export type LpSectionViewPayload = BaseLpEventPayload & {
  event_name: "section_view"
  section: LpSection
  metadata: Record<string, MetadataValue>
}

export type LpScrollDepthPayload = BaseLpEventPayload & {
  event_name: "scroll_depth"
  section: "hero"
  scroll_bucket: ScrollBucket
  metadata: Record<string, MetadataValue>
}

export type LpCtaClickPayload = BaseLpEventPayload & {
  event_name: "cta_click"
  section: LpSection
  cta_id: LpCtaId
  metadata: Record<string, MetadataValue> & {
    destination_section?: LpSection
    destination_path?: string
    destination_host?: string
  }
}

export type LpFaqOpenPayload = BaseLpEventPayload & {
  event_name: "faq_open"
  section: "faq"
  metadata: Record<string, MetadataValue> & {
    item_id?: string
  }
}

export type LpGalleryInteractionPayload = BaseLpEventPayload & {
  event_name: "gallery_interaction"
  section: "galeria"
  metadata: Record<string, MetadataValue> & {
    first_action?: string
  }
}

export type LpFeatureZoomPayload = BaseLpEventPayload & {
  event_name: "feature_zoom"
  section: "beneficios"
  metadata: Record<string, MetadataValue> & {
    feature_id: string
    feature_title?: string
    feature_index?: number
    image_src?: string
  }
}

export type LpVideoPlayPayload = BaseLpEventPayload & {
  event_name: "video_play"
  section: "hero"
  metadata: Record<string, MetadataValue> & {
    video_id: string
    video_provider?: string
  }
}

export type LpDwellTimePayload = BaseLpEventPayload & {
  event_name: "dwell_time"
  section: "hero"
  dwell_time_bucket: DwellTimeBucket
  metadata: Record<string, MetadataValue>
}

export type LpEmittedEventPayload =
  | LpPageViewPayload
  | LpSectionViewPayload
  | LpScrollDepthPayload
  | LpCtaClickPayload
  | LpFaqOpenPayload
  | LpGalleryInteractionPayload
  | LpFeatureZoomPayload
  | LpVideoPlayPayload
  | LpDwellTimePayload
