    // app/admin/products/page.tsx
    'use client'
    import React, { useEffect, useState } from 'react'
    import { fetchProducts } from '@/lib/services/product'
    import Link from 'next/link'


    export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([])
    useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error)
    }, [])


    return (
    <div className="p-6">
    <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-bold">Produtos</h1>
    <Link href="/admin/products/new" className="btn btn-primary">Adicionar Produto</Link>
    </div>


    <div className="grid grid-cols-3 gap-4">
    {products.map(p => (
    <div key={p.id} className="border rounded p-4">
    <img src={p.product_images?.[0]?.image_url} alt={p.name} className="w-full h-48 object-cover" />
    <h3 className="mt-2 font-semibold">{p.name}</h3>
    <p className="text-sm">R$ {p.price}</p>
    <div className="mt-2 flex gap-2">
    <Link href={`/admin/products/${p.id}/edit`} className="btn">Editar</Link>
    </div>
    </div>
    ))}
    </div>
    </div>
    )
    }