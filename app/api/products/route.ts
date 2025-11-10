    import { NextResponse } from "next/server"
    import { PrismaClient } from "@prisma/client"

    const prisma = new PrismaClient()

    // GET /api/products
    export async function GET() {
    const products = await prisma.product.findMany({
        include: {
        images: true,
        variants: {
            include: {
            color: true,
            size: true,
            },
        },
        },
    })
    return NextResponse.json(products)
    }

    // POST /api/products
    export async function POST(request: Request) {
    const data = await request.json()
    const product = await prisma.product.create({
        data,
    })
    return NextResponse.json(product)
    }
