    import { NextResponse } from "next/server"
    import { PrismaClient, Order } from "@prisma/client"

    const prisma = new PrismaClient()

    interface Params {
    params: { id: string }
    }

    // ✅ GET /api/orders/:id
    export async function GET(_req: Request, { params }: Params) {
    try {
        const order = await prisma.order.findUnique({
        where: { id: Number(params.id) },
        include: { items: { include: { product: true } } },
        })

        if (!order) {
        return NextResponse.json(
            { error: "Pedido não encontrado" },
            { status: 404 }
        )
        }

        return NextResponse.json(order)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
        { error: "Erro ao buscar pedido" },
        { status: 500 }
        )
    }
    }

    // ✅ PATCH /api/orders/:id
    export async function PATCH(request: Request, { params }: Params) {
    try {
        const data: Partial<Order> = await request.json()

        const updated = await prisma.order.update({
        where: { id: Number(params.id) },
        data,
        include: { items: { include: { product: true } } },
        })

        return NextResponse.json(updated)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
        { error: "Erro ao atualizar pedido" },
        { status: 500 }
        )
    }
    }

    // ✅ DELETE /api/orders/:id
    export async function DELETE(_req: Request, { params }: Params) {
    try {
        await prisma.order.delete({
        where: { id: Number(params.id) },
        })

        return NextResponse.json({ ok: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
        { error: "Erro ao deletar pedido" },
        { status: 500 }
        )
    }
    }
