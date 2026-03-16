'use client'

import Link from 'next/link'
import { StoreHeader } from "@/components/store/header"
import { HeroSlider } from "@/components/page/hero-slider"
import { CategoryBubbles } from "@/components/page/category-bubbles"
import ProductGrid from "@/components/page/product-grid"
import { Reviews } from "@/components/page/reviews"
import { Newsletter } from "@/components/page/newsletter"
import InstagramFeed from "@/components/page/instagramfeed"
import InstagramBanner from "@/components/page/instagram-banner"
import { StoreFooter } from "@/components/store/footer"
import { InfoSection } from "@/components/page/info-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <StoreHeader />
      <main>
        <HeroSlider />
        <InfoSection />
        <CategoryBubbles />      
        <ProductGrid />
        <InstagramBanner /> 
        <Reviews />
        <InstagramFeed />
        <Newsletter />
      </main>
      <StoreFooter />
    </div>
  )
}