'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, ImageIcon, AlertTriangle, Loader2, Search } from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { ProductFormModal } from '@/components/admin/ProductFormModal'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [productToDelete, setProductToDelete] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select(`*, produto_variantes (*), produto_imagens (*)`)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      console.error('Erro ao buscar produtos:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!productToDelete) return
    setIsDeleting(true)
    try {
      const { error } = await supabase.from('produtos').delete().eq('id', productToDelete.id)
      if (error) throw error
      
      await fetchProducts()
      setProductToDelete(null)
    } catch (err) {
      console.error('Erro ao excluir:', err)
      alert('Erro ao excluir produto. Verifique se existem pedidos vinculados a ele.')
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-10">
      {/* Header com Design Premium */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-10">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Inventory System</span>
          <h1 className="text-5xl font-bold tracking-tighter mt-2">Catálogo</h1>
          <p className="text-neutral-500 mt-2 font-medium">Gerencie o acervo da Closet Vih Amaral</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text"
              placeholder="Buscar peça..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-neutral-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-black transition-all w-64"
            />
          </div>
          <button 
            onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }} 
            className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-neutral-800 transition-all shadow-2xl shadow-black/20"
          >
            <Plus size={18} /> Nova Peça
          </button>
        </div>
      </div>

      {/* Grid de Produtos */}
      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-neutral-300" size={40} />
          <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Carregando Acervo</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative aspect-[3/4] bg-neutral-100 rounded-[2.5rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-700">
                {/* Badge de Destaque */}
                {product.featured && (
                  <div className="absolute top-6 left-6 z-10 bg-black text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    Destaque
                  </div>
                )}
                
                {product.produto_imagens?.[0] ? (
                  <Image 
                    src={product.produto_imagens[0].image_url} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="text-neutral-300" size={32} />
                  </div>
                )}
                
                <div className="absolute top-6 right-6">
                  <span className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                    {product.category}
                  </span>
                </div>

                {/* Overlay de Ações */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <button 
                    onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                    className="p-4 bg-white rounded-2xl hover:bg-black hover:text-white transition-all shadow-xl"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => setProductToDelete(product)}
                    className="p-4 bg-white rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="px-2 space-y-1">
                <h3 className="font-bold text-lg text-neutral-900 truncate pr-4">{product.name}</h3>
                <div className="flex items-center justify-between text-neutral-500">
                  <span className="text-sm font-medium">R$ {Number(product.price).toFixed(2)}</span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter">
                    {product.produto_variantes?.length || 0} variações
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-96 border-2 border-dashed border-neutral-100 rounded-[3rem] flex flex-col items-center justify-center text-center p-10">
          <Search className="text-neutral-200 mb-4" size={40} />
          <h3 className="text-xl font-bold">Nenhum produto encontrado</h3>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[110] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">Remover?</h2>
            <p className="text-neutral-500 mb-10">
              Deseja excluir <span className="font-bold text-neutral-900">{productToDelete.name}</span>?
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleDelete} 
                disabled={isDeleting} 
                className="w-full py-5 bg-red-500 text-white rounded-[1.5rem] font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-all disabled:opacity-50"
              >
                {isDeleting ? 'Excluindo...' : 'Confirmar Exclusão'}
              </button>
              <button onClick={() => setProductToDelete(null)} className="w-full py-5 text-xs font-bold uppercase text-neutral-400">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cadastro/Edição */}
      {isModalOpen && (
        <ProductFormModal 
          isOpen={isModalOpen} 
          product={selectedProduct} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            fetchProducts();
            setIsModalOpen(false);
          }} 
        />
      )}
    </div>
  )
}