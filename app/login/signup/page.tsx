    "use client";

    import Link from "next/link";
    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import { supabase } from "@/lib/supabase";

    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

    export default function SignUpPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleSignup(e: any) {
        e.preventDefault();
        setError("");

        const { error } = await supabase.auth.signUp({
        email,
        password,
        });

        if (error) {
        setError(error.message);
        return;
        }

        router.push("/login");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-md shadow-xl">
            <CardHeader>
            <CardTitle className="text-center text-2xl">Criar Conta</CardTitle>
            </CardHeader>

            <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">

                <Input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />

                <Input
                type="password"
                placeholder="Crie uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />

                {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button type="submit" className="w-full">Cadastrar</Button>

                <div className="text-sm text-center mt-2">
                Já tem conta?{" "}
                <Link href="/login" className="text-blue-600">Entrar</Link>
                </div>
            </form>
            </CardContent>
        </Card>
        </div>
    );
    }
