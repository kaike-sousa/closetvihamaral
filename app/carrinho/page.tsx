import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartPage } from "@/components/cart-page"

export default function Cart() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CartPage />
      </main>
      <Footer />
    </div>
  )
}
