import { useQuery } from "@tanstack/react-query"

import { AppLayout } from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"

export function CohortsPage() {
  const { data: cohorts = [] } = useQuery({
    queryKey: ["cohorts"],
    queryFn: api.listCohorts,
  })

  return (
    <AppLayout title="Coortes" subtitle="Geração sintética de pacientes em lote">
      <section className="mb-4 rounded-xl border bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Defina parâmetros clínicos e gere coortes para simulação e testes.
        </p>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>Cohort Builder</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input placeholder="Nome da coorte" />
            <Input type="number" placeholder="Quantidade de pacientes" />
            <Input placeholder="Template base" />
            <Input placeholder="Faixa etária" />
            <Input placeholder="Condições" />
            <Input placeholder="Severidade" />
            <div className="flex justify-end">
              <Button>Gerar coorte</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>Coortes recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cohorts.map((cohort) => (
              <article key={cohort.id} className="rounded-lg border bg-background p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="font-medium">{cohort.name}</h3>
                  <Badge variant="outline">{cohort.patientCount} pacientes</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Condições: {cohort.conditions.join(", ")}
                </p>
              </article>
            ))}
          </CardContent>
        </Card>
      </section>
    </AppLayout>
  )
}
