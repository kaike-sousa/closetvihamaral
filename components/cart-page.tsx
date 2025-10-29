"use client"

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()

  if (items.length === 0) {
    return (
      <section className="py-16 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-serif text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-8">Adicione produtos ao seu carrinho para continuar comprando.</p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href="/">Continuar Comprando</a>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-4xl font-bold mb-8">Carrinho de Compras</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-primary font-bold">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-serif text-2xl font-bold">Resumo do Pedido</h2>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">R$ {total().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="font-medium">{total() >= 299 ? "Grátis" : "R$ 15,00"}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ {(total() + (total() >= 299 ? 0 : 15)).toFixed(2)}</span>
                </div>
                <Button className="w-full h-12 bg-primary hover:bg-primary/90" asChild>
                  <a href="/checkout">Finalizar Compra</a>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href="/">Continuar Comprando</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
