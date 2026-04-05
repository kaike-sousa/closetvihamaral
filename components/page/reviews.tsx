    "use client"

    import { useEffect, useState, useCallback } from "react"
    import useEmblaCarousel from "embla-carousel-react"
    import Autoplay from "embla-carousel-autoplay"

    const reviews = [
    { id: 1, name: "@ggilira", image: "/reviews/lira.jpeg", text: "Amei o produto! Qualidade incrível e entrega rápida." },
    { id: 2, name: "@mareesouzaa", image: "/reviews/maria.jpeg", text: "As peças são incríveis!! com uma qualidade absurda..." },
    { id: 3, name: "@giih_ciavarrette", image: "/reviews/gih.jpeg", text: "Chegou perfeito, exatamente como na foto." },
    { id: 4, name: "@m1llenaz", image: "/reviews/milena.jpeg", text: "A loja é simplesmente excelente!..." },
    { id: 5, name: "@sophialformaji", image: "/reviews/sophia.jpeg", text: "Simplesmente incrível..." },
    { id: 6, name: "@madu.lice", image: "/reviews/madulice.jpeg", text: "Além de eu ter amado as peças, amei a nova embalagem!" },
    { id: 7, name: "@helotenorioo", image: "/reviews/teonorio.jpeg", text: "As peças são sempre lindas e de ótima qualidade." }
    ]

    export function Reviews() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
        loop: true,
        align: "center", // ✅ CENTRALIZA OS CARDS (especialmente no mobile)
        containScroll: false, // Desativado para permitir a centralização livre no loop
        },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    )

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        const index = emblaApi.selectedScrollSnap()
        setSelectedIndex(index % 4) // Mantém as 4 bolinhas sincronizadas
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        setScrollSnaps(emblaApi.scrollSnapList())
        
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", () => {
        setScrollSnaps(emblaApi.scrollSnapList())
        onSelect()
        })

        return () => {
        emblaApi.off("select", onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
            
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12 text-black">
            Quem compra, recomenda!
            </h2>

            {/* p-4 e -m-4 evitam o corte da sombra */}
            <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing p-4 -m-4">
            
            <div className="flex -ml-4">
                {reviews.map((review) => (
                <div
                    key={review.id}
                    className="flex-none pl-4 min-w-0 basis-[75%] md:basis-1/3 lg:basis-1/4"
                    /* basis-[75%] no mobile deixa o card centralizado com 
                    pedaços dos cards vizinhos aparecendo nas laterais 
                    */
                >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 mb-2">
                    
                    <div className="w-full h-64 overflow-hidden">
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

            {/* 4 Bolinhas Fixas */}
            <div className="flex gap-2 mt-12 justify-center">
            {scrollSnaps.slice(0, 4).map((_, index) => (
                <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                    ? "bg-black w-8" 
                    : "bg-gray-300 w-2"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Página ${index + 1}`}
                />
            ))}
            </div>

        </div>
        </section>
    )
    }