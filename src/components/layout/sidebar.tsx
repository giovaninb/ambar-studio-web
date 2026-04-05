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
    <aside className="fixed inset-y-0 left-0 z-20 w-64 border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Ambar</p>
          <h1 className="text-lg font-semibold">Scenario Studio</h1>
        </div>
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
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
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
