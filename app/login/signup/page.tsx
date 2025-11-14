    "use client";

    import Link from "next/link";
    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import { supabase } from "@/lib/supabase";

    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

    import { Eye, EyeOff } from "lucide-react";

    export default function SignUpPage() {
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");

    async function handleSignup(e: any) {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
        setError("As senhas não coincidem.");
        return;
        }

        const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
            fullName,
            phone,
            },
        },
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
                type="text"
                placeholder="Nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                />

                <Input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />

                <Input
                type="text"
                placeholder="Seu número de telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                />

                {/* Campo senha com olho */}
                <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Crie uma senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                </div>

                {/* Confirmar senha */}
                <div className="relative">
                <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button
                    type="button"
                    onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-3 text-gray-500"
                >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                </div>

                {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button type="submit" className="w-full">
                Cadastrar
                </Button>

                <div className="text-sm text-center mt-2">
                Já tem conta?{" "}
                <Link href="/login" className="text-blue-600">
                    Entrar
                </Link>
                </div>
            </form>
            </CardContent>
        </Card>
        </div>
    );
    }
