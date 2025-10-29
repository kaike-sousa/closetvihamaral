"use client"

import { useState } from "react"
import { CreditCard, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"

export function CheckoutPage() {
  const { items, total } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("credit")

  if (items.length === 0) {
    return (
      <section className="py-16 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Carrinho vazio</h1>
          <p className="text-muted-foreground mb-8">Adicione produtos para finalizar a compra.</p>
          <Button asChild>
            <a href="/">Ir para a loja</a>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-4xl font-bold mb-8">Finalizar Compra</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Informações de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" placeholder="Seu nome" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input id="lastName" placeholder="Seu sobrenome" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" type="tel" placeholder="(11) 99999-9999" />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" placeholder="Rua, número" />
                  </div>
                  <div>
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" placeholder="00000-000" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" placeholder="Cidade" />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado</Label>
                    <Input id="state" placeholder="UF" />
                  </div>
                  <div>
                    <Label htmlFor="complement">Complemento</Label>
                    <Input id="complement" placeholder="Apto, bloco" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Forma de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex-1 cursor-pointer">
                      Cartão de Crédito
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex-1 cursor-pointer">
                      PIX (5% de desconto)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="boleto" id="boleto" />
                    <Label htmlFor="boleto" className="flex-1 cursor-pointer">
                      Boleto Bancário
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit" && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nome no Cartão</Label>
                      <Input id="cardName" placeholder="Nome como está no cartão" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Validade</Label>
                        <Input id="expiry" placeholder="MM/AA" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">R$ {total().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="font-medium">{total() >= 299 ? "Grátis" : "R$ 15,00"}</span>
                  </div>
                  {paymentMethod === "pix" && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto PIX (5%)</span>
                      <span>- R$ {(total() * 0.05).toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    R${" "}
                    {(total() + (total() >= 299 ? 0 : 15) - (paymentMethod === "pix" ? total() * 0.05 : 0)).toFixed(2)}
                  </span>
                </div>
                <Button className="w-full h-12 bg-primary hover:bg-primary/90">Confirmar Pedido</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
