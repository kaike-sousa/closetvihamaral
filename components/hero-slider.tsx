"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const desktopSlides = [
  { id: 1, image: "/banners/banner1.png", link: "/colecao" },
  { id: 2, image: "/banners/banner2.png", link: "/promocoes" },
  { id: 3, image: "/banners/banner3.png", link: "/novidades" },
  { id: 4, image: "/banners/banner4.png", link: "/sobre" },
]

const mobileSlides = [
  { id: 1, image: "/banners/banner_and_1.png", link: "/colecao" },
  { id: 2, image: "/banners/banner_and_2.png", link: "/promocoes" },
  { id: 3, image: "/banners/banner_and_3.png", link: "/novidades" },
  { id: 4, image: "/banners/banner_and_4.png", link: "/sobre" },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const slides = isMobile ? mobileSlides : desktopSlides

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section
      id="home"
      className="relative h-[500px] md:h-[600px] overflow-hidden bg-muted"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={`Banner ${slide.id}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => router.push(slide.link)}
          />
        </div>
      ))}

      {/* Botões de navegação */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/80 hover:bg-white text-foreground shadow-md"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/80 hover:bg-white text-foreground shadow-md"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
