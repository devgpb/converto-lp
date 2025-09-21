"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { GALLERY_IMAGES } from "@/lib/constants"

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const galleryImages = GALLERY_IMAGES

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000)
    return () => clearInterval(interval)
  }, [])

  // Keyboard support when lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false)
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isLightboxOpen])

  return (
    <section id="galeria" className="py-20 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Veja o Converto em Ação</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interface intuitiva que sua equipe vai amar usar. Disponível em desktop, tablet e mobile.
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
                        onClick={() => setIsLightboxOpen(true)}
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
                  const ActiveIcon = galleryImages[currentSlide]?.icon
                  return ActiveIcon ? <ActiveIcon className="h-8 w-8 text-emerald-500 mb-3" /> : null
                })()}
                <h3 className="text-2xl font-bold text-foreground mb-3">{galleryImages[currentSlide]?.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{galleryImages[currentSlide]?.description}</p>
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
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryImages[currentSlide]?.src || "/placeholder.svg"}
              alt={galleryImages[currentSlide]?.alt || "Imagem"}
              fill
              className="object-contain"
              priority
            />

            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
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

            {/* Caption (optional) */}
            {(galleryImages[currentSlide]?.title || galleryImages[currentSlide]?.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex items-center gap-3">
                  {(() => {
                    const ActiveIcon = galleryImages[currentSlide]?.icon
                    return ActiveIcon ? <ActiveIcon className="h-6 w-6 text-emerald-400" /> : null
                  })()}
                  {galleryImages[currentSlide]?.title && (
                    <h3 className="text-white text-xl font-semibold">{galleryImages[currentSlide]?.title}</h3>
                  )}
                </div>
                {galleryImages[currentSlide]?.description && (
                  <p className="text-white/90 mt-2">{galleryImages[currentSlide]?.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
