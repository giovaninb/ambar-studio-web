import { RouterProvider } from "react-router-dom"

import { AppProviders } from "@/app/providers"
import { router } from "@/app/router"

export function App() {
  return (
    <AppProviders>
      <div className="theme">
        <RouterProvider router={router} />
      </div>
    </AppProviders>
  )
}
