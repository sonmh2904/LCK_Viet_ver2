"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/banner/banner-8.jpg",
  },
  {
    id: 2,
    image: "/banner/banner-13.png",
  },
  {
    id: 3,
    image: "/banner/banner-9.jpg",
  },
]

const AUTOPLAY_DELAY = 7000

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const goToSlide = (index: number) => {
    setCurrentSlide((index + slides.length) % slides.length)
  }

  const handleNext = () => {
    goToSlide(currentSlide + 1)
  }

  const handlePrev = () => {
    goToSlide(currentSlide - 1)
  }

  useEffect(() => {
    if (isHovered) return

    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, AUTOPLAY_DELAY)

    return () => window.clearInterval(timer)
  }, [isHovered])

  return (
    <section
      className="relative w-full overflow-hidden -mt-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[8/3] min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image 
              src={slide.image} 
              alt={`LCK Việt banner ${index + 1}`} 
              fill 
              className="object-contain object-center" 
              priority={index === 0} 
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Banner trước"
          className="h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/30 hover:border-white/80 flex"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 rounded-full border border-white/40 bg-black/20 px-2 py-1 backdrop-blur-sm">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Chuyển đến banner ${index + 1}`}
              className={`h-1.5 w-3 rounded-full transition ${
                currentSlide === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Banner tiếp theo"
          className="h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/30 hover:border-white/80 flex"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}