import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-balance">Entre em Contato</h1>
              <p className="text-xl text-muted-foreground">
                Estamos aqui para ajudar. Envie sua mensagem e responderemos em breve.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-6">Informações de Contato</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Nossa equipe está pronta para atendê-la. Entre em contato através dos canais abaixo ou preencha o
                    formulário.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Telefone</h3>
                      <p className="text-muted-foreground">(11) 9999-9999</p>
                      <p className="text-sm text-muted-foreground">Segunda a Sexta, 9h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">E-mail</h3>
                      <p className="text-muted-foreground">contato@bellamoda.com.br</p>
                      <p className="text-sm text-muted-foreground">Respondemos em até 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Endereço</h3>
                      <p className="text-muted-foreground">Rua da Moda, 123</p>
                      <p className="text-muted-foreground">Jardins, São Paulo - SP</p>
                      <p className="text-muted-foreground">CEP: 01234-567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Horário de Funcionamento</h3>
                      <p className="text-muted-foreground">Segunda a Sexta: 9h às 19h</p>
                      <p className="text-muted-foreground">Sábado: 10h às 18h</p>
                      <p className="text-muted-foreground">Domingo: Fechado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
