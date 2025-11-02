import { Facebook, Instagram, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="text-white py-12" style={{ backgroundColor: "#b5518f" }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Sobre a Marca */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Closet Vih Amaral</h3>
            <p className="text-white/90 leading-relaxed">
              Tendências que expressam quem você é. Vista-se de confiança e estilo todos os dias!
            </p>
          </div>

          {/* Links do site (iguais aos do header) */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#loja" className="text-white/90 hover:text-white transition-colors">
                  VER TUDO
                </a>
              </li>
              <li>
                <a href="/#novidades" className="text-white/90 hover:text-white transition-colors">
                  Conjuntos
                </a>
              </li>
              <li>
                <a href="/#novidades" className="text-white/90 hover:text-white transition-colors">
                  Saias
                </a>
              </li>
              <li>
                <a href="/#novidades" className="text-white/90 hover:text-white transition-colors">
                  Vestidos
                </a>
              </li>
              <li>
                <a href="/#novidades" className="text-white/90 hover:text-white transition-colors">
                  Croppeds
                </a>
              </li>
              <li>
                <a href="/#novidades" className="text-white/90 hover:text-white transition-colors">
                  Bodys
                </a>
              </li>
              <li>
                <a href="/#novidades" className="text-white/90 hover:text-white transition-colors">
                  Calças
                </a>
              </li>
              <li>
                <Link href="/sobre" className="text-white/90 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-white/90 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h4 className="font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors">
                  Política de Troca
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors">
                  Envio e Entrega
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors">
                  Guia de Tamanhos
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div id="contato">
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/90">
                <Mail className="h-4 w-4" />
                <span>closetvihamarall@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/90">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.instagram.com/closetvihamarall"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/90 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 pt-8 text-center text-white/70">
          <p>&copy; 2025 Closet Vih Amaral. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
