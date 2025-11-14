    // app/admin/products/new/page.tsx
    'use client'
    import React, { useEffect, useState } from 'react'
    import ProductForm from '@/components/admin/product-form'
    import { fetchCategories, createProduct } from '@/lib/services/product'
    import { useRouter } from 'next/navigation'


    export default function NewProductPage() {
    const [categories, setCategories] = useState<any[]>([])
    const router = useRouter()


    useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error)
    }, [])


    async function onSubmit(values: any) {
    try {
    await createProduct(values)
    router.push('/admin/products')
    } catch (e) { console.error(e) }
    }


    return (
    <div className="p-6">
    <h1 className="text-xl font-bold mb-4">Novo Produto</h1>
    <ProductForm categories={categories} onSubmit={onSubmit} />
    </div>
    )
    }