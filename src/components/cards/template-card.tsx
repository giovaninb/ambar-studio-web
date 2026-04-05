import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Template } from "@/types/domain"

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="border-border/80 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{template.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{template.category}</Badge>
          <Badge variant="outline">{template.complexity}</Badge>
          <Badge variant="outline">{template.eventCount} eventos</Badge>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {template.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2 py-1">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="default" size="sm">
          Usar template
        </Button>
        <Button variant="ghost" size="sm">
          Clonar
        </Button>
      </CardFooter>
    </Card>
  )
}
