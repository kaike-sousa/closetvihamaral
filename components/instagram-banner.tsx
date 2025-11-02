    // app/components/instagram-banner.tsx
    export default function InstagramBanner() {
    return (
        <div className="relative w-full max-w-6xl mx-auto my-10 px-4">
        <a
            href="https://www.instagram.com/direct/t/closetvihamarall/"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
            src="/banners/banner-instagram.png"
            alt="Entre em contato pelo Direct do Instagram"
            className="rounded-2xl shadow-lg w-full object-cover hover:opacity-90 transition"
            />
        </a>
        </div>
    )
    }
