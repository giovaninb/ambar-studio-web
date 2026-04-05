import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Scenario } from "@/types/domain"

interface ScenarioCardProps {
  scenario: Scenario
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{scenario.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{scenario.complexity}</Badge>
          <Badge variant="secondary">{scenario.durationDays} dias</Badge>
          <Badge variant="outline">{scenario.eventCount} eventos</Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          Atualizado em {new Date(scenario.updatedAt).toLocaleDateString("pt-BR")}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" render={<Link to={`/scenarios/${scenario.id}`} />}>
          Abrir
        </Button>
        <Button variant="ghost" size="sm">
          Duplicar
        </Button>
      </CardFooter>
    </Card>
  )
}
