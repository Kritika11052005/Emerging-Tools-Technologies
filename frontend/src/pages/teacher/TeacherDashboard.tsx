import { useAuth } from '@/context/useAuth'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RiskStatusBadge } from '@/components/student/RiskStatusBadge'

const MOCK_STUDENTS = [
  { id: 'STU-2021-0042', name: 'Arjun Mehta', program: 'B.Tech CS', risk: 'RED' as const },
  { id: 'STU-2022-0017', name: 'Sneha Iyer', program: 'B.Tech ECE', risk: 'YELLOW' as const },
  { id: 'STU-2021-0089', name: 'Rohan Das', program: 'B.Tech ME', risk: 'GREEN' as const },
]

export default function TeacherDashboard() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  function logout() {
    setUser(null)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground text-sm">Welcome back, {user?.name}</p>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_STUDENTS.map(s => (
          <Card key={s.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{s.name}</CardTitle>
              <RiskStatusBadge risk_category={s.risk} />
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p>{s.id}</p>
              <p>{s.program}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
