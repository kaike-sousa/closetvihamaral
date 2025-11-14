    "use client";

    import { useState } from "react";
    import { supabase } from "@/lib/supabase";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
    import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

    export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    async function handleSend(e: any) {
        e.preventDefault();

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/login/reset-password`,
        });

        setMsg(
        error ? error.message : "Enviamos um e-mail com instruções para redefinir sua senha."
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
        <Card className="max-w-md w-full shadow-xl">

            <CardHeader>
            <CardTitle className="text-center text-2xl">
                Recuperar Senha
            </CardTitle>
            </CardHeader>

            <CardContent>
            <form onSubmit={handleSend} className="space-y-4">

                <Input
                type="email"
                placeholder="Seu e-mail"
                required
                onChange={(e) => setEmail(e.target.value)}
                />

                <Button className="w-full">Enviar e-mail</Button>

                {msg && <p className="text-sm text-center mt-2">{msg}</p>}

            </form>
            </CardContent>

        </Card>
        </div>
    );
    }
