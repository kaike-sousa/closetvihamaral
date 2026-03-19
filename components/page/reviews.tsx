    "use client"

    import { useEffect, useState, useCallback } from "react"
    import useEmblaCarousel from "embla-carousel-react"

    const reviews = [
    { id: 1, name: "@ggilira", image: "/reviews/lira.jpeg", text: "Amei o produto! Qualidade incrível e entrega rápida." },
    { id: 2, name: "@mareesouzaa", image: "/reviews/maria.jpeg", text: "As peças são incríveis!! com uma qualidade absurda..." },
    { id: 3, name: "@giih_ciavarrette", image: "/reviews/gih.jpeg", text: "Chegou perfeito, exatamente como na foto." },
    { id: 4, name: "@m1llenaz", image: "/reviews/milena.jpeg", text: "A loja é simplesmente excelente!..." },
    { id: 5, name: "@sophialformaji", image: "/reviews/sophia.jpeg", text: "Simplesmente incrível..." },
    ]

    export function Reviews() {
    const [isMobile, setIsMobile] = useState(false)

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        containScroll: "trimSnaps",
    })

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
    if (!emblaApi) return

    setScrollSnaps(emblaApi.scrollSnapList())

    const onSelect: () => void = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)

    return () => {
        emblaApi.off("select", onSelect)
    }
    }, [emblaApi])

    const autoplay = useCallback(() => {
        if (!emblaApi) return
        const interval = setInterval(() => emblaApi.scrollNext(), 4000)
        return () => clearInterval(interval)
    }, [emblaApi])

    useEffect(() => {
        const stop = autoplay()
        return () => stop && stop()
    }, [autoplay])

    return (
        <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12 text-black">
            Quem compra, recomenda!
            </h2>

            <div ref={emblaRef} className="overflow-hidden pb-6">
            
            {/* 👇 TRANSIÇÃO AQUI */}
            <div className="flex transition-transform duration-500 ease-out">

                {reviews.map((review) => (
                <div
                    key={review.id}
                    className="flex-none px-4"
                    style={{
                    flex: isMobile ? "0 0 80%" : "0 0 25%",
                    }}
                >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">

                    <div className="w-full h-56 overflow-hidden">
                        <img
                        src={review.image}
                        alt={review.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-black">
                        {review.name}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed flex-1">
                        {review.text}
                        </p>
                    </div>

                    </div>
                </div>
                ))}

            </div>
            </div>

            <div className="flex gap-2 mt-6 justify-center">
            {scrollSnaps.map((_, index) => (
                <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === selectedIndex
                    ? "bg-black scale-125"
                    : "bg-gray-300"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                />
            ))}
            </div>

        </div>
        </section>
    )
    }