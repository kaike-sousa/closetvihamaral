import { Header } from "@/components/header"
import { HeroSlider } from "@/components/hero-slider"
import { CategoryBubbles } from "@/components/category-bubbles"
import { ProductGrid } from "@/components/product-grid"
import { Reviews } from "@/components/reviews"
import { NewArrivals } from "@/components/new-arrivals"
import { Newsletter } from "@/components/newsletter"
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
        <Reviews />
        <NewArrivals />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
