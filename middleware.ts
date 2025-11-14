
    import { NextResponse } from "next/server";
    import { createServerClient } from "@supabase/ssr";

    export async function middleware(req: any) {
    const res = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
        cookies: {
            get(name: string) {
            return req.cookies.get(name)?.value;
            },
            set(name: string, value: string, options: any) {
            res.cookies.set(name, value, options);
            },
            remove(name: string, options: any) {
            res.cookies.set(name, "", { ...options, maxAge: 0 });
            },
        },
        }
    );

    // pegar sessão
    const {
        data: { session },
    } = await supabase.auth.getSession();

    // ❌ não logado → login
    if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // buscar role no banco
    const { data: userData } = await supabase
        .from("user")
        .select("role")
        .eq("auth_id", session.user.id)
        .single();

    // ❌ sem registro na tabela user
    if (!userData) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // ❌ se não for admin e tentar acessar /admin
    if (req.nextUrl.pathname.startsWith("/admin") && userData.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
    }

    export const config = {
    matcher: ["/admin/:path*", "/admin"],
    };
