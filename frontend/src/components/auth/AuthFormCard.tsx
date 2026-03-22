import { ReactNode, FormEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface AuthFormCardProps {
  title: string
  description?: string
  onSubmit: (e: FormEvent) => void
  submitLabel: string
  footer?: ReactNode
  children: ReactNode
}

export function AuthFormCard({ title, description, onSubmit, submitLabel, footer, children }: AuthFormCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {children}
            <Button type="submit" className="w-full">{submitLabel}</Button>
          </form>
          {footer && <div className="mt-4 text-center text-sm text-muted-foreground">{footer}</div>}
        </CardContent>
      </Card>
    </div>
  )
}
