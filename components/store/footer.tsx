    import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react" // Adicionado MessageCircle
    import Link from "next/link"

    export function StoreFooter() {
    return (
        <footer className="text-white py-12" style={{ backgroundColor: "#b5518f" }}>
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Sobre a Marca */}
            <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold">Closet Vih Amaral</h3>
                <p className="text-white/90 leading-relaxed text-sm">
                Tendências que expressam quem você é. Vista-se de confiança e estilo todos os dias!
                </p>
            </div>

            {/* Categorias */}
            <div>
                <h4 className="font-semibold mb-4 uppercase text-[10px] tracking-[0.2em] opacity-80">Categorias</h4>
                <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/produtos?categoria=vestidos" className="hover:text-white transition-colors">Vestidos</Link></li>
                <li><Link href="/produtos?categoria=saias" className="hover:text-white transition-colors">Saias</Link></li>
                <li><Link href="/produtos?categoria=conjuntos" className="hover:text-white transition-colors">Conjuntos</Link></li>
                <li><Link href="/produtos?categoria=cropped" className="hover:text-white transition-colors">Cropped</Link></li>
                <li><Link href="/produtos?categoria=bodys" className="hover:text-white transition-colors">Bodys</Link></li>
                <li><Link href="/produtos?categoria=calcas" className="hover:text-white transition-colors">Calças</Link></li>
                </ul>
            </div>

            {/* Atendimento */}
            <div>
                <h4 className="font-semibold mb-4 uppercase text-[10px] tracking-[0.2em] opacity-80">Atendimento</h4>
                <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/politicas/troca" className="hover:text-white transition-colors">Política de Troca</Link></li>
                <li><Link href="/politicas/entrega" className="hover:text-white transition-colors">Envio e Entrega</Link></li>
                <li><Link href="/politicas/perguntas" className="hover:text-white transition-colors">Perguntas Frequentes</Link></li>
                <li><Link href="/politicas/sobre" className="hover:text-white transition-colors">Sobre a Closet Vih Amaral</Link></li>
                </ul>
            </div>

            {/* Contato */}
            <div id="contato">
                <h4 className="font-semibold mb-4 uppercase text-[10px] tracking-[0.2em] opacity-80">Contato</h4>
                <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 text-white/90">
                    <Mail className="h-4 w-4 shrink-0" />
                    <a href="mailto:closetvihamarall@gmail.com" className="hover:underline tracking-tight">
                    closetvihamarall@gmail.com
                    </a>
                </li>
                <li className="flex items-center gap-3 text-white/90">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>São Paulo, SP</span>
                </li>
                </ul>
                
                {/* Redes Sociais Lado a Lado */}
                <div className="flex gap-4 mt-6">
                <a
                    href="https://www.instagram.com/closetvihamarall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 p-2.5 rounded-full hover:bg-white/40 transition-all active:scale-90"
                    title="Instagram"
                >
                    <Instagram className="h-5 w-5" />
                </a>

                {/* Botão do WhatsApp */}
                <a
                    href="https://wa.me/5511954577689" // Substitua pelo seu número real
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 p-2.5 rounded-full hover:bg-white/40 transition-all active:scale-90"
                    title="WhatsApp"
                >
                    <MessageCircle className="h-5 w-5" />
                </a>
                </div>
            </div>
            </div>

            {/* Linha Final */}
            <div className="border-t border-white/20 pt-8 mt-8 text-center text-white/50 text-[10px] uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} Closet Vih Amaral. Todos os direitos reservados.</p>
            </div>
        </div>
        </footer>
    )
    }