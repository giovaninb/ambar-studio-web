import { createBrowserRouter } from "react-router-dom"

import { CohortsPage } from "@/pages/cohorts-page"
import { DashboardPage } from "@/pages/dashboard-page"
import { ExportsPage } from "@/pages/exports-page"
import { NotFoundPage } from "@/pages/not-found-page"
import { ScenarioDetailPage } from "@/pages/scenario-detail-page"
import { ScenarioNewPage } from "@/pages/scenario-new-page"
import { ScenariosPage } from "@/pages/scenarios-page"
import { SettingsPage } from "@/pages/settings-page"
import { TemplatesPage } from "@/pages/templates-page"

export const router = createBrowserRouter([
  { path: "/", element: <DashboardPage /> },
  { path: "/scenarios", element: <ScenariosPage /> },
  { path: "/scenarios/new", element: <ScenarioNewPage /> },
  { path: "/scenarios/:id", element: <ScenarioDetailPage /> },
  { path: "/templates", element: <TemplatesPage /> },
  { path: "/cohorts", element: <CohortsPage /> },
  { path: "/exports", element: <ExportsPage /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "*", element: <NotFoundPage /> },
])
