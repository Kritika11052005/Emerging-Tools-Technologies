import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, BookOpen } from 'lucide-react'

export default function RoleSelection() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-background px-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Early Warning System</h1>
        <p className="text-muted-foreground">Select your role to continue</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Card
          className="flex-1 cursor-pointer hover:border-primary transition-colors"
          onClick={() => navigate('/student/login')}
        >
          <CardHeader className="items-center pb-2">
            <GraduationCap className="h-10 w-10 text-primary" />
            <CardTitle className="text-lg">Student</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            View your risk score, attendance, and assessments.
          </CardContent>
        </Card>

        <Card
          className="flex-1 cursor-pointer hover:border-primary transition-colors"
          onClick={() => navigate('/teacher/login')}
        >
          <CardHeader className="items-center pb-2">
            <BookOpen className="h-10 w-10 text-primary" />
            <CardTitle className="text-lg">Teacher</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Monitor students, flag risks, and manage sessions.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
