import { useState, type ReactNode } from "react"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"

interface AppLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function AppLayout({ title, subtitle, children }: AppLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="hidden lg:block">
        <Sidebar className="fixed inset-y-0 left-0 z-20 w-64" />
      </div>

      {isMobileSidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-label="Fechar menu"
        />
      ) : null}

      <Sidebar
        className={[
          "fixed inset-y-0 left-0 z-40 w-72 transition-transform duration-200 lg:hidden",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        onNavigate={() => setIsMobileSidebarOpen(false)}
      />

      <div className="lg:ml-64">
        <Header
          title={title}
          subtitle={subtitle}
          onOpenMenu={() => setIsMobileSidebarOpen(true)}
        />
        <main className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
