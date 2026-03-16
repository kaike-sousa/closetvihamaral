'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { AdminSidebar } from './sidebar'

export function AdminWrapper({ children }: { children: React.ReactNode }) {

  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function checkUser() {

      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push('/admin/login')
      }

      setLoading(false)
    }

    checkUser()

  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted flex">
      <AdminSidebar />
      <main className="flex-1">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  )
}