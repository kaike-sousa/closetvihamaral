'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getUserOrders } from '@/lib/services/pedidos'
import { StoreHeader } from '@/components/store/header'
import { StoreFooter } from '@/components/store/footer'
import { Package, User, MapPin, LogOut, Loader2, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null)
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function loadData() {
            // 1. Pega o usuário da autenticação
            const { data: { user: authUser } } = await supabase.auth.getUser()

            if (!authUser) {
                router.push('/login')
                return
            }

            // 2. Busca os dados detalhados na sua tabela 'users'
            const { data: profile } = await supabase
                .from('users')
                .select('*')
                .eq('id', authUser.id)
                .single()

            if (profile) {
                setUser(profile)
                // 3. Busca os pedidos deste cliente usando o ID (conforme sua tabela 'pedidos')
                const data = await getUserOrders(authUser.id)
                setOrders(data)
            }
            setLoading(false)
        }

        loadData()
    }, [router])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/50">
            <StoreHeader />

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                
                    {/* CARTÃO DO PERFIL */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="h-20 w-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-serif mb-3 uppercase">
                                    {user?.nome?.[0]}{user?.sobrenome?.[0]}
                                </div>
                                <h2 className="font-bold text-xl">{user?.nome} {user?.sobrenome}</h2>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>

                            <div className="space-y-4 border-t pt-6">
                                <div className="flex items-start gap-3">
                                    <User size={18} className="text-gray-400 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-semibold">CPF</p>
                                        <p className="text-gray-600">{user?.cpf || 'Não cadastrado'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin size={18} className="text-gray-400 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-semibold">Endereço</p>
                                        <p className="text-gray-600">{user?.endereco || 'Não cadastrado'}</p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleLogout}
                                className="w-full mt-8 flex items-center justify-center gap-2 text-gray-400 hover:text-red-500 text-sm font-medium transition-colors"
                            >
                                <LogOut size={16} /> Sair da conta
                            </button>
                        </div>
                    </div>

                    {/* LISTA DE PEDIDOS */}
                    <div className="lg:col-span-3">
                        <h1 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                            <Package size={24} /> Meus Pedidos
                        </h1>

                        {orders.length === 0 ? (
                            <div className="bg-white p-16 rounded-2xl text-center border border-dashed border-gray-200">
                                <ShoppingBag className="mx-auto text-gray-200 mb-4" size={48} />
                                <p className="text-gray-500 mb-6">Você ainda não fez nenhum pedido.</p>
                                <Link href="/produtos" className="bg-black text-white px-8 py-3 rounded-full text-sm">
                                    Ir para a loja
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-hover hover:border-black/10">
                                        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Número do Pedido</span>
                                                <p className="font-mono text-sm uppercase tracking-tighter">#{order.id.slice(0, 8)}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Data da Compra</span>
                                                <p className="text-sm">{new Date(order.created_at).toLocaleDateString('pt-BR')}</p>
                                            </div>
                                            <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                                                order.status === 'entregue' ? 'bg-green-100 text-green-700' : 'bg-black text-white'
                                            }`}>
                                                {order.status}
                                            </div>
                                        </div>

                                        <div className="py-4 border-y border-gray-50 space-y-2">
                                            {/* Ajustado para usar as colunas exatas da sua tabela pedido_itens */}
                                            {order.pedido_itens?.map((item: any, i: number) => (
                                                <div key={i} className="flex justify-between text-sm text-gray-600">
                                                    <span>
                                                        {item.quantidade}x {item.produto_nome} 
                                                        <span className="text-gray-400 ml-2">({item.tamanho}, {item.cor})</span>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 flex justify-between items-center">
                                            <p className="font-bold text-lg">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total)}
                                            </p>
                                            <Link 
                                                href={`https://wa.me/5511959887004?text=Olá, gostaria de informações sobre o meu pedido #${order.id.slice(0, 8)}`}
                                                target="_blank"
                                                className="text-[10px] font-bold underline uppercase tracking-widest hover:text-green-600 transition-colors"
                                            >
                                                Preciso de ajuda
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </main>

            <StoreFooter />
        </div>
    )
}