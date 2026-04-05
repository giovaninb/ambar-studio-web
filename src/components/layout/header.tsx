import { Bell, CalendarDays, Search } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <header className="sticky top-0 z-10 border-b bg-background/90 px-8 py-4 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-lg border bg-card px-2 py-1 text-xs text-muted-foreground lg:flex">
            <CalendarDays className="size-3.5" />
            {today}
          </div>
          <Button size="sm" render={<Link to="/scenarios/new" />}>
            Novo cenário
          </Button>
          <Button variant="outline" size="sm">
            <Search />
            Buscar
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Notificações">
            <Bell />
          </Button>
        </div>
      </div>
    </header>
  )
}
