import { Link } from "react-router-dom"

import { AppLayout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function NotFoundPage() {
  return (
    <AppLayout title="Página não encontrada">
      <Card className="max-w-xl shadow-sm">
        <CardContent className="space-y-4 p-6">
          <p className="text-sm text-muted-foreground">
            A rota solicitada não existe neste ambiente do Ambar Scenario Studio.
          </p>
          <Button render={<Link to="/" />}>Voltar ao dashboard</Button>
        </CardContent>
      </Card>
    </AppLayout>
  )
}
