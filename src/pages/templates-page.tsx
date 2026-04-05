import { useQuery } from "@tanstack/react-query"

import { TemplateCard } from "@/components/cards/template-card"
import { AppLayout } from "@/components/layout/layout"
import { api } from "@/lib/api"

export function TemplatesPage() {
  const { data: templates = [] } = useQuery({
    queryKey: ["templates"],
    queryFn: api.listTemplates,
  })

  return (
    <AppLayout title="Templates" subtitle="Biblioteca reutilizável de modelos clínicos">
      <section className="mb-4 rounded-xl border bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Reutilize jornadas validadas e reduza tempo de criação de cenários.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </section>
    </AppLayout>
  )
}
