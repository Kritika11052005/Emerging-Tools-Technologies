import { useAuth } from '@/context/useAuth'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { StudentProfileCard } from '@/components/student/StudentProfileCard'
import { RiskScoreDisplay } from '@/components/student/RiskScoreDisplay'
import { RiskStatusBadge } from '@/components/student/RiskStatusBadge'
import { AttendanceSummaryCard } from '@/components/student/AttendanceSummaryCard'
import { AssessmentScoresCard } from '@/components/student/AssessmentScoresCard'
import { NotificationItem } from '@/components/student/NotificationItem'
import { SessionCard } from '@/components/student/SessionCard'

export default function StudentDashboard() {
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
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground text-sm">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <RiskStatusBadge risk_category="YELLOW" />
          <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StudentProfileCard />
        <RiskScoreDisplay />
        <AttendanceSummaryCard />
        <AssessmentScoresCard />
        <SessionCard />
        <div className="space-y-2">
          <p className="text-sm font-medium">Notifications</p>
          <NotificationItem />
        </div>
      </div>
    </div>
  )
}
