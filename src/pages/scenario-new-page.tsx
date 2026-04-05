import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

import { ErrorPanel } from "@/components/common/state-panels"
import { AppLayout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/api"

export function ScenarioNewPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [name, setName] = useState("")
  const [durationDays, setDurationDays] = useState("90")
  const [summary, setSummary] = useState("")

  const createScenario = useMutation({
    mutationFn: api.createScenario,
    onSuccess: async (scenario) => {
      await queryClient.invalidateQueries({ queryKey: ["scenarios"] })
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] })
      navigate(`/scenarios/${scenario.id}`)
    },
  })

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) return
    createScenario.mutate({
      name: name.trim(),
      durationDays: Number(durationDays) || 90,
      summary: summary.trim(),
    })
  }

  return (
    <AppLayout title="Novo cenário" subtitle="Wizard inicial de criação de cenário clínico">
      <Card className="mx-auto max-w-3xl shadow-sm">
        <CardHeader>
          <CardTitle>Wizard de criação</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome do cenário</label>
              <Input
                placeholder="Ex.: Acompanhamento DM2 em APS"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Duração (dias)</label>
              <Input
                type="number"
                placeholder="180"
                value={durationDays}
                onChange={(event) => setDurationDays(event.target.value)}
                min={1}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Resumo clínico</label>
            <Textarea
              placeholder="Descreva o contexto clínico e objetivos do cenário."
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
            />
          </div>
          {createScenario.isError ? (
            <ErrorPanel
              title="Falha ao criar cenário"
              description="Não foi possível salvar o cenário agora. Revise os dados e tente novamente."
            />
          ) : null}
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => navigate("/scenarios")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createScenario.isPending}>
              {createScenario.isPending ? "Salvando..." : "Salvar cenário"}
            </Button>
          </div>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  )
}
