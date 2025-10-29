import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Heart, Award, Users, Sparkles } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-balance">Sobre a Bella Moda</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Há mais de 10 anos trazendo elegância e sofisticação para o guarda-roupa feminino brasileiro.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                <img
                  src="/fashion-boutique-interior-elegant.jpg"
                  alt="Nossa História"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="font-serif text-4xl font-bold text-balance">Nossa História</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A Bella Moda nasceu do sonho de criar uma marca que celebrasse a feminilidade em todas as suas formas.
                  Começamos com uma pequena boutique e hoje somos referência em moda feminina elegante e atemporal.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Cada peça é cuidadosamente selecionada pensando na mulher moderna que valoriza qualidade, estilo e
                  conforto. Trabalhamos com tecidos nobres e modelagens exclusivas que valorizam a silhueta feminina.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-12">Nossos Valores</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">Paixão</h3>
                <p className="text-muted-foreground">
                  Amamos o que fazemos e isso se reflete em cada detalhe das nossas peças.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">Qualidade</h3>
                <p className="text-muted-foreground">
                  Selecionamos apenas os melhores tecidos e fornecedores para garantir excelência.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">Comunidade</h3>
                <p className="text-muted-foreground">
                  Construímos relacionamentos duradouros com nossas clientes e parceiros.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl">Elegância</h3>
                <p className="text-muted-foreground">
                  Cada peça é pensada para realçar a beleza e confiança de quem veste.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold mb-6">Nossa Equipe</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12">
                Contamos com uma equipe apaixonada por moda e dedicada a proporcionar a melhor experiência para nossas
                clientes. Desde o atendimento até a curadoria de produtos, cada membro contribui para fazer da Bella
                Moda uma marca especial.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
