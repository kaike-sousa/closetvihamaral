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

        <div className="min-h-screen flex items-center justify-center bg-muted p-6">

        <div className="w-full max-w-lg bg-background p-8 rounded-xl shadow">

            <h1 className="text-2xl font-semibold text-center mb-6">
            Criar Conta
            </h1>

            {error && (
            <p className="text-red-500 text-sm mb-4">
                {error}
            </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">

                <input
                name="nome"
                placeholder="Nome"
                onChange={handleChange}
                required
                className="input"
                />

                <input
                name="sobrenome"
                placeholder="Sobrenome"
                onChange={handleChange}
                required
                className="input"
                />

            </div>

            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="input"
            />

            <input
                name="nascimento"
                type="date"
                onChange={handleChange}
                required
                className="input"
            />

            <select
                name="genero"
                onChange={handleChange}
                required
                className="input"
            >
                <option value="">Selecione o gênero</option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
            </select>

            <input
                name="cpf"
                placeholder="CPF"
                onChange={handleChange}
                required
                className="input"
            />

            <input
                name="telefone"
                placeholder="Telefone"
                onChange={handleChange}
                required
                className="input"
            />

            <input
                name="endereco"
                placeholder="Endereço completo"
                onChange={handleChange}
                required
                className="input"
            />

            <input
                name="senha"
                type="password"
                placeholder="Senha"
                onChange={handleChange}
                required
                className="input"
            />

            <input
                name="confirmarSenha"
                type="password"
                placeholder="Confirmar senha"
                onChange={handleChange}
                required
                className="input"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded"
            >
                {loading ? 'Criando conta...' : 'Criar conta'}
            </button>

            </form>

            <div className="text-center mt-6 text-sm">
            Já possui conta?{' '}
            <Link href="/admin/login" className="underline">
                Entrar
            </Link>
            </div>

        </div>

        </div>

    )
    }