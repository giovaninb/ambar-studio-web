import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"

import { EmptyPanel, ErrorPanel, LoadingPanel } from "@/components/common/state-panels"
import { Timeline } from "@/components/timeline/timeline"
import { AppLayout } from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"

export function ScenarioDetailPage() {
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id ?? ""

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["scenario", id],
    queryFn: () => api.getScenarioById(id),
    enabled: Boolean(id),
  })

  if (isPending) {
    return (
      <AppLayout title="Detalhe do cenário" subtitle="Carregando dados clínicos">
        <LoadingPanel
          title="Carregando cenário"
          description="Buscando dados do paciente e timeline."
        />
      </AppLayout>
    )
  }

  if (isError) {
    return (
      <AppLayout title="Detalhe do cenário" subtitle="Falha ao carregar cenário">
        <ErrorPanel
          title="Erro ao consultar cenário"
          description="Não foi possível obter os dados do cenário solicitado."
          actionLabel="Tentar novamente"
          onAction={() => void refetch()}
        />
      </AppLayout>
    )
  }

  if (!data?.scenario || !data.patient) {
    return (
      <AppLayout title="Detalhe do cenário" subtitle="Cenário não encontrado">
        <EmptyPanel
          title="Cenário não encontrado"
          description="Nenhum cenário foi localizado para o identificador informado."
          actionLabel="Voltar para cenários"
          onAction={() => navigate("/scenarios")}
        />
      </AppLayout>
    )
  }

  return (
    <AppLayout title={data.scenario.name} subtitle="Detalhe com visão clínica, timeline e ações">
      <section className="grid gap-4 xl:grid-cols-[300px_1fr_300px]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Paciente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">{data.patient.fullName}</p>
            <p className="text-muted-foreground">Nascimento: {new Date(data.patient.birthDate).toLocaleDateString("pt-BR")}</p>
            <p className="text-muted-foreground">Sexo: {data.patient.sex}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {data.patient.conditions.map((condition) => (
                <Badge key={condition} variant="outline">
                  {condition}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Timeline events={data.events} />

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Painel do evento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Selecione um evento na timeline para editar detalhes clínicos.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>- Tipo de evento</li>
              <li>- Data e status</li>
              <li>- Descrição clínica</li>
              <li>- Tags de interoperabilidade</li>
            </ul>
            <div className="flex flex-col gap-2 pt-2">
              <Button size="sm">Salvar cenário</Button>
              <Button size="sm" variant="outline" render={<Link to="/exports" />}>
                Exportar
              </Button>
              <Button size="sm" variant="ghost">
                Transformar em template
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </AppLayout>
  )
}
