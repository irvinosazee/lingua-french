import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Lock } from "lucide-react"
import type { Lesson } from "@/lib/api"

interface LessonCardProps {
  lesson: Lesson
  isLocked?: boolean
  progress?: number
}

export function LessonCard({ lesson, isLocked = false, progress = 0 }: LessonCardProps) {
  return (
    <Card className={`transition-all hover:shadow-md ${isLocked ? "opacity-60" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{lesson.title}</CardTitle>
          {lesson.completed ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          ) : isLocked ? (
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              <Lock className="w-3 h-3 mr-1" />
              Locked
            </Badge>
          ) : (
            <Badge variant="outline">Available</Badge>
          )}
        </div>
        {lesson.description && <CardDescription>{lesson.description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {progress > 0 && (
          <div className="mb-4">
            <Progress value={progress} className="mb-2" />
            <p className="text-xs text-muted-foreground">{progress}% complete</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {lesson.vocabulary?.length || 0} words • {lesson.exercises?.length || 0} exercises
          </div>
          <Button asChild disabled={isLocked} className="bg-blue-600 hover:bg-blue-700">
            <Link href={`/lessons/${lesson.id}`}>{lesson.completed ? "Review" : "Start Lesson"}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
