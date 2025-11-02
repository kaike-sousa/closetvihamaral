import { Header } from "@/components/header"
import { HeroSlider } from "@/components/hero-slider"
import { CategoryBubbles } from "@/components/category-bubbles"
import { ProductGrid } from "@/components/product-grid"
import { Reviews } from "@/components/reviews"
import { Newsletter } from "@/components/newsletter"
import InstagramBanner from "@/components/instagram-banner"
import { Footer } from "@/components/footer"
import { InfoSection } from "@/components/info-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSlider />
        <InfoSection /> 
        <CategoryBubbles />      
        <ProductGrid />
        <InstagramBanner /> 
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
