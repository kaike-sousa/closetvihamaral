    'use client'

    import React, { createContext, useContext, useState, useEffect } from 'react'

    export interface CartItem {
    id: string
    name: string
    price: number
    image: string
    color: string
    size: string
    quantity: number
    }

    interface CartContextType {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: string, color: string, size: string) => void
    clearCart: () => void
    cartTotal: number
    }

    const CartContext = createContext<CartContextType | undefined>(undefined)

    export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])

    // Carregar do localStorage ao iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem('closet-cart')
        if (savedCart) setCart(JSON.parse(savedCart))
    }, [])

    // Salvar no localStorage sempre que o carrinho mudar
    useEffect(() => {
        localStorage.setItem('closet-cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (newItem: CartItem) => {
        setCart(prevCart => {
        // Verifica se o mesmo produto (mesma cor e tamanho) já está no carrinho
        const existingItemIndex = prevCart.findIndex(
            item => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size
        )

        if (existingItemIndex > -1) {
            const updatedCart = [...prevCart]
            updatedCart[existingItemIndex].quantity += newItem.quantity
            return updatedCart
        }
        return [...prevCart, newItem]
        })
    }

    const removeFromCart = (id: string, color: string, size: string) => {
    setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === id && item.color === color && item.size === size);

        if (existingItem && existingItem.quantity > 1) {
        // Se tiver mais de 1, diminui a quantidade
        return prevCart.map(item =>
            item.id === id && item.color === color && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        }
        // Se tiver apenas 1, remove do carrinho
        return prevCart.filter(item => !(item.id === id && item.color === color && item.size === size));
    });
    };

    const clearCart = () => setCart([])

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
        {children}
        </CartContext.Provider>
    )
    }

    export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart deve ser usado dentro de um CartProvider')
    return context
    }