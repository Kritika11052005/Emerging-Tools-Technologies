import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AttendanceSummary {
  attendance_percentage: number
  total_classes: number
  attended_classes: number
  week_label: string
}

const mock: AttendanceSummary = {
  attendance_percentage: 68.5,
  total_classes: 120,
  attended_classes: 82,
  week_label: 'Week ending Mar 21, 2026',
}

function getColor(pct: number) {
  if (pct >= 75) return '#22c55e'
  if (pct >= 60) return '#eab308'
  return '#ef4444'
}

export function AttendanceSummaryCard({ data = mock }: { data?: AttendanceSummary }) {
  const color = getColor(data.attendance_percentage)

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Attendance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold" style={{ color }}>
            {data.attendance_percentage.toFixed(1)}%
          </span>
        </div>

        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${data.attendance_percentage}%`, backgroundColor: color }}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{data.attended_classes} attended</span>
          <span>{data.total_classes} total</span>
        </div>

        <p className="text-xs text-muted-foreground">{data.week_label}</p>
      </CardContent>
    </Card>
  )
}
