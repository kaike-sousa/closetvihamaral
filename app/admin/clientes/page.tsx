'use client'

import { useEffect, useState } from 'react'
import { getClientes } from '@/lib/services/clientes'

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

useEffect(() => {
    async function loadCustomers() {
      const data = await getClientes() // Chama o serviço que busca no Supabase
      setCustomers(data) // Salva os dados no estado para renderizar na tela
    }

    loadCustomers()
  }, [])

  const formatDate = (date: string) => {
    if (!date) return '-'

    return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
  }

  return (
      <div className="space-y-6">

        <div>
          <h1 className="text-2xl font-semibold">Clientes</h1>
          <p className="text-muted-foreground">
            Lista de clientes cadastrados na loja
          </p>
        </div>

        <div className="bg-background rounded-xl border border-border overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm">Cliente</th>
                  <th className="text-left p-4 text-sm">Email</th>
                  <th className="text-left p-4 text-sm">Telefone</th>
                  <th className="text-left p-4 text-sm">CPF</th>
                  <th className="text-left p-4 text-sm">Gênero</th>
                  <th className="text-left p-4 text-sm">Endereço</th>
                  <th className="text-left p-4 text-sm">Cliente desde</th>
                </tr>
              </thead>

              <tbody>

                {customers.map((customer) => (

                  <tr
                    key={customer.id}
                    className="border-b border-border hover:bg-muted/30"
                  >

                    <td className="p-4">
                      <p className="font-medium">
                        {customer.nome} {customer.sobrenome}
                      </p>
                    </td>

                    <td className="p-4 text-sm text-muted-foreground">
                      {customer.email}
                    </td>

                    <td className="p-4">
                      {customer.telefone || '-'}
                    </td>

                    <td className="p-4">
                      {customer.cpf || '-'}
                    </td>

                    <td className="p-4 capitalize">
                      {customer.genero || '-'}
                    </td>

                    <td className="p-4">
                      {customer.endereco || '-'}
                    </td>

                    <td className="p-4">
                      {formatDate(customer.created_at)}
                    </td>

                  </tr>

                ))}

                {customers.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center p-6 text-muted-foreground"
                    >
                      Nenhum cliente encontrado
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
  )
}