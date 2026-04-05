import { Bell, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/90 px-8 py-4 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2">
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
