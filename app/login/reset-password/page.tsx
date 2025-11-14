    "use client";

    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import { supabase } from "@/lib/supabase";

    import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";

    import { Eye, EyeOff } from "lucide-react";

    export default function ResetPasswordPage() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    async function handleReset(e: any) {
        e.preventDefault();

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
        setMsg(error.message);
        return;
        }

        setMsg("Senha redefinida com sucesso!");
        setTimeout(() => router.push("/login"), 1500);
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
        <Card className="max-w-md w-full shadow-xl">
            <CardHeader>
            <CardTitle className="text-center text-2xl">Nova Senha</CardTitle>
            </CardHeader>

            <CardContent>
            <form onSubmit={handleReset} className="space-y-4">

                {/* Campo de senha com mostrar/ocultar */}
                <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua nova senha"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                </div>

                <Button className="w-full">Salvar</Button>

                {msg && <p className="text-center text-sm mt-2">{msg}</p>}
            </form>
            </CardContent>
        </Card>
        </div>
    );
    }
