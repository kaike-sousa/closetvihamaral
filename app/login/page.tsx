    "use client";

    import Link from "next/link";
    import { useState } from "react";
    import { useRouter } from "next/navigation";

    import { createClient } from "@/lib/utils/client";
    const supabase = createClient();

    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

    import { Eye, EyeOff } from "lucide-react";

    export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(e: any) {
        e.preventDefault();
        setLoading(true);
        setError("");

        // 🔹 Login Supabase
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
        });

        if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
        }

        const userId = data.user.id;

        // 🔥 Buscar role na tabela "users"
        const { data: userRow, error: roleError } = await supabase
        .from("users")               // tabela certa
        .select("role")              // coluna certa
        .eq("auth_uid", userId)      // coluna certa
        .single();

        if (roleError) {
        console.error("Erro ao buscar role:", roleError);
        setError("Erro ao validar usuário.");
        setLoading(false);
        return;
        }

        // 👑 Admin → Dashboard Admin
        if (userRow?.role === "admin") {
        router.push("/admin");
        return;
        }

        // 👤 Usuário comum → Home
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

                {/* Campo senha */}
                <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                </div>

                {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
                )}

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
