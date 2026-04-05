import { AppLayout } from "@/components/layout/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function SettingsPage() {
  return (
    <AppLayout title="Configurações" subtitle="Preferências básicas do workspace">
      <Card className="max-w-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Configurações iniciais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Tipo de dado: sintético / real futuro / misto futuro" />
          <Input placeholder="Placeholder de consentimento futuro" />
          <Input placeholder="Preferência de visualização padrão" />
          <div className="flex justify-end">
            <Button>Salvar preferências</Button>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  )
}
