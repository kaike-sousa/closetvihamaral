    'use client'

    import { useState } from 'react'
    import { useRouter } from 'next/navigation'
    import Link from 'next/link'
    import { Eye, EyeOff, ArrowLeft, Mail, Lock } from 'lucide-react'
    import { supabase } from '@/lib/supabase'

    export default function AdminLoginPage() {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setError('')
        setLoading(true)

        const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        })

        if (error) {
        setError('Email ou senha inválidos')
        setLoading(false)
        return
        }

        const userId = data.user?.id

        const { data: userProfile } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single()

        if (userProfile?.role === 'admin') {
        router.push('/admin')
        } else {
        router.push('/')
        }
    }

    return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fdf2f8] via-white to-[#fce7f3]">

        {/* VOLTAR */}
        <div className="p-6">
        <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition group"
        >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="relative">
            Voltar para a loja
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>
        </Link>
        </div>

        {/* CONTAINER */}
        <div className="flex-1 flex items-center justify-center px-4">

        <div className="w-full max-w-md">

            <div className="bg-white/70 backdrop-blur-2xl border border-gray-200/60 rounded-3xl shadow-2xl p-10">

            {/* LOGO */}
            <Link
                href="/"
                className="flex flex-col items-center mb-8 group"
            >
                <div className="flex items-center gap-2">
                <h1 className="font-serif text-5xl font-bold text-gray-900 tracking-tight group-hover:opacity-80 transition">
                    closet
                </h1>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-7 h-7 text-gray-900"
                >
                    <path d="M12 3a2 2 0 00-2 2 2 2 0 004 0c0-1.1-.9-2-2-2z" />
                    <path d="M12 7v2l8 8H4l8-8z" />
                </svg>
                </div>

                <span className="text-xs tracking-[0.3em] text-gray-500 mt-2">
                VIH AMARAL
                </span>
            </Link>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">

                {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
                    {error}
                </div>
                )}

                {/* EMAIL */}
                <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-gray-500">
                    Email
                </label>

                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />

                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition"
                    />
                </div>
                </div>

                {/* SENHA */}
                <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-gray-500">
                    Senha
                </label>

                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />

                    <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition"
                    />

                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                    >
                    {showPassword
                        ? <EyeOff className="h-5 w-5" />
                        : <Eye className="h-5 w-5" />}
                    </button>
                </div>

                <div className="text-right">
                    <Link
                    href="/admin/login/forgot"
                    className="text-xs text-gray-500 hover:text-black transition"
                    >
                    Esqueci minha senha
                    </Link>
                </div>
                </div>

                {/* BOTÃO */}
                <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {loading ? 'Entrando...' : 'Entrar'}
                </button>

            </form>

            {/* REGISTER */}
            <div className="mt-8 text-center text-sm text-gray-600">
                Não possui conta?{" "}
                <Link
                href="/admin/login/register"
                className="font-medium text-black hover:underline"
                >
                Criar conta
                </Link>
            </div>

            </div>

        </div>

        </div>
    </div>
    )
        
    }