import { Bell, CalendarDays, Menu, Search } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

interface HeaderProps {
  title: string
  subtitle?: string
  onOpenMenu?: () => void
}

export function Header({ title, subtitle, onOpenMenu }: HeaderProps) {
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <header className="sticky top-0 z-10 border-b bg-background/90 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2 lg:mb-0">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Abrir menu"
              className="lg:hidden"
              onClick={onOpenMenu}
            >
              <Menu />
            </Button>
            <h2 className="text-xl font-semibold tracking-tight lg:text-2xl">{title}</h2>
          </div>
          {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-lg border bg-card px-2 py-1 text-xs text-muted-foreground lg:flex">
            <CalendarDays className="size-3.5" />
            {today}
          </div>
          <Button size="sm" className="hidden sm:inline-flex" render={<Link to="/scenarios/new" />}>
            Novo cenário
          </Button>
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
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
