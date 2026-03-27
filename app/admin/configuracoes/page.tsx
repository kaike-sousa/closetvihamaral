'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  User, 
  MapPin, 
  LogOut, 
  Loader2, 
  Settings, 
  Save, 
  Phone, 
  Instagram, 
  Facebook,
  Mail,
  CheckCircle2
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminSettingsPage() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const router = useRouter()

    // Estado para o formulário
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        endereco: '',
        instagram: '',
        facebook: ''
    })

    useEffect(() => {
        async function loadProfile() {
            const { data: { user: authUser } } = await supabase.auth.getUser()

            if (!authUser) {
                router.push('/login')
                return
            }

            const { data: profile } = await supabase
                .from('users')
                .select('*')
                .eq('id', authUser.id)
                .single()

            if (profile) {
                setUser(profile)
                setFormData({
                    nome: profile.nome || '',
                    telefone: profile.telefone || '',
                    endereco: profile.endereco || '',
                    instagram: profile.instagram || '',
                    facebook: profile.facebook || ''
                })
            }
            setLoading(false)
        }

        loadProfile()
    }, [router])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        const { error } = await supabase
            .from('users')
            .update(formData)
            .eq('id', user.id)

        if (!error) {
            setUser({ ...user, ...formData })
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }
        setIsSaving(false)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto w-full px-4 py-8 animate-in fade-in duration-500">
            <div className="grid lg:grid-cols-4 gap-8">
                
                {/* COLUNA ESQUERDA: CARTÃO RESUMO (Igual ao seu ProfilePage) */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="h-20 w-20 bg-slate-900 text-white rounded-full flex items-center justify-center text-2xl font-serif mb-3 uppercase">
                                {user?.nome?.[0]}{user?.sobrenome?.[0] || user?.nome?.[1]}
                            </div>
                            <h2 className="font-bold text-xl">{user?.nome}</h2>
                            <p className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1">Administrador</p>
                            <p className="text-sm text-gray-500 mt-2">{user?.email}</p>
                        </div>

                        <div className="space-y-4 border-t pt-6">
                            <div className="flex items-start gap-3">
                                <Phone size={18} className="text-gray-400 mt-0.5" />
                                <div className="text-sm">
                                    <p className="font-semibold">Contato</p>
                                    <p className="text-gray-600">{user?.telefone || 'Não cadastrado'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-gray-400 mt-0.5" />
                                <div className="text-sm">
                                    <p className="font-semibold">Localização</p>
                                    <p className="text-gray-600 text-xs">{user?.endereco || 'Não cadastrado'}</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleLogout}
                            className="w-full mt-8 flex items-center justify-center gap-2 text-gray-400 hover:text-red-500 text-sm font-medium transition-colors"
                        >
                            <LogOut size={16} /> Sair do Painel
                        </button>
                    </div>
                </div>

                {/* COLUNA DIREITA: FORMULÁRIO DE CONFIGURAÇÕES */}
                <div className="lg:col-span-3">
                    <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Settings size={24} /> Configurações do Perfil
                    </h1>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
                            
                            {/* Informações Básicas */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nome Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        <input 
                                            type="text"
                                            value={formData.nome}
                                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">E-mail (Login)</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" size={18} />
                                        <input 
                                            type="text"
                                            disabled
                                            value={user?.email}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-50 bg-gray-50 text-gray-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Telefone / WhatsApp</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        <input 
                                            type="text"
                                            value={formData.telefone}
                                            onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Endereço da Loja</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        <input 
                                            type="text"
                                            value={formData.endereco}
                                            onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Redes Sociais */}
                            <div className="pt-6 border-t border-gray-50">
                                <h3 className="text-sm font-bold text-gray-800 mb-4">Redes Sociais</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Instagram</label>
                                        <div className="relative">
                                            <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
                                            <input 
                                                type="text"
                                                placeholder="@seuinsta"
                                                value={formData.instagram}
                                                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Facebook</label>
                                        <div className="relative">
                                            <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                                            <input 
                                                type="text"
                                                placeholder="fb.com/sualoja"
                                                value={formData.facebook}
                                                onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Botão Salvar */}
                            <div className="flex items-center justify-between pt-4">
                                {saved ? (
                                    <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                                        <CheckCircle2 size={20} /> Alterações salvas com sucesso!
                                    </div>
                                ) : <div />}
                                
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-black text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95 disabled:bg-gray-300 shadow-lg shadow-black/10"
                                >
                                    {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                    {isSaving ? 'Salvando...' : 'Salvar Configurações'}
                                </button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}