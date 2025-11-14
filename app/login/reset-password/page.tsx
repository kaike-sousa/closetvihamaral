    "use client";

    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import { supabase } from "@/lib/supabase";
    import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";

    export default function ResetPasswordPage() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

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
            <CardTitle className="text-center text-2xl">
                Nova Senha
            </CardTitle>
            </CardHeader>

            <CardContent>
            <form onSubmit={handleReset} className="space-y-4">

                <Input
                type="password"
                placeholder="Digite sua nova senha"
                required
                onChange={(e) => setPassword(e.target.value)}
                />

                <Button className="w-full">Salvar</Button>

                {msg && <p className="text-center text-sm mt-2">{msg}</p>}

            </form>
            </CardContent>
        </Card>
        </div>
    );
    }
