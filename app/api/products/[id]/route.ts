    import { NextResponse } from "next/server"
    import { PrismaClient } from "@prisma/client"

    const prisma = new PrismaClient()

    // DELETE /api/products/:id
    export async function DELETE(
    _req: Request,
    { params }: { params: { id: string } }
    ) {
    await prisma.product.delete({
        where: { id: Number(params.id) },
    })
    return NextResponse.json({ ok: true })
    }

    // PATCH /api/products/:id
    export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
    ) {
    const data = await request.json()
    const updated = await prisma.product.update({
        where: { id: Number(params.id) },
        data,
    })
    return NextResponse.json(updated)
    }

    // GET /api/products/:id
    export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
    ) {
    const product = await prisma.product.findUnique({
        where: { id: Number(params.id) },
        include: {
        images: true,
        variants: {
            include: { color: true, size: true },
        },
        },
    })
    return NextResponse.json(product)
    }
