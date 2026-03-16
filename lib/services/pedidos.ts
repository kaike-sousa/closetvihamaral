    import { supabase } from "@/lib/supabase"

    export async function getOrders() {
    const { data, error } = await supabase
        .from("pedidos")
        .select(`
        *,
        pedido_itens (
            quantity,
            size,
            color,
            produtos (
            name
            )
        )
        `)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Erro ao buscar pedidos:", error.message)
        return []
    }

    return data
    }

    export async function updateOrderStatus(orderId: string, status: string) {
    const { error } = await supabase
        .from("pedidos")
        .update({ status })
        .eq("id", orderId)

    if (error) {
        console.error("Erro ao atualizar status:", error)
    }

    return true
    }