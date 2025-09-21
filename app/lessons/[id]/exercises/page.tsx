"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ExerciseComponent } from "@/components/exercise-component"
import { CompletionModal } from "@/components/completion-modal"
import { ArrowLeft, Target, Trophy } from "lucide-react"
import { fetchLessons, markLessonCompleted, type Lesson } from "@/lib/api"

export default function ExercisesPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = Number.parseInt(params.id as string)

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [feedback, setFeedback] = useState<Record<number, { correct: boolean; xp: number }>>({})
  const [showCompletion, setShowCompletion] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadLesson() {
      setLoading(true)
      setError(null)

      try {
        const lessonsData = await fetchLessons()
        const currentLesson = lessonsData.find((l) => l.id === lessonId)

        if (!currentLesson) {
          setError("Lesson not found")
          return
        }

        if (!currentLesson.exercises || currentLesson.exercises.length === 0) {
          setError("No exercises available for this lesson")
          return
        }

        setLesson(currentLesson)
      } catch (err) {
        setError("Failed to load lesson")
        console.error("Error loading lesson:", err)
      } finally {
        setLoading(false)
      }
    }

    if (lessonId) {
      loadLesson()
    }
  }, [lessonId])

  const currentExercise = lesson?.exercises[currentExerciseIndex]
  const totalExercises = lesson?.exercises.length || 0
  const completedExercises = Object.keys(feedback).length
  const progressPercentage = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0

  const handleAnswerSubmit = (exerciseId: number, answer: string) => {
    if (!currentExercise) return

    const isCorrect = answer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim()
    const xpEarned = isCorrect ? currentExercise.xpReward || 10 : 0

    setAnswers((prev) => ({ ...prev, [exerciseId]: answer }))
    setFeedback((prev) => ({
      ...prev,
      [exerciseId]: { correct: isCorrect, xp: xpEarned },
    }))
  }

  const handleNextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex((prev) => prev + 1)
    } else {
      // All exercises completed
      handleCompleteLesson()
    }
  }

  const handleCompleteLesson = async () => {
    if (lesson) {
      const success = await markLessonCompleted(lesson.id)
      if (success) {
        setShowCompletion(true)
      }
    }
  }

  const handleGoBack = () => {
    router.push(`/lessons/${lessonId}`)
  }

  const totalXP = Object.values(feedback).reduce((sum, f) => sum + f.xp, 0)
  const correctAnswers = Object.values(feedback).filter((f) => f.correct).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading exercises...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !lesson || !currentExercise) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <Target className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Oops!</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={handleGoBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lesson
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button onClick={handleGoBack} variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lesson
          </Button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title} - Exercises</h1>
              <p className="text-gray-600">
                Exercise {currentExerciseIndex + 1} of {totalExercises}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Trophy className="h-3 w-3 mr-1" />
                {totalXP} XP
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* Exercise */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                {currentExercise.type === "mcq" && "Multiple Choice"}
                {currentExercise.type === "translate" && "Translation"}
                {currentExercise.type === "listening" && "Listening"}
              </CardTitle>
              <Badge variant="secondary">
                {currentExerciseIndex + 1}/{totalExercises}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ExerciseComponent
              exercise={currentExercise}
              onAnswerSubmit={handleAnswerSubmit}
              feedback={feedback[currentExercise.id]}
              userAnswer={answers[currentExercise.id]}
            />

            {/* Navigation */}
            {feedback[currentExercise.id] && (
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {correctAnswers} of {completedExercises} correct
                </div>
                <Button onClick={handleNextExercise} className="bg-blue-600 hover:bg-blue-700">
                  {currentExerciseIndex < totalExercises - 1 ? "Next Exercise" : "Complete Lesson"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exercise Summary */}
        {completedExercises > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{completedExercises}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{totalXP}</div>
                  <div className="text-sm text-gray-600">XP Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Completion Modal */}
      {showCompletion && (
        <CompletionModal
          lessonTitle={lesson.title}
          xpEarned={totalXP}
          correctAnswers={correctAnswers}
          totalExercises={totalExercises}
          onClose={() => setShowCompletion(false)}
          onBackToLessons={() => router.push("/lessons")}
          onNextLesson={() => router.push(`/lessons/${lessonId + 1}`)}
        />
      )}
    </div>
  )
}
