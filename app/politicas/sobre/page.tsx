    'use client'

    import { StoreHeader } from '@/components/store/header'
    import { StoreFooter } from '@/components/store/footer'
    import { 
    Heart, 
    Sparkles, 
    ShoppingBag, 
    CheckCircle2, 
    Instagram, 
    Camera,
    Quote,
    Star,
    ArrowUpRight
    } from 'lucide-react'
    import Link from 'next/link'

    interface PhotoCardProps {
    className?: string
    imagePath?: string
    label?: string
    }

    const PhotoCard = ({ className = '', imagePath, label }: PhotoCardProps) => (
    <div className={`group relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-100 shadow-2xl transition-all duration-700 hover:scale-[1.02] ${className}`}>
        {imagePath ? (
        <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" 
            style={{ backgroundImage: `url('${imagePath}')` }}
        />
        ) : (
        <div className="w-full h-full flex items-center justify-center bg-pink-50 text-pink-200">
            <Camera size={48} strokeWidth={1} />
        </div>
        )}
        
        {/* Selo de Legenda Estilo Revista */}
        {label && (
        <div className="absolute bottom-6 left-6 right-6 p-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 text-center shadow-lg">
            {label}
            </div>
        </div>
        )}

        {/* Brilho de Vidro no Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#b5518f]/10 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
    )

    export default function SobrePage() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans antialiased text-slate-800">
        <StoreHeader />

        <main className="flex-1 overflow-x-hidden">
            
            {/* Hero Section - Editorial Artístico */}
            <section className="relative px-4 pt-20 md:pt-32 pb-24 lg:pb-40">
            
            {/* Orbes de Luz Ambientes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-100/60 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-[#b5518f]/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-28 space-y-8">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#b5518f] bg-white shadow-xl shadow-pink-100/50 border border-pink-50">
                    <Sparkles size={14} className="animate-spin-slow" /> Boutique Concept
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-black text-slate-950 tracking-tighter leading-[0.75]">
                    O Nosso <br /> 
                    <span className="text-[#b5518f] italic font-serif font-light lowercase">Closet.</span>
                </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 items-center">
                
                {/* Card 1: Esquerda (Flutuante) */}
                <div className="lg:col-span-3 order-2 lg:order-1 animate-float">
                    <PhotoCard 
                    imagePath="/sobre/fotovitoria1.jpeg" 
                    label="Curadoria SP"
                    className="rotate-[-3deg] border-[10px] border-white shadow-pink-200/20"
                    />
                    <div className="mt-10 p-8 rounded-[2rem] bg-white shadow-xl border border-slate-50 relative group">
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#b5518f] rounded-full flex items-center justify-center text-white">
                        <Star size={14} fill="currentColor" />
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-slate-500 italic">
                        "Cada peça é escolhida como se fosse para o meu próprio guarda-roupa."
                    </p>
                    </div>
                </div>

                {/* Texto Central (Glassmorphism) */}
                <div className="lg:col-span-6 order-1 lg:order-2 px-4 lg:px-10">
                    <div className="relative p-8 md:p-16 rounded-[4rem] bg-white/40 backdrop-blur-xl border border-white shadow-2xl shadow-pink-200/30">
                    <Quote className="absolute -top-8 left-1/2 -translate-x-1/2 text-[#b5518f]/10" size={120} strokeWidth={1} />
                    
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Uma história de paixão.</h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                        <p>
                            O <strong className="text-slate-900 font-extrabold tracking-tight underline decoration-pink-200 decoration-4 underline-offset-4">Closet Vih Amaral</strong> nasceu da inquietação de transformar o ato de vestir em um ritual de poder.
                        </p>
                        <p>
                            Acreditamos que a moda é a ferramenta mais rápida para comunicar ao mundo quem você é, sem precisar dizer uma única palavra.
                        </p>
                        <div className="pt-4 flex items-center gap-4 text-[#b5518f] font-serif italic text-2xl">
                            <div className="h-px flex-1 bg-pink-100"></div>
                            <span>Vitoria Amaral</span>
                            <div className="h-px flex-1 bg-pink-100"></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Card 3: Direita (Flutuante) */}
                <div className="lg:col-span-3 order-3 animate-float-delayed">
                    <PhotoCard 
                    imagePath="/sobre/fotovitoria2.jpeg" 
                    label="O Detalhe que Faltava"
                    className="rotate-[3deg] border-[10px] border-white shadow-blue-100/50"
                    />
                    <div className="mt-12 flex flex-col items-center gap-4">
                    <div className="px-6 py-3 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-2xl">
                        Pronta para brilhar <ArrowUpRight size={14} className="text-[#b5518f]" />
                    </div>
                    </div>
                </div>

                </div>
            </div>
            </section>

            {/* Seção de Valores - Minimalismo de Alto Impacto */}
            <section className="bg-slate-950 py-32 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#b5518f]/5 skew-x-12 translate-x-1/2" />
            
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                {[
                    { title: "Curadoria", desc: "Seleção rigorosa das tendências globais.", icon: ShoppingBag },
                    { title: "Experiência", desc: "Unboxing que desperta todos os sentidos.", icon: Heart },
                    { title: "Verdade", desc: "Moda real para mulheres extraordinárias.", icon: CheckCircle2 },
                ].map((item, i) => (
                    <div key={i} className="group space-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#b5518f] group-hover:bg-[#b5518f] group-hover:text-white transition-all duration-500">
                        <item.icon size={32} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-4xl font-serif font-bold italic tracking-tight">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-lg group-hover:text-slate-300 transition-colors">{item.desc}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </section>

            {/* Instagram CTA - Design "The Studio" */}
            <section className="px-4 py-32 md:py-48 bg-white">
            <div className="max-w-6xl mx-auto text-center space-y-12">
                <div className="inline-flex items-center gap-3 text-[#b5518f] font-bold uppercase tracking-[0.4em] text-xs">
                <div className="w-8 h-px bg-[#b5518f]" />
                Follow Our Studio
                <div className="w-8 h-px bg-[#b5518f]" />
                </div>
                
                <h2 className="text-5xl md:text-8xl font-serif font-black text-slate-950 tracking-tighter leading-none">
                Inspirando o seu <br /> 
                <span className="italic font-light text-slate-400">lifestyle.</span>
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                <Link 
                    href="https://www.instagram.com/closetvihamarall/" 
                    target="_blank"
                    className="group relative inline-flex items-center gap-4 bg-slate-900 text-white px-16 py-6 rounded-full font-black uppercase text-xs tracking-[0.3em] overflow-hidden transition-all hover:pr-20 shadow-2xl"
                >
                    <span className="relative z-10">Abrir Instagram</span>
                    <Instagram size={18} className="relative z-10" />
                    <div className="absolute right-0 top-0 h-full w-0 bg-[#b5518f] transition-all duration-300 group-hover:w-full -z-0" />
                </Link>
                </div>
            </div>
            </section>

        </main>

        <StoreFooter />
        
        {/* Estilos para as animações customizadas */}
        <style jsx global>{`
            @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(-3deg); }
            50% { transform: translateY(-20px) rotate(-1deg); }
            }
            @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(3deg); }
            50% { transform: translateY(-25px) rotate(5deg); }
            }
            .animate-float {
            animation: float 6s ease-in-out infinite;
            }
            .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
            }
            .animate-spin-slow {
            animation: spin 8s linear infinite;
            }
        `}</style>
        </div>
    )
    }