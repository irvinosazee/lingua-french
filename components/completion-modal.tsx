"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Trophy, ArrowRight } from "lucide-react"

interface CompletionModalProps {
  lessonTitle: string
  xpEarned: number
  correctAnswers: number
  totalExercises: number
  onClose: () => void
  onBackToLessons: () => void
  onNextLesson: () => void
}

export function CompletionModal({
  lessonTitle,
  xpEarned,
  correctAnswers,
  totalExercises,
  onClose,
  onBackToLessons,
  onNextLesson,
}: CompletionModalProps) {
  const accuracy = Math.round((correctAnswers / totalExercises) * 100)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Lesson Complete!</CardTitle>
          <CardDescription>Great job finishing "{lessonTitle}"</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-600">{xpEarned}</div>
              <div className="text-sm text-gray-600">XP Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {correctAnswers}/{totalExercises}
              </div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="text-center">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 px-4 py-2">
              <Trophy className="h-4 w-4 mr-2" />
              {accuracy >= 90 ? "Perfect!" : accuracy >= 70 ? "Well Done!" : "Good Effort!"}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={onNextLesson} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
              <ArrowRight className="h-4 w-4 mr-2" />
              Next Lesson
            </Button>
            <Button onClick={onBackToLessons} variant="outline" className="w-full bg-transparent" size="lg">
              Back to Lessons
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
