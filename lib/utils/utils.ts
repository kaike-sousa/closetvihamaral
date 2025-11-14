"use client"

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createBrowserClient } from "@supabase/ssr"

// Função usada pelos componentes (Button, Input, Card, etc)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para criar cliente Supabase
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
