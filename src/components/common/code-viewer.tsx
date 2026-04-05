import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CodeViewerProps {
  title: string
  code: string
}

export function CodeViewer({ title, code }: CodeViewerProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="max-h-[520px] overflow-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-100">
          <code>{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}
