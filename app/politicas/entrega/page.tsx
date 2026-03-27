    'use client'

    import { StoreHeader } from '@/components/store/header'
    import { StoreFooter } from '@/components/store/footer'
    import { 
    Truck, 
    MapPin, 
    ArrowLeft, 
    Info, 
    Bike, 
    MailCheck, 
    Clock,
    Heart
    } from 'lucide-react'
    import Link from 'next/link'

    export default function PoliticaEntregaPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-slate-700">
        <StoreHeader />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            
            {/* Navegação */}
            <div className="mb-10">
            <Link 
                href="/" 
                className="inline-flex items-center gap-2.5 text-sm text-slate-400 hover:text-black transition-all group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" /> 
                Voltar para a loja
            </Link>
            </div>

            <div className="space-y-16">
            {/* Cabeçalho */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-pink-600 bg-pink-50 border border-pink-100">
                <Truck size={12} className="text-pink-400" /> Logística e Prazos
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-slate-900 tracking-tighter">
                Envio e Entrega
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed pt-2">
                No <strong className="text-slate-900">Closet Vih Amaral</strong>, cuidamos de cada detalhe para que seu look chegue impecável. Confira nossas modalidades e prazos.
                </p>
            </div>

            {/* Seção: Prazo de Preparação (Rosa da Marca) */}
            <section className="relative overflow-hidden rounded-[32px] p-8 md:p-12 text-white shadow-xl shadow-pink-100" style={{ backgroundColor: "#b5518f" }}>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="bg-white/20 p-5 rounded-2xl backdrop-blur-md border border-white/30">
                    <Clock className="text-white" size={40} />
                </div>
                <div className="flex-1 space-y-2">
                    <h2 className="text-2xl font-bold font-serif text-white">Prazo de Preparação do Pedido</h2>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    Após a confirmação do pagamento, nossos pedidos levam de <strong>2 a 8 dias úteis</strong> para serem conferidos, embalados e ficarem prontos.
                    </p>
                    <div className="pt-2">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border border-white/20">
                            Válido para Envios e Retiradas
                        </span>
                    </div>
                </div>
                <div className="hidden lg:block border-l border-white/20 pl-8 space-y-2 text-[11px] text-white/70 uppercase tracking-widest font-medium">
                    <p>• Controle de Qualidade</p>
                    <p>• Embalagem Closet Vih</p>
                    <p>• Envio de Rastreio</p>
                </div>
                </div>
                <Heart className="absolute -right-10 -bottom-10 text-white/10 rotate-12" size={220} />
            </section>

            {/* Formas de Envio */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Motoboy */}
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-5 transition-all hover:shadow-md hover:border-pink-200">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                    <Bike className="text-[#b5518f]" size={24} />
                </div>
                <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">Motoboy</h3>
                <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                    <li className="flex gap-2"><span>•</span> Envio via aplicativo (Uber/99), solicitado por nós ou pela cliente.</li>
                    <li className="flex gap-2"><span>•</span> <strong>Valor:</strong> Definido pelo app no momento da solicitação.</li>
                    <li className="p-3 rounded-xl bg-pink-50 border border-pink-100 text-pink-900 font-medium italic">
                    Envio deve ser combinado previamente via WhatsApp.
                    </li>
                </ul>
                </div>

                {/* Correios */}
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-5 transition-all hover:shadow-md hover:border-pink-200">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                    <MailCheck className="text-[#b5518f]" size={24} />
                </div>
                <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">Correios</h3>
                <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                    <li className="flex gap-2"><span>•</span> <strong>Frete:</strong> Calculado automaticamente com base no seu CEP.</li>
                    <li className="flex gap-2"><span>•</span> <strong>Prazo:</strong> Definido pelos Correios conforme sua região.</li>
                    <li className="flex gap-2"><span>•</span> Você receberá o código para acompanhar cada passo da entrega.</li>
                </ul>
                </div>

                {/* Retirada */}
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-5 transition-all hover:shadow-md hover:border-pink-200">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                    <MapPin className="text-[#b5518f]" size={24} />
                </div>
                <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">Retirada Grátis</h3>
                <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
                    <li className="flex gap-2 font-bold text-emerald-600"><span>•</span> Sem custo de frete.</li>
                    <li className="flex gap-2 italic text-slate-500"><span>•</span> Disponível após o prazo de 2 a 8 dias de preparação.</li>
                    <li className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium italic">
                    Mediante agendamento obrigatório pelo WhatsApp.
                    </li>
                </ul>
                </div>
            </div>

            {/* Seção: Informações Importantes (AGORA NAS CORES DA MARCA) */}
            <div className="bg-pink-50/40 border-2 border-dashed border-pink-200 rounded-[32px] p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                <div className="bg-white p-4 rounded-full shadow-sm border border-pink-100">
                    <Info className="text-[#b5518f] shrink-0" size={28} />
                </div>
                <div className="space-y-3">
                <h4 className="font-bold text-[#b5518f] text-lg uppercase tracking-widest">Informações Importantes</h4>
                <p className="text-sm text-pink-900/80 leading-relaxed max-w-4xl font-medium">
                    Confira atentamente seus dados de entrega no momento do cadastro. O Closet Vih Amaral não se responsabiliza por atrasos decorrentes de serviços de terceiros (Correios ou transportadoras), mas daremos todo o suporte necessário caso ocorra algum imprevisto.
                </p>
                </div>
            </div>

            </div>
        </main>

        <StoreFooter />
        </div>
    )
    }