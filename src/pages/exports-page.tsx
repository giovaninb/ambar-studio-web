import { useQuery } from "@tanstack/react-query"

import { CodeViewer } from "@/components/common/code-viewer"
import { AppLayout } from "@/components/layout/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  const { data: scenarioJson = "{}" } = useQuery({
    queryKey: ["export-json", "scn-001"],
    queryFn: () => api.exportScenarioAsJson("scn-001"),
  })

  return (
    <AppLayout title="Exportações" subtitle="Visualização técnica em JSON e FHIR Bundle">
      <section className="mb-4 rounded-xl border bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Valide estrutura e interoperabilidade antes de integrar com consumidores externos.
        </p>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <CodeViewer title="JSON do cenário (mock)" code={scenarioJson} />
        <CodeViewer
          title="FHIR Bundle (mock)"
          code={JSON.stringify(mockFhirBundle, null, 2)}
        />
      </section>

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
