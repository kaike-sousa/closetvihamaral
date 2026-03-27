    'use client'

    import { StoreHeader } from '@/components/store/header'
    import { StoreFooter } from '@/components/store/footer'
    import { 
    AlertTriangle, 
    CheckCircle2, 
    ArrowLeft, 
    ShieldCheck, 
    Clock, 
    Tag, 
    Truck, 
    MessageSquare, 
    Camera,
    Heart
    } from 'lucide-react'
    import Link from 'next/link'

    // Configuração Visual dos Status e Cores para reaproveitamento
    const colors = {
    primary: '#b5518f', // Rosa/Magenta da Closet Vih Amaral
    primaryLight: '#fdf2f8', // bg-pink-50
    emerald: '#10b981', // bg-emerald-500
    red: '#ef4444', // bg-red-500
    }

    export default function PoliticaTrocaPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-slate-700">
        <StoreHeader />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            
            {/* Navegação e Botão Voltar */}
            <div className="mb-10 flex items-center justify-between">
            <Link 
                href="/" 
                className="inline-flex items-center gap-2.5 text-sm text-slate-400 hover:text-black transition-all group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" /> 
                Voltar para a loja
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Link href="/" className="hover:text-black">Início</Link>
                <span>/</span>
                <span className="text-slate-900 font-medium">Trocas</span>
            </div>
            </div>

            <div className="space-y-16">
            {/* Cabeçalho */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-pink-600 bg-pink-50 border border-pink-100">
                <Heart size={12} fill="currentColor" className="text-pink-300" /> Informativo de Trocas
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-slate-900 tracking-tighter leading-[0.95]">
                Nossa Política <br className="hidden md:block"/> de Troca
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed pt-2">
                No <strong className="text-slate-900">Closet Vih Amaral</strong>, prezamos pela sua satisfação e transparência. 
                Nossa política segue as normas para garantir uma experiência segura e justa.
                </p>
            </div>

            {/* Destaques Rápidos Responsivos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="p-8 lg:p-10 rounded-3xl bg-slate-50 border border-slate-100 space-y-5 transition-all hover:border-slate-200 shadow-sm">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                    <ShieldCheck className="text-[#b5518f]" size={28} />
                </div>
                <h3 className="font-extrabold text-2xl text-slate-900 tracking-tight">Defeito de Fabricação</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                    Realizamos trocas <strong>exclusivamente</strong> em casos comprovados de defeitos de fabricação. 
                    Nossas peças são revisadas antes do envio. Não cobrimos danos por mau uso ou lavagem incorreta.
                </p>
                </div>

                <div className="p-8 lg:p-10 rounded-3xl bg-slate-50 border border-slate-100 space-y-5 transition-all hover:border-slate-200 shadow-sm">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                    <Clock className="text-[#b5518f]" size={28} />
                </div>
                <h3 className="font-extrabold text-2xl text-slate-900 tracking-tight">Prazo Rigoroso: 24h</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                    A notificação do defeito deve ocorrer em até <strong>24 horas</strong> após o recebimento, 
                    conforme o rastreio da transportadora. Pedidos notificados fora desse prazo não serão analisados.
                </p>
                </div>
            </div>

            {/* Passo a Passo Responsivo */}
            <section className="space-y-8 max-w-5xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-center text-slate-900">Como solicitar sua troca?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { icon: Camera, title: "Prepare o Material", desc: "Tire fotos e faça vídeos claros do defeito e da etiqueta original." },
                    { icon: MessageSquare, title: "Chame no WhatsApp", desc: "Envie o material para nosso suporte com o número do seu pedido." },
                    { icon: Truck, title: "Aguarde Instruções", desc: "Nossa equipe irá analisar e enviar os próximos passos para postagem." }
                ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-6 bg-pink-50 border border-pink-100 rounded-3xl group transition-all hover:bg-white hover:border-slate-100 hover:shadow-sm">
                    <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 font-black text-lg text-[#b5518f] border border-pink-100 shadow-sm">
                        {i+1}
                    </div>
                    <step.icon className="mb-3 text-pink-300 transition-colors group-hover:text-[#b5518f]" size={24} />
                    <p className="text-sm font-bold text-pink-900 mb-1">{step.title}</p>
                    <p className="text-xs text-pink-700 leading-relaxed">{step.desc}</p>
                    </div>
                ))}
                </div>
            </section>

            {/* Card Central com Regras Detalhadas */}
            <div className="bg-white border border-slate-100 rounded-[32px] shadow-lg shadow-pink-100/30 overflow-hidden">
                <div className="p-8 md:p-12 lg:p-16 space-y-12">
                
                {/* Condições Obrigatórias */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3.5 text-slate-950">
                    <Tag size={26} className="text-slate-300 shrink-0" />
                    Condições do Produto para Devolução
                    </h2>
                    <div className="grid gap-5">
                    {[
                        "A peça deve estar sem qualquer indício de uso (manchas, odores ou lavagem).",
                        "A etiqueta original do Closet Vih Amaral deve estar afixada à peça.",
                        "Deve acompanhar a embalagem original e eventuais brindes/mimos inclusos."
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                        <CheckCircle2 size={22} className="text-emerald-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-emerald-950 leading-relaxed font-medium">{item}</p>
                        </div>
                    ))}
                    </div>
                </section>

                <hr className="border-slate-100" />

                {/* Restrições Importantes */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3.5 text-red-600">
                    <AlertTriangle size={26} className="shrink-0" />
                    Atenção: Sem exceções para troca
                    </h2>
                    <p className="text-sm text-red-900 leading-relaxed font-medium bg-red-50 p-4 rounded-xl border border-red-100">
                        O descumprimento de qualquer uma das regras abaixo implicará na recusa imediata da solicitação de troca.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100 space-y-2">
                        <p className="text-sm text-red-900 font-extrabold uppercase tracking-widest">Peças Claras</p>
                        <p className="text-xs text-red-800 leading-relaxed italic">Brancos, Off-white, Bege e variações de Nude não possuem troca por questões de higiene e alta sensibilidade do tecido.</p>
                    </div>
                    <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100 space-y-2">
                        <p className="text-sm text-red-900 font-extrabold uppercase tracking-widest">Promoções & Sale</p>
                        <p className="text-xs text-red-800 leading-relaxed italic">Itens da categoria 'Sale', Black Friday, queimas de estoque ou liquidações sazonais não possuem direito a troca ou devolução.</p>
                    </div>
                    </div>
                </section>
                </div>

                {/* Suporte Final - CTA */}
                <div className="bg-[#b5518f] p-12 text-center text-white">
                <h3 className="text-3xl font-serif font-bold mb-3 text-white">Precisa de ajuda agora?</h3>
                <p className="text-white/80 text-sm mb-10 max-w-lg mx-auto leading-relaxed">Nossa equipe de suporte está pronta para te atender e resolver sua solicitação da forma mais rápida e acolhedora possível.</p>
                <Link 
                    href="https://wa.me/5511954577689" // WhatsApp do Closet Vih Amaral
                    target="_blank"
                    className="inline-flex items-center gap-3 bg-white text-[#b5518f] px-12 py-4.5 rounded-full font-black hover:scale-105 transition-all shadow-xl shadow-black/10 active:scale-95 uppercase text-xs tracking-widest"
                >
                    <MessageSquare size={18} fill="currentColor" className="text-white/0" />
                    Iniciar Atendimento via WhatsApp
                </Link>
                </div>
            </div>
            
            {/* Nota Legal */}
            <div className="text-center space-y-2 max-w-2xl mx-auto pt-4">
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] leading-loose">
                    Nota Legal e Código de Defesa do Consumidor
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                    Conforme o Art. 49 do CDC, o direito de arrependimento não se aplica a produtos que apresentem sinais de uso, lavagem ou descumprimento das regras de higiene e integridade estabelecidas no ato da entrega, especialmente para peças sensíveis ou claras.
                </p>
            </div>
            </div>
        </main>

        <StoreFooter />
        </div>
    )
    }