    'use client'

    import { useState } from 'react'
    import Link from 'next/link'

    export default function ForgotPasswordPage(){

    const [email,setEmail] = useState('')
    const [sent,setSent] = useState(false)

    function handleSubmit(e:any){
    e.preventDefault()
    setSent(true)
    }
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf2f8] via-white to-[#fce7f3] p-6">

        <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-gray-200/60 p-10 rounded-3xl shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
            Recuperar senha
            </h1>
            <p className="text-sm text-gray-500 mt-2">
            Enviaremos um link para redefinir sua senha
            </p>
        </div>

        {sent ? (
            <div className="text-center space-y-4">

            <div className="bg-green-50 border border-green-200 text-green-600 text-sm p-4 rounded-xl">
                Email enviado com sucesso ✉️
            </div>

            <Link
                href="/admin/login"
                className="inline-block text-sm text-gray-600 hover:text-black transition underline"
            >
                Voltar para o login
            </Link>

            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-gray-500">
                Email
                </label>

                <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 active:scale-[0.98] transition-all duration-200"
            >
                Enviar link
            </button>

            </form>
        )}

        {/* FOOTER */}
        {!sent && (
            <div className="mt-8 text-center text-sm text-gray-600">
            Lembrou sua senha?{" "}
            <Link
                href="/admin/login"
                className="font-medium text-black hover:underline"
            >
                Entrar
            </Link>
            </div>
        )}

        </div>

    </div>
    )
    }