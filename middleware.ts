    import { NextResponse } from "next/server"

    export function middleware(req: any) {
    // pega token salvo nos cookies do Supabase
    const token = req.cookies.get("sb-access-token")?.value

    // se tentar acessar /admin sem login → redireciona para /login
    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!token) {
        return NextResponse.redirect(new URL("/login", req.url))
        }
    }

    return NextResponse.next()
    }

    export const config = {
    matcher: ["/admin/:path*"],
    }
