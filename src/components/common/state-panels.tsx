import { AlertTriangle, Inbox, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface QueryStatePanelProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function LoadingPanel({ title, description }: QueryStatePanelProps) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardContent className="flex items-center gap-3 p-6 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p>{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function ErrorPanel({ title, description, actionLabel, onAction }: QueryStatePanelProps) {
  return (
    <Card className="border-destructive/30 shadow-sm">
      <CardContent className="p-6">
        <div className="mb-3 flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-4 text-destructive" />
          <div>
            <p className="font-medium text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {actionLabel && onAction ? (
          <Button size="sm" variant="outline" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}

export function EmptyPanel({ title, description, actionLabel, onAction }: QueryStatePanelProps) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardContent className="p-6">
        <div className="mb-3 flex items-start gap-3">
          <Inbox className="mt-0.5 size-4 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {actionLabel && onAction ? (
          <Button size="sm" variant="outline" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}
