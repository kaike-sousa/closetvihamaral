import { supabase } from "@/lib/supabase"

/**
 * BUSCA PEDIDOS DE UM USUÁRIO ESPECÍFICO (USADO NO PERFIL)
 */
export async function getUserOrders(userId: string) {
    const { data, error } = await supabase
        .from("pedidos")
        .select(`
            *,
            pedido_itens (
                quantidade,
                tamanho,
                cor,
                produto_nome
            )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Erro ao buscar pedidos do usuário:", error.message)
        return []
    }
    return data
}

/**
 * BUSCA TODOS OS PEDIDOS (USADO NO ADMIN)
 */
export async function getOrders() {
    const { data, error } = await supabase
        .from("pedidos")
        .select(`
            *,
            pedido_itens (
                quantidade,
                tamanho,
                cor,
                produto_nome
            )
        `)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Erro ao buscar todos os pedidos:", error.message)
        return []
    }
    return data
}

/**
 * CRIA UM NOVO PEDIDO (USADO NO CARRINHO)
 */
export async function createOrder(orderData: { 
    total: number; 
    items: any[] 
}) {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Usuário não autenticado")

        const { data: order, error: orderError } = await supabase
            .from('pedidos')
            .insert([{
                user_id: user.id,
                total: orderData.total,
                status: 'pendente'
            }])
            .select()
            .single()

        if (orderError) throw orderError

        const pedidoItens = orderData.items.map(item => ({
            pedido_id: order.id,
            produto_nome: item.name || item.nome, 
            quantidade: item.quantity || item.quantidade,
            tamanho: item.size,
            cor: item.color
        }))

        const { error: itemsError } = await supabase
            .from('pedido_itens')
            .insert(pedidoItens)

        if (itemsError) throw itemsError
        return order
    } catch (error: any) {
        console.error("Erro ao criar pedido:", error)
        throw error
    }
}

/**
 * ATUALIZA O STATUS DE UM PEDIDO
 */
export async function updateOrderStatus(orderId: string, status: string) {
    const { error } = await supabase
        .from("pedidos")
        .update({ status })
        .eq("id", orderId)

    return !error
}