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

const typeBadgeVariant: Record<TimelineEvent["type"], "default" | "secondary" | "outline"> = {
  consulta: "default",
  sintoma: "outline",
  exame: "secondary",
  medicacao: "secondary",
}

export function Timeline({ events }: TimelineProps) {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <Card className="h-full border-border/80 shadow-sm">
      <CardHeader>
        <CardTitle>Timeline clínica</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-4 before:absolute before:left-2 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
          {sorted.map((event) => (
            <li key={event.id} className="relative rounded-lg border bg-card p-4 pl-6">
              <span className="absolute left-0 top-5 inline-flex size-4 rounded-full border-2 border-card bg-primary" />
              <div className="mb-2 flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <Badge variant={typeBadgeVariant[event.type]}>
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
