import { useQuery } from "@tanstack/react-query"

import { TemplateCard } from "@/components/cards/template-card"
import { EmptyPanel, ErrorPanel, LoadingPanel } from "@/components/common/state-panels"
import { AppLayout } from "@/components/layout/layout"
import { api } from "@/lib/api"

export function TemplatesPage() {
  const { data: templates = [], isPending, isError, refetch } = useQuery({
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
      {isPending ? (
        <LoadingPanel
          title="Carregando templates"
          description="Buscando biblioteca de modelos clínicos."
        />
      ) : null}
      {isError ? (
        <ErrorPanel
          title="Falha ao carregar templates"
          description="Não foi possível carregar os templates agora."
          actionLabel="Tentar novamente"
          onAction={() => void refetch()}
        />
      ) : null}
      {!isPending && !isError && templates.length === 0 ? (
        <EmptyPanel
          title="Nenhum template encontrado"
          description="Quando houver templates disponíveis eles aparecerão aqui."
        />
      ) : null}
      {!isPending && !isError && templates.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </section>
      ) : null}
    </AppLayout>
  )
}
