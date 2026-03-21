'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { StoreHeader } from '@/components/store/header'
import { StoreFooter } from '@/components/store/footer'
import { createOrder } from '@/lib/services/pedidos' // Importando a função de salvar
import { useRouter } from 'next/navigation'

export default function CartPage() {
    const { cart, addToCart, removeFromCart, cartTotal, clearCart } = useCart()
    const router = useRouter()

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price)

    const handleFinishOrder = async () => {
        try {
            // 1. SALVA NO BANCO DE DADOS PRIMEIRO
            console.log("Registrando pedido no sistema...")
            await createOrder({
                total: cartTotal,
                items: cart
            })

            // 2. SE SALVOU, PREPARA A MENSAGEM DO WHATSAPP
            const phone = "5511954577689" 
            let message = `Olá! Gostaria de finalizar meu pedido no Closet Vih Amaral:\n\n`
            
            cart.forEach(item => {
                message += `• *${item.name}*\n`
                message += `  Cor: ${item.color} | Tam: ${item.size}\n`
                message += `  Qtd: ${item.quantity}x ${formatPrice(item.price)}\n\n`
            })

            message += `*Total do Pedido: ${formatPrice(cartTotal)}*`

            const encodedMessage = encodeURIComponent(message)
            
            // 3. ABRE O WHATSAPP
            window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank')

            // 4. LIMPA O CARRINHO E REDIRECIONA (OPCIONAL)
            if (clearCart) clearCart()
            router.push('/perfil')

        } catch (error: any) {
            // Se não estiver logado, a função createOrder lança um erro
            if (error.message === "Usuário não autenticado") {
                alert("Você precisa estar logado para finalizar a compra!")
                router.push('/login')
            } else {
                console.error("Erro ao processar pedido:", error)
                alert("Houve um erro ao salvar seu pedido. Tente novamente.")
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <StoreHeader />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">
                <h1 className="text-3xl font-serif font-bold mb-8">Sua Sacola</h1>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center flex flex-col items-center">
                        <ShoppingBag size={64} className="text-gray-200 mb-4" />
                        <p className="text-xl text-gray-500 mb-6">Seu carrinho está vazio.</p>
                        <Link 
                            href="/produtos" 
                            className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Ver Produtos
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* LISTA DE PRODUTOS */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={`${item.id}-${item.color}-${item.size}`} className="bg-white p-4 rounded-lg shadow-sm flex gap-4 items-center">
                                    <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded border">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            <button 
                                                onClick={() => removeFromCart(item.id, item.color, item.size)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4">Cor: {item.color} | Tamanho: {item.size}</p>
                                        
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center border rounded-md">
                                                <button 
                                                    onClick={() => removeFromCart(item.id, item.color, item.size)}
                                                    className="px-3 py-1 hover:bg-gray-100 border-r"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-4 font-medium">{item.quantity}</span>
                                                <button 
                                                    onClick={() => addToCart({...item, quantity: 1})}
                                                    className="px-3 py-1 hover:bg-gray-100 border-l"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <p className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            <Link href="/produtos" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mt-4">
                                <ArrowLeft size={16} /> Continuar Comprando
                            </Link>
                        </div>

                        {/* RESUMO */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-28">
                                <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>
                                
                                <div className="space-y-4 text-sm border-b pb-4 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span>{formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Frete</span>
                                        <span className="text-green-600 font-medium">Grátis</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xl font-bold mb-8">
                                    <span>Total</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>

                                <button 
                                    onClick={handleFinishOrder}
                                    className="w-full bg-[#25D366] text-white py-4 font-semibold hover:bg-[#20ba5a] transition-colors mb-4 flex items-center justify-center gap-2 rounded-md"
                                >
                                    <MessageCircle size={20} />
                                    Finalizar pelo WhatsApp
                                </button>

                                <div className="space-y-2">
                                    <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest leading-relaxed">
                                        Você será redirecionada para o nosso <br /> atendimento oficial.
                                    </p>
                                    <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                                        Compra 100% Segura
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </main>

            <StoreFooter />
        </div>
    )
}