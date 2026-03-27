    'use client'

    import { useState, useMemo } from 'react'
    import { StoreHeader } from '@/components/store/header'
    import { StoreFooter } from '@/components/store/footer'
    import { 
    Plus, 
    Minus, 
    HelpCircle, 
    ArrowLeft, 
    MessageSquare, 
    CreditCard, 
    Truck, 
    RefreshCw,
    Search,
    X,
    ShieldCheck
    } from 'lucide-react'
    import Link from 'next/link'

    const faqs = [
    {
        category: "Pedidos e Entrega",
        icon: Truck,
        questions: [
        {
            q: "Qual o prazo de entrega?",
            a: "Nosso prazo total é: Preparação (2 a 8 dias úteis) + o tempo de transporte (Correios ou Motoboy). Você receberá notificações em cada etapa."
        },
        {
            q: "Vocês entregam via Motoboy?",
            a: "Sim! Para São Paulo e região. O valor é calculado pelo app (Uber/99) e deve ser agendado via WhatsApp após os dias de preparação."
        },
        {
            q: "Posso retirar meu pedido?",
            a: "Sim, a retirada é gratuita. Após o prazo de preparação (2-8 dias úteis), agendamos o melhor horário para você buscar em nosso ponto de retirada."
        }
        ]
    },
    {
        category: "Pagamentos",
        icon: CreditCard,
        questions: [
        {
            q: "Quais as formas de pagamento?",
            a: "Aceitamos pagamentos via PIX (com aprovação imediata) e dinheiro em espécie (apenas para retiradas presenciais)."
        },
        {
            q: "Como envio o comprovante do PIX?",
            a: "O sistema geralmente identifica automático, mas você pode enviar para nosso WhatsApp para agilizar a liberação do seu pedido."
        }
        ]
    },
    {
        category: "Produtos e Tamanhos",
        icon: ShieldCheck,
        questions: [
        {
            q: "As peças possuem forro?",
            a: "A maioria das nossas peças claras possuem forro duplo ou tecido de alta gramatura para garantir que não haja transparência."
        },
        {
            q: "Como saber meu tamanho ideal?",
            a: "Em cada produto temos uma tabela de medidas. Na dúvida, recomendamos conferir nosso Guia de Tamanhos no rodapé ou nos chamar no chat."
        }
        ]
    },
    {
        category: "Trocas e Devoluções",
        icon: RefreshCw,
        questions: [
        {
            q: "Como solicito uma troca?",
            a: "A troca deve ser comunicada em até 24h após o recebimento (conforme rastreio) apenas para defeitos de fabricação. Envie fotos/vídeos para nosso suporte."
        },
        {
            q: "Peças em promoção têm troca?",
            a: "Não realizamos trocas de itens da categoria 'SALE', queimas de estoque ou peças de cores claras (Branco/Off-white/Bege)."
        }
        ]
    }
    ]

    export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const toggleFAQ = (id: string) => {
        setOpenIndex(openIndex === id ? null : id)
    }

    // Filtro de busca em tempo real
    const filteredFaqs = useMemo(() => {
        if (!searchQuery) return faqs
        return faqs.map(cat => ({
        ...cat,
        questions: cat.questions.filter(
            q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
        })).filter(cat => cat.questions.length > 0)
    }, [searchQuery])

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans antialiased">
        <StoreHeader />

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 md:py-20">
            
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#b5518f] transition-colors mb-10 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Voltar para a loja
            </Link>

            {/* Header Dinâmico */}
            <div className="text-center space-y-6 mb-12">
            <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tighter">
                Dúvidas Frequentes
                </h1>
                <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
                Pesquise sua dúvida abaixo ou navegue pelas categorias.
                </p>
            </div>

            {/* Barra de Busca */}
            <div className="relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
                </div>
                <input 
                type="text"
                placeholder="Ex: prazo, troca, motoboy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-[#b5518f] transition-all text-sm"
                />
                {searchQuery && (
                <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-black"
                >
                    <X size={18} />
                </button>
                )}
            </div>
            </div>

            {/* Lista de Perguntas */}
            <div className="space-y-12">
            {filteredFaqs.length > 0 ? (
                filteredFaqs.map((category, catIdx) => (
                <section key={catIdx} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 text-[#b5518f]">
                    <category.icon size={22} strokeWidth={2.5} />
                    <h2 className="font-black uppercase tracking-[0.15em] text-xs md:text-sm">{category.category}</h2>
                    </div>
                    
                    <div className="grid gap-3">
                    {category.questions.map((faq, qIdx) => {
                        const id = `${catIdx}-${qIdx}`
                        const isOpen = openIndex === id

                        return (
                        <div 
                            key={id} 
                            className={`group border rounded-2xl transition-all duration-300 ${isOpen ? 'border-[#b5518f] bg-pink-50/20 shadow-sm' : 'border-slate-100 bg-white hover:border-pink-200'}`}
                        >
                            <button 
                            onClick={() => toggleFAQ(id)}
                            className="w-full flex items-center justify-between p-5 text-left"
                            >
                            <span className={`font-bold text-sm md:text-base tracking-tight ${isOpen ? 'text-[#b5518f]' : 'text-slate-800'}`}>
                                {faq.q}
                            </span>
                            <div className={`shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                {isOpen ? <Minus size={18} className="text-[#b5518f]" /> : <Plus size={18} className="text-slate-300 group-hover:text-pink-400" />}
                            </div>
                            </button>
                            
                            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-5 pt-0 text-sm md:text-[15px] text-slate-600 leading-relaxed border-t border-pink-100/50 mt-2">
                                {faq.a}
                                </div>
                            </div>
                            </div>
                        </div>
                        )
                    })}
                    </div>
                </section>
                ))
            ) : (
                <div className="text-center py-20 space-y-4">
                <p className="text-slate-400 italic">Não encontramos nada para "{searchQuery}"</p>
                <button onClick={() => setSearchQuery('')} className="text-[#b5518f] font-bold text-sm underline">Ver todas as perguntas</button>
                </div>
            )}
            </div>

            {/* Suporte Especializado */}
            <div className="mt-24 p-10 rounded-[40px] bg-slate-50 border border-slate-100 flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100">
                <MessageSquare className="text-[#b5518f]" size={32} />
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl font-serif font-black text-slate-900">Ainda com dúvidas?</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Nossa equipe de atendimento está pronta para te ajudar via WhatsApp.
                </p>
            </div>
            <Link 
                href="https://wa.me/5511954577689"
                target="_blank"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#b5518f] text-white px-10 py-4.5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-pink-200 active:scale-95"
            >
                Chamar no WhatsApp
            </Link>
            </div>

        </main>

        <StoreFooter />
        </div>
    )
    }