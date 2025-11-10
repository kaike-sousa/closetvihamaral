"use client"

import { Bell, Search, User } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-lg p-2 hover:bg-sidebar-accent transition-colors">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive"></span>
          </button>

          <button className="rounded-lg p-2 hover:bg-sidebar-accent transition-colors">
            <User className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
