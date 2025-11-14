    "use client"

    import { useEffect, useState } from "react"
    import { createClient } from "@/lib/utils/client"

    export function useUserRole() {
    const supabase = createClient()
    const [role, setRole] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
        const { data: sessionData } = await supabase.auth.getSession()

        if (!sessionData.session) {
            setRole(null)
            setLoading(false)
            return
        }

        const userId = sessionData.session.user.id

        const { data, error } = await supabase
            .from("users")          // <---- certo
            .select("role")
            .eq("auth_uid", userId) // <---- certo
            .single()

        if (error) console.log("Erro fetch role:", error)

        setRole(data?.role ?? null)
        setLoading(false)
        }

        load()
    }, [])

    return { role, loading }
    }
