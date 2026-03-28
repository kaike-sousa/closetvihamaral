    "use client"

    import Link from "next/link"

    export interface ProductCardData {
    id: string
    name: string
    price: number
    image: string
    category: string
    }

    interface ProductCardProps {
    product: ProductCardData
    }

    export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group flex flex-col h-full bg-white relative">
        {/* CONTAINER DA IMAGEM
        */}
        <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 mb-3">
            <Link href={`/produto/${product.id}`} className="block w-full h-full">
            <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            </Link>
            {/* BOTÃO PARA TELAS *MAIORES* QUE 998px (DESKTOP)
                Versão Ultra Wide: px-24 para máxima presença horizontal.
            */}
            <div className="min-[999px]:block max-[998px]:hidden absolute bottom-8 left-1/2 -translate-x-1/2 w-fit z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out translate-y-3 group-hover:translate-y-0">
                <Link 
                    href={`/produto/${product.id}`}
                    // py-4 (altura robusta) e px-24 (largura estendida)
                    className="inline-block bg-black text-white text-center py-4 px-24 text-[11px] font-bold uppercase tracking-[0.3em] backdrop-blur-md hover:bg-zinc-900 whitespace-nowrap transition-all shadow-2xl"
                >
                    Comprar
                </Link>
            </div>
        </div>

        {/* INFO DO PRODUTO (TÍTULO E PREÇO) */}
        <div className="px-1 space-y-2 flex-grow">
            <h3 className="text-[13px] md:text-sm text-gray-800 font-normal leading-tight min-h-[40px] line-clamp-2">
            {product.name}
            </h3>

            <p className="text-sm md:text-base text-black font-bold mt-1">
            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
        </div>

        {/* BOTÃO PARA TELAS *ATÉ* 998px (MOBILE)
            Sempre visível abaixo das informações.
        */}
        <div className="max-[998px]:block min-[999px]:hidden mt-3">
            <Link 
            href={`/produto/${product.id}`}
            className="w-full block bg-black text-white text-center py-2.5 text-xs font-bold uppercase tracking-widest active:bg-zinc-800"
            >
            Comprar
            </Link>
        </div>
        </div>
    )
    }