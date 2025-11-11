    import { NextResponse } from "next/server"
    import { createClient } from "@supabase/supabase-js"

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // ======================
    // GET — Listar produtos
    // ======================
    export async function GET() {
    try {
        const { data: products, error } = await supabase
        .from("products")
        .select("*")

        if (error) {
        console.error("❌ Erro ao buscar produtos:", error.message)
        return NextResponse.json(
            { error: "Erro ao buscar produtos" },
            { status: 500 }
        )
        }

        return NextResponse.json(products)
    } catch (err) {
        console.error("❌ Erro inesperado:", err)
        return NextResponse.json({ error: "Erro inesperado" }, { status: 500 })
    }
    }

    // ======================
    // POST — Criar produto
    // ======================
    export async function POST(request: Request) {
    try {
        const data = await request.json()

        const { error } = await supabase.from("products").insert([
        {
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            image_url: data.image_url,
        },
        ])

        if (error) {
        console.error("❌ Erro ao criar produto:", error.message)
        return NextResponse.json(
            { error: "Erro ao criar produto" },
            { status: 500 }
        )
        }

        return NextResponse.json({ message: "✅ Produto criado com sucesso!" })
    } catch (err) {
        console.error("❌ Erro inesperado:", err)
        return NextResponse.json({ error: "Erro inesperado" }, { status: 500 })
    }
    }
