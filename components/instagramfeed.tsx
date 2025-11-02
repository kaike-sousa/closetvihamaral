    "use client"

    import { useEffect } from "react"

    export default function InstagramFeed() {
    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://elfsightcdn.com/platform.js"
        script.async = true
        document.body.appendChild(script)
    }, [])

    return (
        <section id="instagram" className="py-16 bg-white">
        <div className="container mx-auto px-4">
            {/* Título */}
            <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2 text-balance">
                Nosso Instagram 
            </h2>
            <p className="text-muted-foreground text-lg">
                Acompanhe o <span className="font-semibold">@closetvihamarall</span> e veja as novidades
            </p>
            </div>

            {/* Feed Elfsight */}
            <div className="flex justify-center">
            <div
                className="elfsight-app-8a94210b-841c-4779-8595-1691cac0baef"
                data-elfsight-app-lazy
            ></div>
            </div>
        </div>
        </section>
    )
    }
