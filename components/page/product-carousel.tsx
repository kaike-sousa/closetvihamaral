    "use client"

    import React, { useCallback, useEffect, useState } from 'react'
    import useEmblaCarousel from 'embla-carousel-react'
    import Autoplay from 'embla-carousel-autoplay'
    import { ProductCard, ProductCardData } from "@/components/page/product-card"

    interface ProductCarouselProps {
    products: ProductCardData[]
    }

    export function ProductCarousel({ products }: ProductCarouselProps) {
    // 1. Configuração do Embla
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start', skipSnaps: false }, 
        [Autoplay({ delay: 4000, stopOnInteraction: false })] // Passa sozinho a cada 4s
    )

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    // 2. Lógica para as bolinhas (dots)
    const onInit = useCallback((emblaApi: any) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaApi: any) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return (
        <div className="relative">
        {/* Viewport do Carrossel */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
            {products.map((product) => (
                <div 
                key={product.id} 
                className="flex-[0_0_50%] min-w-0 pl-4 md:flex-[0_0_33.33%] lg:flex-[0_0_25%]"
                >
                <ProductCard product={product} />
                </div>
            ))}
            </div>
        </div>

        {/* Bolinhas de Paginação (Dots) */}
        <div className="flex justify-center gap-2 mt-6">
            {scrollSnaps.map((_, index) => (
            <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? 'bg-black w-4' : 'bg-gray-300'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
            />
            ))}
        </div>
        </div>
    )
    }