    "use client"

    import { useEffect, useState, useCallback } from "react"
    import useEmblaCarousel from "embla-carousel-react"

    const reviews = [
    { id: 1, name: "Ana Souza", image: "/reviews/review1.jpg", text: "Amei o produto! Qualidade incrível e entrega rápida." },
    { id: 2, name: "Maria Oliveira", image: "/reviews/review2.jpg", text: "Super recomendo! Atendimento excelente." },
    { id: 3, name: "Juliana Lima", image: "/reviews/review3.jpg", text: "Chegou perfeito, exatamente como na foto." },
    { id: 4, name: "Camila Santos", image: "/reviews/review4.jpg", text: "Produtos lindos, vou comprar novamente!" },
    { id: 5, name: "Fernanda Rocha", image: "/reviews/review5.jpg", text: "Entrega rápida e ótima qualidade. Adorei!" },
    ]

    export function Reviews() {
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

    // Atualiza bolinhas
    useEffect(() => {
        if (!emblaApi) return
        setScrollSnaps(emblaApi.scrollSnapList())
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
        emblaApi.on("select", onSelect)
        return () => emblaApi.off("select", onSelect)
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
        <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-8 text-black">
            Quem compra, recomenda!
            </h2>

            <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
                {reviews.map((review) => (
                <div
                    key={review.id}
                    className="flex-none bg-white p-6 rounded-2xl shadow-lg flex-shrink-0"
                    style={{
                    flexBasis: isMobile ? "50%" : "25%", // 2 por vez mobile, 4 desktop
                    }}
                >
                    <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover mb-4"
                    />
                    <h3 className="font-serif font-semibold text-lg md:text-xl mb-2 text-black">
                    {review.name}
                    </h3>
                    <p className="text-black text-sm md:text-base">{review.text}</p>
                </div>
                ))}
            </div>
            </div>

            {/* Bolinhas de navegação */}
            <div className="flex gap-2 mt-4 justify-center">
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
        </div>
        </section>
    )
    }
