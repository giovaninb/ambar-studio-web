import { useQuery } from "@tanstack/react-query"
import { Activity, FileText, FlaskConical, Layers } from "lucide-react"
import { Link } from "react-router-dom"

import { MetricCard } from "@/components/cards/metric-card"
import { ErrorPanel, LoadingPanel } from "@/components/common/state-panels"
import { AppLayout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"

export function DashboardPage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: api.getDashboard,
  })

  return (
    <AppLayout
      title="Dashboard"
      subtitle="Visão consolidada de cenários, templates, coortes e atividade recente"
    >
      <section className="mb-4 flex flex-col gap-3 rounded-xl border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Ambiente pronto para simulação clínica, coortes sintéticas e interoperabilidade.
        </p>
        <Button variant="outline" size="sm" className="w-full sm:w-auto" render={<Link to="/exports" />}>
          Ver exportações
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Cenários"
          value={isPending ? "..." : (data?.metrics.totalScenarios ?? 0)}
          icon={FileText}
        />
        <MetricCard
          label="Pacientes sintéticos"
          value={isPending ? "..." : (data?.metrics.totalSyntheticPatients ?? 0)}
          icon={Activity}
        />
        <MetricCard
          label="Templates ativos"
          value={isPending ? "..." : (data?.metrics.totalTemplates ?? 0)}
          icon={Layers}
        />
        <MetricCard
          label="Coortes"
          value={isPending ? "..." : (data?.metrics.totalCohorts ?? 0)}
          icon={FlaskConical}
        />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>Atividade recente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isPending ? (
              <LoadingPanel
                title="Carregando atividade"
                description="Buscando eventos recentes no backend."
              />
            ) : null}
            {isError ? (
              <ErrorPanel
                title="Falha ao carregar dashboard"
                description="Não foi possível carregar as atividades agora."
                actionLabel="Tentar novamente"
                onAction={() => void refetch()}
              />
            ) : null}
            {!isPending && !isError && (data?.activities ?? []).map((item) => (
              <article key={item.id} className="rounded-lg border bg-background p-4">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(item.at).toLocaleString("pt-BR")}
                </p>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>Ações rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button render={<Link to="/scenarios/new" />}>Criar cenário</Button>
            <Button variant="outline" render={<Link to="/templates" />}>
              Ver templates
            </Button>
            <Button variant="outline" render={<Link to="/cohorts" />}>
              Criar coorte
            </Button>
          </CardContent>
        </Card>
      </section>
    </AppLayout>
  )
}
