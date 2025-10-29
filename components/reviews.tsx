    "use client"

    import React, { useCallback } from "react"
    import useEmblaCarousel from "embla-carousel-react"

    const reviews = [
    {
        id: 1,
        name: "Ana Souza",
        image: "/reviews/review1.jpg",
        text: "Amei o produto! Qualidade incrível e entrega rápida."
    },
    {
        id: 2,
        name: "Maria Oliveira",
        image: "/reviews/review2.jpg",
        text: "Super recomendo! Atendimento excelente."
    },
    {
        id: 3,
        name: "Juliana Lima",
        image: "/reviews/review3.jpg",
        text: "Chegou perfeito, exatamente como na foto."
    },
    {
        id: 4,
        name: "Camila Santos",
        image: "/reviews/review4.jpg",
        text: "Produtos lindos, vou comprar novamente!"
    },
    {
        id: 5,
        name: "Fernanda Rocha",
        image: "/reviews/review5.jpg",
        text: "Entrega rápida e ótima qualidade. Adorei!"
    },
    ]

    export function Reviews() {
    const [viewportRef, embla] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false
    })

    const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla])
    const scrollNext = useCallback(() => embla?.scrollNext(), [embla])

    return (
        <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-8 text-black">
            Avaliações das Clientes
            </h2>

            <div className="relative">
            <div ref={viewportRef} className="overflow-hidden">
                <div className="flex gap-6">
                {reviews.map((review) => (
                    <div
                    key={review.id}
                    className="min-w-[250px] md:min-w-[300px] bg-white p-6 rounded-2xl shadow-lg flex-shrink-0"
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

            {/* Botões */}
            <button
                onClick={scrollPrev}
                className="absolute top-1/2 left-0 -translate-y-1/2 p-2 rounded-full shadow-lg transition"
                style={{ backgroundColor: "#000", color: "#fff" }}
            >
                ‹
            </button>
            <button
                onClick={scrollNext}
                className="absolute top-1/2 right-0 -translate-y-1/2 p-2 rounded-full shadow-lg transition"
                style={{ backgroundColor: "#000", color: "#fff" }}
            >
                ›
            </button>
            </div>
        </div>
        </section>
    )
    }
