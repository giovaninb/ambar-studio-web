import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"

import { CodeViewer } from "@/components/common/code-viewer"
import { EmptyPanel, ErrorPanel, LoadingPanel } from "@/components/common/state-panels"
import { AppLayout } from "@/components/layout/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"

const mockFhirBundle = {
  resourceType: "Bundle",
  type: "collection",
  entry: [
    { resource: { resourceType: "Patient", id: "pat-001" } },
    { resource: { resourceType: "Encounter", id: "enc-001", status: "finished" } },
    { resource: { resourceType: "Observation", id: "obs-001", status: "final" } },
  ],
}

export function ExportsPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState("")

  const { data: scenarios = [] } = useQuery({
    queryKey: ["scenarios"],
    queryFn: api.listScenarios,
  })

  const scenarioOptions = useMemo(
    () => scenarios.map((scenario) => ({ id: scenario.id, label: scenario.name })),
    [scenarios],
  )

  const activeScenarioId = selectedScenarioId || scenarioOptions[0]?.id || ""

  const {
    data: scenarioJson = "{}",
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["export-json", activeScenarioId],
    queryFn: () => api.exportScenarioAsJson(activeScenarioId),
    enabled: Boolean(activeScenarioId),
  })

  return (
    <AppLayout title="Exportações" subtitle="Visualização técnica em JSON e FHIR Bundle">
      <section className="mb-4 rounded-xl border bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Valide estrutura e interoperabilidade antes de integrar com consumidores externos.
        </p>
      </section>
      <section className="mb-4 max-w-xl rounded-xl border bg-card p-4">
        <label className="mb-2 block text-sm font-medium">ID do cenário para exportação</label>
        <Input
          value={selectedScenarioId || activeScenarioId}
          onChange={(event) => setSelectedScenarioId(event.target.value)}
          list="scenario-options"
          placeholder="Informe ou selecione um cenário"
        />
        <datalist id="scenario-options">
          {scenarioOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </datalist>
      </section>
      {isPending ? (
        <LoadingPanel
          title="Gerando exportação"
          description="Preparando JSON e visão de interoperabilidade."
        />
      ) : null}
      {isError ? (
        <ErrorPanel
          title="Falha ao exportar cenário"
          description="Não foi possível montar o payload de exportação."
          actionLabel="Tentar novamente"
          onAction={() => void refetch()}
        />
      ) : null}
      {!isPending && !isError && !activeScenarioId ? (
        <EmptyPanel
          title="Selecione um cenário"
          description="Informe um ID para visualizar a exportação JSON/FHIR."
        />
      ) : null}
      {!isPending && !isError && activeScenarioId ? (
        <section className="grid gap-6 xl:grid-cols-2">
          <CodeViewer title="JSON do cenário" code={scenarioJson} />
          <CodeViewer
            title="FHIR Bundle (mock)"
            code={JSON.stringify(mockFhirBundle, null, 2)}
          />
        </section>
      ) : null}

      <Card className="mt-6 border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle>Validade estrutural</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Estrutura mock válida para inspeção inicial de interoperabilidade.
        </CardContent>
      </Card>
    </AppLayout>
  )
}
