    'use client'

    import { useState } from 'react'
    import { useRouter } from 'next/navigation'
    import Link from 'next/link'
    import { supabase } from '@/lib/supabase'

    export default function RegisterPage() {

    const router = useRouter()

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')

    const [form,setForm] = useState({
        nome:'',
        sobrenome:'',
        email:'',
        nascimento:'',
        genero:'',
        cpf:'',
        telefone:'',
        endereco:'',
        senha:'',
        confirmarSenha:''
    })

    function handleChange(e:any){
        setForm({...form,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e:any){
        e.preventDefault()

        setError('')

        if(form.senha !== form.confirmarSenha){
        setError('Senhas não conferem')
        return
        }

        setLoading(true)

        // cria usuário no auth
        const { data, error: signError } = await supabase.auth.signUp({
        email: form.email,
        password: form.senha
        })

        if(signError){
        setError(signError.message)
        setLoading(false)
        return
        }

        const userId = data.user?.id

        // salvar dados na tabela users
        const { error: insertError } = await supabase
        .from('users')
        .insert({
            id: userId,
            nome: form.nome,
            sobrenome: form.sobrenome,
            email: form.email,
            telefone: form.telefone,
            cpf: form.cpf,
            genero: form.genero,
            endereco: form.endereco,
            data_nascimento: form.nascimento,
            role: 'user' // sempre cria como user
        })

        if(insertError){
        setError(insertError.message)
        setLoading(false)
        return
        }

        router.push('/admin/login')
    }
    
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf2f8] via-white to-[#fce7f3] p-6">

        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-2xl border border-gray-200/60 p-10 rounded-3xl shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">
            Criar Conta
            </h1>
            <p className="text-sm text-gray-500 mt-2">
            Preencha seus dados para continuar
            </p>
        </div>

        {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-6">
            {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

            {/* NOME */}
            <div className="grid grid-cols-2 gap-4">
            <input
                name="nome"
                placeholder="Nome"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition"
            />

            <input
                name="sobrenome"
                placeholder="Sobrenome"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition"
            />
            </div>

            {/* EMAIL */}
            <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition"
            />

            {/* NASCIMENTO + GENERO */}
            <div className="grid grid-cols-2 gap-4">
            <input
                name="nascimento"
                type="date"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition"
            />

            <select
                name="genero"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition text-gray-600"
            >
                <option value="">Gênero</option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
            </select>
            </div>

            {/* CPF + TELEFONE */}
            <div className="grid grid-cols-2 gap-4">
            <input
                name="cpf"
                placeholder="CPF"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition"
            />

            <input
                name="telefone"
                placeholder="Telefone"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition"
            />
            </div>

            {/* ENDEREÇO */}
            <input
            name="endereco"
            placeholder="Endereço completo"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition"
            />

            {/* SENHAS */}
            <div className="grid grid-cols-2 gap-4">
            <input
                name="senha"
                type="password"
                placeholder="Senha"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition"
            />

            <input
                name="confirmarSenha"
                type="password"
                placeholder="Confirmar senha"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black outline-none transition"
            />
            </div>

            {/* BOTÃO */}
            <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            >
            {loading ? 'Criando conta...' : 'Criar conta'}
            </button>

        </form>

        {/* LOGIN */}
        <div className="text-center mt-8 text-sm text-gray-600">
            Já possui conta?{" "}
            <Link href="/admin/login" className="font-medium text-black hover:underline">
            Entrar
            </Link>
        </div>

        </div>

    </div>
    )
    }