import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import { EmptyPanel, ErrorPanel, LoadingPanel } from "@/components/common/state-panels"
import { AppLayout } from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"

export function CohortsPage() {
  const queryClient = useQueryClient()
  const [name, setName] = useState("")
  const [patientCount, setPatientCount] = useState("50")
  const [templateId, setTemplateId] = useState("")
  const [ageRange, setAgeRange] = useState("")
  const [conditions, setConditions] = useState("")
  const [severity, setSeverity] = useState("Moderada")

  const { data: cohorts = [], isPending, isError, refetch } = useQuery({
    queryKey: ["cohorts"],
    queryFn: api.listCohorts,
  })

  const createCohort = useMutation({
    mutationFn: api.createCohort,
    onSuccess: async () => {
      setName("")
      setPatientCount("50")
      setTemplateId("")
      setAgeRange("")
      setConditions("")
      setSeverity("Moderada")
      await queryClient.invalidateQueries({ queryKey: ["cohorts"] })
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
  })

  const onCreateCohort = () => {
    if (!name.trim()) return
    const conditionList = conditions
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
    createCohort.mutate({
      name: name.trim(),
      patientCount: Number(patientCount) || 50,
      templateId: templateId.trim() || "manual",
      conditions: conditionList.length ? conditionList : ageRange ? [ageRange] : [],
      severity: severity as "Leve" | "Moderada" | "Severa",
      durationDays: 90,
    })
  }

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
            <Input
              placeholder="Nome da coorte"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              type="number"
              placeholder="Quantidade de pacientes"
              value={patientCount}
              onChange={(event) => setPatientCount(event.target.value)}
              min={1}
            />
            <Input
              placeholder="Template base"
              value={templateId}
              onChange={(event) => setTemplateId(event.target.value)}
            />
            <Input
              placeholder="Faixa etária"
              value={ageRange}
              onChange={(event) => setAgeRange(event.target.value)}
            />
            <Input
              placeholder="Condições (separadas por vírgula)"
              value={conditions}
              onChange={(event) => setConditions(event.target.value)}
            />
            <Input
              placeholder="Severidade"
              value={severity}
              onChange={(event) => setSeverity(event.target.value)}
            />
            {createCohort.isError ? (
              <ErrorPanel
                title="Falha ao gerar coorte"
                description="Não foi possível registrar a coorte agora."
              />
            ) : null}
            <div className="flex justify-end">
              <Button onClick={onCreateCohort} disabled={createCohort.isPending}>
                {createCohort.isPending ? "Gerando..." : "Gerar coorte"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>Coortes recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isPending ? (
              <LoadingPanel
                title="Carregando coortes"
                description="Buscando execuções recentes de geração."
              />
            ) : null}
            {isError ? (
              <ErrorPanel
                title="Falha ao carregar coortes"
                description="Não foi possível consultar as coortes agora."
                actionLabel="Tentar novamente"
                onAction={() => void refetch()}
              />
            ) : null}
            {!isPending && !isError && cohorts.length === 0 ? (
              <EmptyPanel
                title="Nenhuma coorte recente"
                description="Gere uma nova coorte para visualizar métricas aqui."
              />
            ) : null}
            {!isPending && !isError && cohorts.map((cohort) => (
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
