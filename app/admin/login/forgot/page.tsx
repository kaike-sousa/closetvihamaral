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

    return(

    <div className="min-h-screen flex items-center justify-center">

    <div className="w-full max-w-md p-8 bg-background rounded-xl shadow">

    <h1 className="text-xl font-semibold mb-4">

    Recuperar senha

    </h1>

    {sent ? (

    <p className="text-green-600">

    Email enviado para recuperação de senha

    </p>

    ) : (

    <form onSubmit={handleSubmit} className="space-y-4">

    <input

    type="email"

    placeholder="Digite seu email"

    value={email}

    onChange={(e)=>setEmail(e.target.value)}

    required

    className="w-full border px-4 py-3 rounded"

    />

    <button className="w-full bg-black text-white py-3 rounded">

    Enviar link

    </button>

    </form>

    )}

    <div className="mt-4 text-sm">

    <Link href="/admin/login">

    Voltar ao login

    </Link>

    </div>

    </div>

    </div>

    )

    }