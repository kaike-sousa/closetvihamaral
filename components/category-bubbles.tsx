    "use client"

    import Image from "next/image"
    import useEmblaCarousel from "embla-carousel-react"
    import { useEffect, useState, useCallback } from "react"

    const categories = [
    { name: "VER TUDO", image: "/categoryas/category-conjuntos.jpg" },
    { name: "Conjuntos", image: "/categoryas/category-conjuntos.jpg" },
    { name: "Saias", image: "/categoryas/category-saias.jpg" },
    { name: "Vestidos", image: "/categoryas/category-vestidos.jpg" },
    { name: "Croppeds", image: "/categoryas/category-croppeds.jpg" },
    { name: "Bodys", image: "/categoryas/category-bodys.jpg" },
    { name: "Calças", image: "/categoryas/category-calcas.jpg" },
    ]

    export function CategoryBubbles() {
    const [isMobile, setIsMobile] = useState(false)
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
        containScroll: "trimSnaps",
    })

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [numGroups, setNumGroups] = useState(2) // default desktop: 2 bolinhas

    // Detecta tamanho da tela
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Ajusta número de bolinhas por tamanho de tela
    useEffect(() => {
        setNumGroups(isMobile ? 4 : 2)
    }, [isMobile])

    // Atualiza slide selecionado
    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => {
        const slidesPerGroup = Math.ceil(categories.length / numGroups)
        const index = Math.floor(emblaApi.selectedScrollSnap() / slidesPerGroup)
        setSelectedIndex(index)
        }
        emblaApi.on("select", onSelect)
        return () => emblaApi.off("select", onSelect)
    }, [emblaApi, numGroups])

    // Autoplay
    const autoplay = useCallback(() => {
        if (!emblaApi) return
        const interval = setInterval(() => emblaApi.scrollNext(), 2500)
        return () => clearInterval(interval)
    }, [emblaApi])

    useEffect(() => {
        const stop = autoplay()
        return () => stop && stop()
    }, [autoplay])

    // Scroll para grupo ao clicar na bolinha
    const scrollToGroup = (groupIndex: number) => {
        if (!emblaApi) return
        const slidesPerGroup = Math.ceil(categories.length / numGroups)
        emblaApi.scrollTo(groupIndex * slidesPerGroup)
    }

    return (
        <section className="w-full py-6 flex flex-col items-center bg-white">
        {/* Carrossel de categorias */}
        <div className="overflow-hidden w-full max-w-6xl" ref={emblaRef}>
            <div className="flex gap-4">
            {categories.map((cat) => (
                <div
                key={cat.name}
                className="flex-none flex flex-col items-center cursor-pointer group"
                style={{
                    flexBasis: isMobile ? "33.3333%" : "16.6667%", // 3 por vez mobile, 6 desktop
                }}
                >
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-black transition bg-white shadow-sm">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                </div>
                <p className="mt-2 text-sm font-medium text-center">{cat.name}</p>
                </div>
            ))}
            </div>
        </div>

        {/* Bolinhas de navegação por grupo */}
        <div className="flex gap-2 mt-4">
            {Array.from({ length: numGroups }).map((_, index) => (
            <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                index === selectedIndex ? "bg-black" : "bg-gray-300"
                }`}
                onClick={() => scrollToGroup(index)}
            />
            ))}
        </div>
        </section>
    )
    }
