"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { GALLERY_IMAGES } from "@/lib/constants"

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const galleryImages = GALLERY_IMAGES

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="galeria" className="py-20 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">Veja o Converto em Ação</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interface intuitiva que sua equipe vai amar usar. Disponível em desktop, tablet e mobile.
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {galleryImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0 relative">
                  <div className="aspect-video relative bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center">
                    <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-contain p-8" priority={index === 0} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                    <p className="text-white/90 text-lg">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110">
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {galleryImages.map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-primary scale-125" : "bg-white/50 hover:bg-white/80"}`} />
              ))}
            </div>
          </div>

          <div className="hidden md:flex justify-center mt-8 space-x-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative overflow-hidden rounded-lg transition-all duration-300 ${index === currentSlide ? "ring-4 ring-primary scale-105" : "hover:scale-105 opacity-70 hover:opacity-100"}`}
              >
                <div className="w-24 h-16 bg-muted/20 flex items-center justify-center">
                  <Image src={image.src || "/placeholder.svg"} alt={image.alt} width={96} height={64} className="object-contain" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
