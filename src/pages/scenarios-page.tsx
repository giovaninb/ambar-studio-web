import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"

import { ScenarioCard } from "@/components/cards/scenario-card"
import { EmptyPanel, ErrorPanel, LoadingPanel } from "@/components/common/state-panels"
import { AppLayout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

export function ScenariosPage() {
  const navigate = useNavigate()
  const { data: scenarios = [], isPending, isError, refetch } = useQuery({
    queryKey: ["scenarios"],
    queryFn: api.listScenarios,
  })

  return (
    <AppLayout title="Cenários" subtitle="Gestão de cenários clínicos sintéticos">
      <div className="mb-4 flex flex-col gap-3 rounded-xl border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Visualize, duplique e evolua jornadas clínicas com consistência.
        </p>
        <Button className="w-full sm:w-auto" render={<Link to="/scenarios/new" />}>
          Novo cenário
        </Button>
      </div>
      {isPending ? (
        <LoadingPanel
          title="Carregando cenários"
          description="Buscando cenários clínicos disponíveis."
        />
      ) : null}
      {isError ? (
        <ErrorPanel
          title="Falha ao carregar cenários"
          description="Não foi possível carregar os dados agora."
          actionLabel="Tentar novamente"
          onAction={() => void refetch()}
        />
      ) : null}
      {!isPending && !isError && scenarios.length === 0 ? (
        <EmptyPanel
          title="Nenhum cenário disponível"
          description="Crie seu primeiro cenário para iniciar a jornada clínica."
          actionLabel="Novo cenário"
          onAction={() => navigate("/scenarios/new")}
        />
      ) : null}
      {!isPending && !isError && scenarios.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
        </section>
      ) : null}
    </AppLayout>
  )
}
