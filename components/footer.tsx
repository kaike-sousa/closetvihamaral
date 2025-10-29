import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Bella Moda</h3>
            <p className="text-background/80 leading-relaxed">
              Moda feminina elegante e atemporal. Peças exclusivas para mulheres que valorizam estilo e qualidade.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-background/80 hover:text-background transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#loja" className="text-background/80 hover:text-background transition-colors">
                  Loja
                </a>
              </li>
              <li>
                <a href="#novidades" className="text-background/80 hover:text-background transition-colors">
                  Novidades
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-background/80 hover:text-background transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contato" className="text-background/80 hover:text-background transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Política de Troca
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Envio e Entrega
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Guia de Tamanhos
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contato">
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/80">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <Mail className="h-4 w-4" />
                <span>contato@bellamoda.com.br</span>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>&copy; 2025 Bella Moda. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
