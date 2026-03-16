'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
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

    // verificar role no banco
    const { data: userProfile } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()

    // ADMIN
    if (userProfile?.role === 'admin') {
      router.push('/admin')
      return
    }

    // USER NORMAL
    router.push('/app')

    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col">

      <div className="p-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a loja
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">

        <div className="w-full max-w-md">

          <div className="bg-background rounded-xl shadow-sm p-8">

            <div className="text-center mb-8">
              <h1 className="font-serif text-2xl font-semibold">
                Bella Moda
              </h1>

              <p className="text-muted-foreground mt-2">
                Painel Administrativo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              {/* EMAIL */}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bellamoda.com"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-medium mb-2">
                  Senha
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                    className="w-full px-4 py-3 pr-12 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword
                      ? <EyeOff className="h-5 w-5" />
                      : <Eye className="h-5 w-5" />}
                  </button>

                </div>

                <div className="text-right mt-2">

                  <Link
                    href="/admin/login/forgot"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Esqueci minha senha
                  </Link>

                </div>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-foreground text-background py-3 rounded-md font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

            </form>

            {/* REGISTER */}

            <div className="mt-6 text-center text-sm">

              Não possui conta?{' '}

              <Link
                href="/admin/login/register"
                className="font-medium hover:underline"
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