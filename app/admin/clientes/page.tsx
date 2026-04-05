'use client'

import { useEffect, useState } from 'react'
import { getClientes } from '@/lib/services/clientes'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  RefreshCw, 
  Search,
  IdCard,
  GenderMale
} from 'lucide-react'

type Customer = {
  id: string
  nome: string
  sobrenome: string
  email: string
  telefone: string
  cpf: string
  genero: string
  endereco: string
  created_at: string
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  async function loadCustomers() {
    setLoading(true)
    try {
      const data = await getClientes()
      setCustomers(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  const filteredCustomers = customers.filter(c => 
    `${c.nome} ${c.sobrenome}`.toLowerCase().includes(filter.toLowerCase()) ||
    c.email.toLowerCase().includes(filter.toLowerCase()) ||
    c.cpf?.includes(filter)
  )

  const formatDate = (date: string) => {
    if (!date) return '-'
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Clientes</h1>
          <p className="text-sm text-slate-500">Gerencie a base de usuários cadastrados.</p>
        </div>
        <button 
          onClick={loadCustomers}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm font-medium text-slate-700 text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Sincronizar
        </button>
      </div>

      {/* Busca */}
      <div className="relative w-full max-w-md group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input 
          type="text"
          placeholder="Buscar por nome, e-mail ou CPF..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="p-20 text-center text-slate-400 italic bg-white rounded-2xl border border-slate-100">
          Carregando clientes...
        </div>
      ) : (
        <>
          {/* VERSÃO DESKTOP (Tabela) */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-200">
                  <tr>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Contato</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Documento</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Endereço</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Desde</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 font-bold text-xs">
                            {customer.nome[0]}{customer.sobrenome[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 leading-none">{customer.nome} {customer.sobrenome}</p>
                            <p className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded mt-1 inline-block uppercase font-bold tracking-tighter">
                              {customer.genero || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" /> {customer.email}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                          <Phone className="w-3.5 h-3.5" /> {customer.telefone || '-'}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600 font-mono">
                        {customer.cpf || '-'}
                      </td>
                      <td className="p-4">
                        <p className="text-xs text-slate-600 max-w-[200px] truncate leading-relaxed">
                          {customer.endereco || '-'}
                        </p>
                      </td>
                      <td className="p-4 text-right">
                        <div className="text-xs text-slate-500 flex items-center justify-end gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-300" />
                          {formatDate(customer.created_at)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* VERSÃO MOBILE (Cards) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 text-lg font-bold">
                    {customer.nome[0]}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-slate-900 truncate">{customer.nome} {customer.sobrenome}</p>
                    <p className="text-xs text-slate-500 truncate">{customer.email}</p>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-lg uppercase font-black">
                    {customer.genero || 'N/A'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50/50 rounded-xl">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
                      <Phone className="w-3 h-3" /> Telefone
                    </p>
                    <p className="text-xs font-semibold text-slate-700">{customer.telefone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
                      <IdCard className="w-3 h-3" /> CPF
                    </p>
                    <p className="text-xs font-semibold text-slate-700 font-mono">{customer.cpf || '-'}</p>
                  </div>
                </div>

                <div className="space-y-1">
                   <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Endereço
                   </p>
                   <p className="text-xs text-slate-600 leading-relaxed">{customer.endereco || '-'}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Desde {formatDate(customer.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Estado Vazio */}
      {!loading && filteredCustomers.length === 0 && (
        <div className="p-16 text-center bg-white rounded-2xl border border-slate-200">
          <div className="inline-flex p-4 rounded-full bg-slate-50 text-slate-300 mb-4">
             <User className="w-10 h-10" />
          </div>
          <p className="text-slate-500 font-medium">Nenhum cliente encontrado.</p>
        </div>
      )}
    </div>
  )
}