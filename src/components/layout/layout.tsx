import type { ReactNode } from "react"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"

interface AppLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function AppLayout({ title, subtitle, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <div className="ml-64">
        <Header title={title} subtitle={subtitle} />
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
