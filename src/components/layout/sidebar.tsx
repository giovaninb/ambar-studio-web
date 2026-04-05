import { Activity, Boxes, FileOutput, FlaskConical, LayoutDashboard, Settings } from "lucide-react"
import { NavLink } from "react-router-dom"

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/scenarios", label: "Cenários", icon: Activity },
  { to: "/templates", label: "Templates", icon: Boxes },
  { to: "/cohorts", label: "Coortes", icon: FlaskConical },
  { to: "/exports", label: "Exportações", icon: FileOutput },
  { to: "/settings", label: "Configurações", icon: Settings },
]

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-64 border-r bg-sidebar text-sidebar-foreground">
      <div className="border-b px-6 py-5">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Ambar</p>
        <h1 className="mt-1 text-lg font-semibold">Scenario Studio</h1>
        <p className="mt-2 rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground">
          Ambiente sintético ativo
        </p>
      </div>
      <nav className="space-y-1 p-4">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                ].join(" ")
              }
            >
              <Icon className="size-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
