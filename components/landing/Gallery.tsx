"use client"

import { useCallback, useEffect, useState, type PointerEvent, type WheelEvent } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from "lucide-react"
import { GALLERY_IMAGES } from "@/lib/constants"

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.35

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const panLimit = (scale: number) => (scale - 1) * 220

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const galleryImages = GALLERY_IMAGES
  const totalSlides = galleryImages.length
  const activeImage = galleryImages[currentSlide]

  const nextSlide = useCallback(() => {
    if (!totalSlides) return
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    if (!totalSlides) return
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const resetZoom = useCallback(() => {
    setZoomLevel(MIN_ZOOM)
    setPan({ x: 0, y: 0 })
    setIsPanning(false)
  }, [])

  const applyZoom = useCallback((nextZoom: number) => {
    const boundedZoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM)
    setZoomLevel(boundedZoom)
    if (boundedZoom === MIN_ZOOM) {
      setPan({ x: 0, y: 0 })
    } else {
      const limit = panLimit(boundedZoom)
      setPan((prev) => ({
        x: clamp(prev.x, -limit, limit),
        y: clamp(prev.y, -limit, limit),
      }))
    }
  }, [])

  const zoomIn = useCallback(() => applyZoom(zoomLevel + ZOOM_STEP), [applyZoom, zoomLevel])
  const zoomOut = useCallback(() => applyZoom(zoomLevel - ZOOM_STEP), [applyZoom, zoomLevel])

  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true)
    resetZoom()
  }, [resetZoom])

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false)
    resetZoom()
  }, [resetZoom])

  const handleWheelZoom = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
    applyZoom(zoomLevel + delta)
  }

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (zoomLevel <= MIN_ZOOM) return
    setIsPanning(true)
    setDragOffset({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isPanning || zoomLevel <= MIN_ZOOM) return
    const limit = panLimit(zoomLevel)
    setPan({
      x: clamp(e.clientX - dragOffset.x, -limit, limit),
      y: clamp(e.clientY - dragOffset.y, -limit, limit),
    })
  }

  const handlePointerUp = () => setIsPanning(false)

  const handleDoubleClick = () => {
    if (zoomLevel > MIN_ZOOM) {
      resetZoom()
      return
    }
    applyZoom(2)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000)
    return () => clearInterval(interval)
  }, [nextSlide])

  // Keyboard support when lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "+") zoomIn()
      if (e.key === "-") zoomOut()
      if (e.key === "0") resetZoom()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isLightboxOpen, closeLightbox, nextSlide, prevSlide, resetZoom, zoomIn, zoomOut])

  useEffect(() => {
    if (!isLightboxOpen) return
    resetZoom()
  }, [currentSlide, isLightboxOpen, resetZoom])

  useEffect(() => {
    if (!isLightboxOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isLightboxOpen])

  if (!totalSlides) return null

  return (
    <section id="galeria" className="py-20 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Veja o Converto em Ação</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conversas viram processo: etapas claras, alertas de retorno e carteira visível. Tudo no canal que você já usa.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="md:grid md:grid-cols-3 md:gap-6 items-stretch">
            {/* Image / Carousel with animated green glow */}
            <div className="md:col-span-2 relative">
              <div className="absolute -inset-4 md:-inset-6 -z-10 rounded-3xl bg-emerald-400/30 blur-3xl animate-pulse" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-primary/5 to-primary/10">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {galleryImages.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                      <div
                        className="aspect-video relative bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center cursor-zoom-in"
                        onClick={openLightbox}
                        role="button"
                        aria-label="Abrir imagem em tela cheia"
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-contain"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Controls over image */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? "bg-primary scale-125" : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-1 mt-6 md:mt-0">
              <div className="bg-white md:bg-transparent rounded-xl md:rounded-none p-6 md:p-0 shadow-sm md:shadow-none">
                {(() => {
                  const ActiveIcon = activeImage?.icon
                  return ActiveIcon ? <ActiveIcon className="h-8 w-8 text-emerald-500 mb-3" /> : null
                })()}
                <h3 className="text-2xl font-bold text-foreground mb-3">{activeImage?.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{activeImage?.description}</p>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="hidden md:flex justify-center mt-8 space-x-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                  index === currentSlide ? "ring-4 ring-primary scale-105" : "hover:scale-105 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="w-24 h-16 bg-muted/20 flex items-center justify-center">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={96}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Lightbox Fullscreen */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-6xl h-[72vh] sm:h-[84vh]" onClick={(e) => e.stopPropagation()}>
            <div
              className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black/30"
              onWheel={handleWheelZoom}
              onDoubleClick={handleDoubleClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
              style={{
                cursor: zoomLevel > MIN_ZOOM ? (isPanning ? "grabbing" : "grab") : "zoom-in",
                touchAction: zoomLevel > MIN_ZOOM ? "none" : "manipulation",
              }}
            >
              <Image
                src={activeImage?.src || "/placeholder.svg"}
                alt={activeImage?.alt || "Imagem"}
                fill
                className="object-contain transition-transform duration-200 ease-out"
                style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})` }}
                priority
              />
            </div>

            <div className="absolute top-4 left-4 bg-black/55 text-white/90 text-xs sm:text-sm px-3 py-1.5 rounded-full">
              Zoom: {Math.round(zoomLevel * 100)}%
            </div>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation inside lightbox */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevSlide()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextSlide()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all"
              aria-label="Próxima"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-5 right-4 flex items-center gap-2">
              <button
                onClick={zoomOut}
                className="bg-white/90 hover:bg-white text-primary rounded-full p-2.5 shadow-lg transition-all disabled:opacity-50"
                aria-label="Diminuir zoom"
                disabled={zoomLevel <= MIN_ZOOM}
              >
                <Minus className="h-5 w-5" />
              </button>
              <button
                onClick={resetZoom}
                className="bg-white/90 hover:bg-white text-primary rounded-full p-2.5 shadow-lg transition-all disabled:opacity-50"
                aria-label="Resetar zoom"
                disabled={zoomLevel === MIN_ZOOM && pan.x === 0 && pan.y === 0}
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <button
                onClick={zoomIn}
                className="bg-white/90 hover:bg-white text-primary rounded-full p-2.5 shadow-lg transition-all disabled:opacity-50"
                aria-label="Aumentar zoom"
                disabled={zoomLevel >= MAX_ZOOM}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {/* Caption (optional) */}
            {(activeImage?.title || activeImage?.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex items-center gap-3">
                  {(() => {
                    const ActiveIcon = activeImage?.icon
                    return ActiveIcon ? <ActiveIcon className="h-6 w-6 text-emerald-400" /> : null
                  })()}
                  {activeImage?.title && <h3 className="text-white text-xl font-semibold">{activeImage?.title}</h3>}
                </div>
                {activeImage?.description && <p className="text-white/90 mt-2">{activeImage?.description}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
