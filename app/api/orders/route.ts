    import { NextResponse } from "next/server"
    import { PrismaClient } from "@prisma/client"

    const prisma = new PrismaClient()

    // ✅ GET /api/orders
    export async function GET() {
    try {
        const orders = await prisma.order.findMany({
        include: {
            items: {
            include: {
                product: true,
            },
            },
        },
        orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(orders)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
        { error: "Erro ao listar pedidos" },
        { status: 500 }
        )
    }
    }

    // ✅ POST /api/orders
    export async function POST(request: Request) {
    try {
        const data = await request.json()

        // Exemplo esperado:
        // data = { customerName, customerEmail, total, items: [{ productId, quantity, price }] }

        const order = await prisma.order.create({
        data: {
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            status: data.status || "pendente",
            total: data.total,
            items: {
            create: data.items,
            },
        },
        include: {
            items: { include: { product: true } },
        },
        })

        return NextResponse.json(order)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
        { error: "Erro ao criar pedido" },
        { status: 500 }
        )
    }
    }
