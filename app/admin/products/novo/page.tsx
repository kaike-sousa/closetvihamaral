    "use client"

    import { useState } from "react"
    import { createClient } from "@supabase/supabase-js"

    const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    export default function NovoProduto() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState<string[]>([])
    const [variations, setVariations] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    // Sanitiza nomes de arquivos
    const sanitizeFileName = (name: string) =>
        name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_")
        .replace(/[^\w.-]/g, "")

    // Upload da imagem no Supabase
    const uploadImage = async (file: File) => {
        const fileName = `${Date.now()}_${sanitizeFileName(file.name)}`
        const { error } = await supabase.storage.from("products").upload(fileName, file)
        if (error) {
        console.error("Erro upload:", error)
        return ""
        }
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${fileName}`
    }

    // Adicionar imagens principais
    const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const urls: string[] = []
        for (let i = 0; i < e.target.files.length; i++) {
        const url = await uploadImage(e.target.files[i])
        if (url) urls.push(url)
        }
        setImages([...images, ...urls])
    }

    // Adicionar imagem da variação
    const handleVariationImage = async (index: number, file: File) => {
        const url = await uploadImage(file)
        if (url) updateVariation(index, "image", url)
    }

    // Adicionar nova variação
    const addVariation = () => {
        setVariations([...variations, { color: "", size: "", stock: 0, image: "" }])
    }

    // Atualizar variação
    const updateVariation = (index: number, field: string, value: any) => {
        const nv = [...variations]
        nv[index][field] = value
        setVariations(nv)
    }

    // Enviar produto
    const handleSubmit = async () => {
        if (!name || !price || !category) {
        alert("Preencha todos os campos obrigatórios!")
        return
        }

        setLoading(true)

        const { data, error } = await supabase.from("products").insert([
        {
            name,
            description,
            price: parseFloat(price),
            category,
            images,
            variations,
        },
        ])

        setLoading(false)

        if (error) {
        console.error("❌ Erro ao salvar produto:", error)
        alert("Erro ao salvar produto. Verifique o console.")
        } else {
        console.log("✅ Produto criado:", data)
        alert("✅ Produto criado com sucesso!")
        setName("")
        setDescription("")
        setPrice("")
        setCategory("")
        setImages([])
        setVariations([])
        }
    }

    return (
        <div className="p-8 space-y-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">Novo Produto</h1>

        <input
            className="border p-2 w-full"
            placeholder="Título"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <textarea
            className="border p-2 w-full"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <input
            className="border p-2 w-full"
            placeholder="Preço"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
        />
        <input
            className="border p-2 w-full"
            placeholder="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        />

        <div>
            <label className="block mb-1 font-semibold">Imagens principais</label>
            <input type="file" multiple onChange={handleAddImages} />
            <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((url, i) => (
                <img key={i} src={url} className="w-16 h-16 object-cover rounded" />
            ))}
            </div>
        </div>

        <button
            className="bg-gray-200 px-3 py-1 rounded mt-4"
            onClick={addVariation}
        >
            + Adicionar variação
        </button>

        {variations.map((v, i) => (
            <div key={i} className="border p-3 mt-2 rounded space-y-2">
            <input
                className="border p-1 mr-2"
                placeholder="Cor"
                value={v.color}
                onChange={(e) => updateVariation(i, "color", e.target.value)}
            />
            <input
                className="border p-1 mr-2"
                placeholder="Tamanho"
                value={v.size}
                onChange={(e) => updateVariation(i, "size", e.target.value)}
            />
            <input
                className="border p-1 w-24"
                type="number"
                placeholder="Estoque"
                value={v.stock}
                onChange={(e) => updateVariation(i, "stock", parseInt(e.target.value))}
            />
            <div>
                <label className="block mb-1 text-sm">Imagem da variação</label>
                <input
                type="file"
                onChange={(e) => {
                    if (!e.target.files) return
                    handleVariationImage(i, e.target.files[0])
                }}
                />
                {v.image && (
                <img src={v.image} className="w-16 h-16 object-cover rounded mt-1" />
                )}
            </div>
            </div>
        ))}

        <button
            disabled={loading}
            className="bg-pink-600 text-white px-4 py-2 rounded mt-4 hover:bg-pink-700"
            onClick={handleSubmit}
        >
            {loading ? "Salvando..." : "Salvar Produto"}
        </button>
        </div>
    )
    }
