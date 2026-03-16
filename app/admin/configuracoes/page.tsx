'use client'

import { useState } from 'react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'Bella Moda',
    email: 'contato@bellamoda.com',
    phone: '(11) 99999-0000',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    instagram: '@bellamoda',
    facebook: '/bellamoda',
  })

  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate save
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-semibold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações da sua loja</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-background rounded-xl border border-border p-6 space-y-6">
            <h2 className="font-semibold">Informações da Loja</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Nome da Loja</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email de Contato</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Endereço</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="bg-background rounded-xl border border-border p-6 space-y-6">
            <h2 className="font-semibold">Redes Sociais</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Instagram</label>
              <input
                type="text"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="@sualoja"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Facebook</label>
              <input
                type="text"
                value={settings.facebook}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="/sualoja"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-foreground text-background px-6 py-3 rounded-lg font-medium hover:bg-foreground/90 transition-colors"
            >
              Salvar Alterações
            </button>
            {saved && (
              <span className="text-sm text-green-600">Configurações salvas com sucesso!</span>
            )}
          </div>
        </form>
      </div>
  )
}
