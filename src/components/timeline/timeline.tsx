import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TimelineEvent } from "@/types/domain"

interface TimelineProps {
  events: TimelineEvent[]
}

const typeLabel: Record<TimelineEvent["type"], string> = {
  consulta: "Consulta",
  sintoma: "Sintoma",
  exame: "Exame",
  medicacao: "Medicação",
}

export function Timeline({ events }: TimelineProps) {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <Card className="h-full shadow-sm">
      <CardHeader>
        <CardTitle>Timeline clínica</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4">
          {sorted.map((event) => (
            <li key={event.id} className="rounded-lg border bg-card p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <Badge variant={event.status === "realizado" ? "secondary" : "outline"}>
                  {typeLabel[event.type]}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
