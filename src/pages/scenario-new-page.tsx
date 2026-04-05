import { AppLayout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ScenarioNewPage() {
  return (
    <AppLayout title="Novo cenário" subtitle="Wizard inicial de criação de cenário clínico">
      <Card className="mx-auto max-w-3xl shadow-sm">
        <CardHeader>
          <CardTitle>Wizard de criação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome do cenário</label>
              <Input placeholder="Ex.: Acompanhamento DM2 em APS" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Duração (dias)</label>
              <Input type="number" placeholder="180" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Resumo clínico</label>
            <Textarea placeholder="Descreva o contexto clínico e objetivos do cenário." />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button>Salvar cenário</Button>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  )
}
