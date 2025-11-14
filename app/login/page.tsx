    "use client";

    import Link from "next/link";
    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import { supabase } from "@/lib/supabase";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

    export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: any) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        });

        if (error) {
        setError(error.message);
        setLoading(false);
        return;
        }

        router.push("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <Card className="w-full max-w-md shadow-xl">
            <CardHeader>
            <CardTitle className="text-center text-2xl">Entrar</CardTitle>
            </CardHeader>

            <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">

                <Input
                type="email"
                placeholder="Seu e-mail"
                required
                onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                type="password"
                placeholder="Sua senha"
                required
                onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <Button className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
                </Button>

                <div className="flex justify-between text-sm">
                <Link href="/login/forgot-password" className="text-blue-600">
                    Esqueci minha senha
                </Link>

                <Link href="/login/signup" className="text-blue-600">
                    Criar conta
                </Link>
                </div>

            </form>
            </CardContent>
        </Card>
        </div>
    );
    }
