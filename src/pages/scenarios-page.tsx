import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import { ScenarioCard } from "@/components/cards/scenario-card"
import { AppLayout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

export function ScenariosPage() {
  const { data: scenarios = [] } = useQuery({
    queryKey: ["scenarios"],
    queryFn: api.listScenarios,
  })

  return (
    <AppLayout title="Cenários" subtitle="Gestão de cenários clínicos sintéticos">
      <div className="mb-4 flex items-center justify-between rounded-xl border bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Visualize, duplique e evolua jornadas clínicas com consistência.
        </p>
        <Button render={<Link to="/scenarios/new" />}>Novo cenário</Button>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {scenarios.map((scenario) => (
          <ScenarioCard key={scenario.id} scenario={scenario} />
        ))}
      </section>
    </AppLayout>
  )
}
