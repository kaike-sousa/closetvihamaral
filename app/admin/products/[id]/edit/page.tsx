    // app/admin/products/[id]/edit/page.tsx
    "use client"

    import React, { useEffect, useState } from "react"
    import ProductForm from "@/components/admin/product-form"
    import { fetchProductById, updateProduct } from "@/lib/services/product"
    import { fetchCategories } from "@/lib/services/product"
    import { useRouter, useParams } from "next/navigation"

    export default function EditProductPage() {
    const [categories, setCategories] = useState<any[]>([])
    const [product, setProduct] = useState<any>(null)

    const router = useRouter()
    const { id } = useParams() as { id: string }

    useEffect(() => {
        async function load() {
        const c = await fetchCategories()
        setCategories(c)

        if (id) {
            const p = await fetchProductById(id)
            setProduct(p)
        }
        }
        load()
    }, [id])

    async function onSubmit(values: any) {
        try {
        await updateProduct(id, values)
        router.push("/admin/products")
        } catch (err) {
        console.error(err)
        }
    }

    if (!product)
        return <div className="p-6 text-gray-600">Carregando produto...</div>

    return (
        <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Editar Produto</h1>

        <ProductForm
            defaultValues={product}
            categories={categories}
            onSubmit={onSubmit}
        />
        </div>
    )
    }
