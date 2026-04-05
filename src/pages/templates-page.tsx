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
      <section className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </section>
    </AppLayout>
  )
}
