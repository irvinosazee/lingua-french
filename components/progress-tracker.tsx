"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Flame, BookOpen } from "lucide-react"
import type { Progress as ProgressType } from "@/lib/api"

interface ProgressTrackerProps {
  progress: ProgressType
  totalLessons: number
  className?: string
}

export function ProgressTracker({ progress, totalLessons, className = "" }: ProgressTrackerProps) {
  const progressPercentage = Math.round((progress.completedLessons.length / totalLessons) * 100)
  const nextLessonId = progress.completedLessons.length + 1

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {/* Overall Progress */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          <BookOpen className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{progressPercentage}%</div>
          <Progress value={progressPercentage} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {progress.completedLessons.length} of {totalLessons} lessons
          </p>
        </CardContent>
      </Card>

      {/* Total XP */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total XP</CardTitle>
          <Trophy className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{progress.totalXP.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Experience points earned</p>
        </CardContent>
      </Card>

      {/* Daily Streak */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
          <Flame className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{progress.streak}</div>
          <p className="text-xs text-muted-foreground">days in a row</p>
        </CardContent>
      </Card>

      {/* Next Lesson */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Lesson</CardTitle>
          <Target className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">#{nextLessonId}</div>
          <p className="text-xs text-muted-foreground">
            {nextLessonId <= totalLessons ? "Ready to start" : "All complete!"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
