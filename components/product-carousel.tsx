    // product-carousel.tsx
    "use client"

    import { useEffect, useState, useCallback } from "react"
    import useEmblaCarousel from "embla-carousel-react"
    import { ProductCard, Product } from "./product-card"

    interface ProductCarouselProps {
    products: Product[]
    }

    export function ProductCarousel({ products }: ProductCarouselProps) {
    const [isMobile, setIsMobile] = useState(false)
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
        containScroll: "trimSnaps",
    })

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    // Detecta tamanho da tela
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Configura as bolinhas
    useEffect(() => {
        if (!emblaApi) return
        setScrollSnaps(emblaApi.scrollSnapList())
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
        emblaApi.on("select", onSelect)
        return () => {
        emblaApi.off("select", onSelect)
        }
    }, [emblaApi])

    // Autoplay
    const autoplay = useCallback(() => {
        if (!emblaApi) return
        const interval = setInterval(() => emblaApi.scrollNext(), 3000)
        return () => clearInterval(interval)
    }, [emblaApi])

    useEffect(() => {
        const stop = autoplay()
        return () => stop && stop()
    }, [autoplay])

    return (
        <section className="w-full py-6 flex flex-col items-center">
        <div className="overflow-hidden w-full max-w-6xl" ref={emblaRef}>
            <div className="flex gap-4">
            {products.map((product) => (
                <div
                key={product.id}
                className="flex-none"
                style={{ flexBasis: isMobile ? "50%" : "25%" }} // 2 por vez mobile, 4 desktop
                >
                <ProductCard product={product} />
                </div>
            ))}
            </div>
        </div>

        {/* BOLINHAS */}
        <div className="flex gap-2 mt-4">
            {scrollSnaps.map((_, index) => (
            <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                index === selectedIndex ? "bg-black" : "bg-gray-300"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
            />
            ))}
        </div>
        </section>
    )
    }
