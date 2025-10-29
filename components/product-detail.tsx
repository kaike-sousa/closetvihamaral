"use client"

import { useState } from "react"
import { ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCart } from "@/hooks/use-cart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  sizes: string[]
  colors: string[]
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product)
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase mb-2">{product.category}</p>
              <h1 className="font-serif text-4xl font-bold mb-4 text-balance">{product.name}</h1>
              <p className="text-3xl font-bold text-primary">R$ {product.price.toFixed(2)}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Tamanho</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex gap-2">
                {product.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex items-center justify-center w-12 h-12 border-2 border-border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 hover:border-primary/50 transition-colors"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Color Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Cor</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-2">
                {product.colors.map((color) => (
                  <div key={color}>
                    <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                    <Label
                      htmlFor={`color-${color}`}
                      className="flex items-center justify-center px-4 h-12 border-2 border-border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 hover:border-primary/50 transition-colors"
                    >
                      {color}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1 h-12 bg-primary hover:bg-primary/90" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Frete Grátis</p>
                  <p className="text-sm text-muted-foreground">Para compras acima de R$ 299</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Troca Grátis</p>
                  <p className="text-sm text-muted-foreground">Até 30 dias após a compra</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Compra Segura</p>
                  <p className="text-sm text-muted-foreground">Seus dados protegidos</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">
                  Descrição
                </TabsTrigger>
                <TabsTrigger value="care" className="flex-1">
                  Cuidados
                </TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">
                  Entrega
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 text-muted-foreground">
                <p className="leading-relaxed">{product.description}</p>
                <ul className="mt-4 space-y-2">
                  <li>• Tecido de alta qualidade</li>
                  <li>• Modelagem exclusiva</li>
                  <li>• Acabamento impecável</li>
                </ul>
              </TabsContent>
              <TabsContent value="care" className="mt-4 text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Lavar à mão ou em ciclo delicado</li>
                  <li>• Não usar alvejante</li>
                  <li>• Secar à sombra</li>
                  <li>• Passar em temperatura baixa</li>
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Entregamos para todo o Brasil. O prazo de entrega varia de acordo com a região:
                </p>
                <ul className="mt-4 space-y-2">
                  <li>• Sudeste: 3-5 dias úteis</li>
                  <li>• Sul: 5-7 dias úteis</li>
                  <li>• Demais regiões: 7-10 dias úteis</li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
