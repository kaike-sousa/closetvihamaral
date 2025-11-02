    "use client"

    import { useState, useEffect } from "react"

    export default function InstagramBanner() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth <= 1024)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const bannerImage = isMobile 
        ? "/banners/banner-instagram-mobile.png" 
        : "/banners/banner-instagram.png"

    return (
        <div className="w-full bg-white py-10">
        <div className="max-w-6xl mx-auto px-4">
            <a
            href="https://ig.me/m/closetvihamarall"
            target="_blank"
            rel="noopener noreferrer"
            >
            <img
                src={bannerImage}
                alt="Entre em contato pelo Direct do Instagram"
                className="w-full rounded-2xl shadow-lg object-cover hover:opacity-90 transition"
            />
            </a>
        </div>
        </div>
    )
    }
