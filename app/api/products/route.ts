    import { NextResponse } from "next/server"
    import { PrismaClient } from "@prisma/client"

    const prisma = new PrismaClient()

    export async function POST(req: Request) {
    try {
        const data = await req.json()

        const product = await prisma.product.create({
        data: {
            slug: data.slug,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,

            images: {
            create: data.images.map((url: string) => ({ url })),
            },

            variants: {
            create: data.variants.map((variant: any) => ({
                color: {
                connectOrCreate: {
                    where: { name: variant.color.name },
                    create: {
                    name: variant.color.name,
                    hex: variant.color.hex,
                    image: variant.color.image,
                    },
                },
                },
                size: {
                connectOrCreate: {
                    where: { name: variant.size },
                    create: { name: variant.size },
                },
                },
                stock: variant.stock,
            })),
            },
        },
        })

        return NextResponse.json(product)
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: "erro" }, { status: 500 })
    }
    }
