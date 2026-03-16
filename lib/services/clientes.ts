    import { supabase } from "@/lib/supabase"

    export async function getClientes() {

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "user")

    if (error) {
        console.error(error)
        return []
    }

    return data ?? []
    }