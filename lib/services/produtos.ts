    import { supabase } from "@/lib/supabase"

    export async function createProduct(product:any) {
    const { data, error } = await supabase
        .from("produtos")
        .insert(product)
        .select()
        .single()

    if (error) {
        console.error(error)
        return null
    }

    return data
    }