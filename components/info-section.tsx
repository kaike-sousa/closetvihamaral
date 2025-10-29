    "use client"

    import { useEffect, useState, useCallback } from "react"
    import useEmblaCarousel from "embla-carousel-react"

    const infos = [
    {
        icon: "🎁",
        title: "PRIMEIRA COMPRA?",
        description: 'Use o cupom "MARCONE10" para 10% OFF',
    },
    {
        icon: "🚚",
        title: "FRETE GRÁTIS",
        description: "Acima de R$350",
    },
    {
        icon: "💳",
        title: "PAGAMENTO POR PIX",
        description: "Rápido, seguro e sem taxas",
    },
    ]

    export function InfoSection() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        slidesToScroll: 1,
    })

    // autoplay contínuo no mobile
    const autoplay = useCallback(() => {
        if (!emblaApi) return
        const interval = setInterval(() => emblaApi.scrollNext(), 2500)
        return () => clearInterval(interval)
    }, [emblaApi])

    useEffect(() => {
        const stop = autoplay()
        return () => stop && stop()
    }, [emblaApi, autoplay])

    return (
        <section className="bg-white py-10 px-4">
        {isMobile ? (
            <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
                {infos.map((info, index) => (
                <div
                    key={index}
                    className="flex-none w-full flex flex-col items-center space-y-2 text-center"
                >
                    <span className="text-4xl">{info.icon}</span>
                    <h3 className="font-bold text-lg md:text-xl">{info.title}</h3>
                    <p className="text-gray-700">{info.description}</p>
                </div>
                ))}
            </div>
            </div>
        ) : (
            <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-center">
            {infos.map((info, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                <span className="text-4xl">{info.icon}</span>
                <h3 className="font-bold text-lg md:text-xl">{info.title}</h3>
                <p className="text-gray-700">{info.description}</p>
                </div>
            ))}
            </div>
        )}
        </section>
    )
    }
