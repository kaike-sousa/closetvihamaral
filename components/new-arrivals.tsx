export function NewArrivals() {
  return (
    <section id="novidades" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg">
            <img src="/new-fashion-collection-elegant.jpg" alt="Nova Coleção" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <div className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
              Novidade
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance">Coleção Exclusiva de Verão</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Descubra nossa nova coleção de verão com peças leves, elegantes e perfeitas para os dias quentes. Tecidos
              nobres, cortes modernos e cores vibrantes que celebram a feminilidade.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Tecidos premium e sustentáveis</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Modelagem exclusiva</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Edição limitada</span>
              </li>
            </ul>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors">
              Ver Coleção
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
