    'use client'

    import { useState, useEffect } from 'react'
    import Image from 'next/image'
    import { X, Upload, Loader2 } from 'lucide-react'
    import { supabase } from '@/lib/supabase'
    import { CATEGORIES, SIZES, AVAILABLE_COLORS, Category } from '@/lib/types'

    interface ProductFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    product?: any | null
    }

    export function ProductFormModal({ isOpen, onClose, onSuccess, product }: ProductFormModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [activeColorTab, setActiveColorTab] = useState<string | null>(null)
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'vestidos' as Category,
        sizes: [] as string[],
        colors: [] as any[],
        featured: false
    })

    useEffect(() => {
        if (isOpen) {
        if (product) {
            const colorsMap: Record<string, any> = {}
            product.produto_imagens?.forEach((img: any) => {
            if (!colorsMap[img.color]) {
                const colorData = AVAILABLE_COLORS.find(c => c.name === img.color)
                colorsMap[img.color] = { 
                name: img.color, 
                hex: colorData?.hex || '#000', 
                images: [] 
                }
            }
            colorsMap[img.color].images.push(img.image_url)
            })

            const colors = Object.values(colorsMap)
            setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price.toString(),
            category: (product.category as Category) || 'vestidos',
            sizes: [...new Set(product.produto_variantes?.map((v: any) => v.size) || [])] as string[],
            colors,
            featured: product.featured || false
            })
            setActiveColorTab(colors[0]?.name || null)
        } else {
            setFormData({
            name: '',
            description: '',
            price: '',
            category: 'vestidos',
            sizes: [],
            colors: [],
            featured: false
            })
            setActiveColorTab(null)
        }
        }
    }, [product, isOpen])

    if (!isOpen) return null

    const handleColorToggle = (colorName: string) => {
        const colorInfo = AVAILABLE_COLORS.find(c => c.name === colorName)
        if (!colorInfo) return

        const exists = formData.colors.find(c => c.name === colorName)
        if (exists) {
        const newColors = formData.colors.filter(c => c.name !== colorName)
        setFormData({ ...formData, colors: newColors })
        if (activeColorTab === colorName) setActiveColorTab(newColors[0]?.name || null)
        } else {
        const newColor = { name: colorInfo.name, hex: colorInfo.hex, images: [] }
        setFormData({ ...formData, colors: [...formData.colors, newColor] })
        setActiveColorTab(colorName)
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || !activeColorTab) return

        Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
            const imageUrl = event.target?.result as string
            setFormData(prev => ({
            ...prev,
            colors: prev.colors.map(color =>
                color.name === activeColorTab 
                ? { ...color, images: [...color.images, imageUrl] } 
                : color
            )
            }))
        }
        reader.readAsDataURL(file)
        })
    }

    const removeImage = (colorName: string, index: number) => {
        setFormData(prev => ({
        ...prev,
        colors: prev.colors.map(color =>
            color.name === colorName 
            ? { ...color, images: color.images.filter((_: any, i: number) => i !== index) }
            : color
        )
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.colors.length === 0) return alert("Selecione pelo menos uma cor.")
        setIsSubmitting(true)

        try {
        const productData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            featured: formData.featured
        }

        let productId = product?.id

        if (product) {
            await supabase.from('produtos').update(productData).eq('id', productId)
            await supabase.from('produto_variantes').delete().eq('produto_id', productId)
            await supabase.from('produto_imagens').delete().eq('produto_id', productId)
        } else {
            const { data, error } = await supabase.from('produtos').insert(productData).select().single()
            if (error) throw error
            productId = data.id
        }

        const variantes = formData.colors.flatMap(color =>
            formData.sizes.map(size => ({
            produto_id: productId,
            color: color.name,
            size,
            stock: 10
            }))
        )
        if (variantes.length) await supabase.from('produto_variantes').insert(variantes)

        const imagens = formData.colors.flatMap(color =>
            color.images.map((img: string, index: number) => ({
            produto_id: productId,
            color: color.name,
            image_url: img,
            position: index
            }))
        )
        if (imagens.length) await supabase.from('produto_imagens').insert(imagens)

        onSuccess()
        } catch (err) {
        console.error(err)
        alert("Erro ao salvar produto.")
        } finally {
        setIsSubmitting(false)
        }
    }

    const activeColor = formData.colors.find(c => c.name === activeColorTab)

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] max-w-2xl w-full max-h-[95vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative">
            <button onClick={onClose} className="absolute top-6 right-6 text-neutral-400 hover:text-black transition-colors">
            <X size={24} />
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold mb-8 tracking-tighter">
            {product ? 'Editar' : 'Nova'} Peça
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Toggle Destaque */}
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-900">Destaque na Home</p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-tighter">Aparecerá na seção principal do site</p>
                </div>
                <button
                type="button"
                onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                className={`w-12 h-6 rounded-full transition-colors relative ${formData.featured ? 'bg-black' : 'bg-neutral-200'}`}
                >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.featured ? 'left-7' : 'left-1'}`} />
                </button>
            </div>

            {/* Nome */}
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Nome da Peça</label>
                <input
                className="w-full bg-neutral-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-black transition-all font-medium"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Vestido Midi Acetinado"
                required
                />
            </div>

            {/* DESCRIÇÃO (ADICIONADO) */}
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Descrição</label>
                <textarea
                className="w-full bg-neutral-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-black transition-all font-medium min-h-[100px] resize-none"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva detalhes do tecido, caimento ou estilo..."
                />
            </div>

            {/* Preço e Categoria */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Preço (R$)</label>
                <input
                    type="number"
                    className="w-full bg-neutral-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-black transition-all"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    required
                />
                </div>
                <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Categoria</label>
                <select 
                    className="w-full bg-neutral-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-black font-medium"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                >
                    {CATEGORIES.filter(c => c.value !== 'todos').map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                </select>
                </div>
            </div>

            {/* Tamanhos */}
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Tamanhos Disponíveis</label>
                <div className="flex flex-wrap gap-2">
                {SIZES.map(size => (
                    <button
                    key={size}
                    type="button"
                    onClick={() => setFormData(prev => ({
                        ...prev,
                        sizes: prev.sizes.includes(size) ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
                    }))}
                    className={`w-12 h-12 rounded-xl font-bold border transition-all ${formData.sizes.includes(size) ? 'bg-black text-white border-black shadow-md' : 'bg-white text-neutral-400 border-neutral-100'}`}
                    >
                    {size}
                    </button>
                ))}
                </div>
            </div>

            {/* Cores & Fotos */}
            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Cores Disponíveis</label>
                <div className="flex flex-wrap gap-2">
                {AVAILABLE_COLORS.map(color => (
                    <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorToggle(color.name)}
                    className={`group p-1 pr-4 rounded-full border flex items-center gap-2 transition-all ${formData.colors.some(c => c.name === color.name) ? 'border-black bg-neutral-50' : 'border-neutral-100'}`}
                    >
                    <span className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: color.hex }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{color.name}</span>
                    </button>
                ))}
                </div>

                {formData.colors.length > 0 && (
                <div className="bg-neutral-50 rounded-[2rem] p-6 space-y-6">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {formData.colors.map(c => (
                        <button
                        key={c.name}
                        type="button"
                        onClick={() => setActiveColorTab(c.name)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeColorTab === c.name ? 'bg-black text-white shadow-md' : 'bg-white text-neutral-400 shadow-sm'}`}
                        >
                        {c.name}
                        </button>
                    ))}
                    </div>

                    {activeColor && (
                    <div className="space-y-4">
                        <label className="w-full flex flex-col items-center px-4 py-8 bg-white text-neutral-400 rounded-3xl border-2 border-dashed border-neutral-100 cursor-pointer hover:border-black hover:text-black transition-all">
                        <Upload size={24} className="mb-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Fotos para {activeColor.name}</span>
                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                        
                        <div className="grid grid-cols-4 gap-3">
                        {activeColor.images.map((img: string, idx: number) => (
                            <div key={idx} className="aspect-[3/4] relative rounded-2xl overflow-hidden group shadow-sm bg-white border border-neutral-100">
                            <Image src={img} alt="" fill className="object-cover" />
                            <button 
                                type="button"
                                onClick={() => removeImage(activeColor.name, idx)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={12} />
                            </button>
                            </div>
                        ))}
                        </div>
                    </div>
                    )}
                </div>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-6 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-[0.99] transition-all disabled:opacity-50"
            >
                {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : product ? 'Atualizar Catálogo' : 'Salvar no Catálogo'}
            </button>
            </form>
        </div>
        </div>
    )
    }