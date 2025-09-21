"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VocabularyCard } from "@/components/vocabulary-card"
import { ArrowLeft, Play, BookOpen, Target } from "lucide-react"
import { fetchLessons, fetchProgress, speakText, type Lesson, type Progress } from "@/lib/api"

export default function LessonDetailPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = Number.parseInt(params.id as string)

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [progress, setProgress] = useState<Progress>({ completedLessons: [], totalXP: 0, streak: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadLessonData() {
      setLoading(true)
      setError(null)

      try {
        const [lessonsData, progressData] = await Promise.all([fetchLessons(), fetchProgress()])

        const currentLesson = lessonsData.find((l) => l.id === lessonId)
        if (!currentLesson) {
          setError("Lesson not found")
          return
        }

        // Check if lesson is locked
        const isLocked = lessonId > progressData.completedLessons.length + 1
        if (isLocked) {
          setError("This lesson is locked. Complete previous lessons first.")
          return
        }

        setLesson({
          ...currentLesson,
          completed: progressData.completedLessons.includes(lessonId),
        })
        setProgress(progressData)
      } catch (err) {
        setError("Failed to load lesson data")
        console.error("Error loading lesson:", err)
      } finally {
        setLoading(false)
      }
    }

    if (lessonId) {
      loadLessonData()
    }
  }, [lessonId])

  const handleStartExercises = () => {
    router.push(`/lessons/${lessonId}/exercises`)
  }

  const handleGoBack = () => {
    router.push("/lessons")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading lesson...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !lesson) {
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
              Back to Lessons
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
            Back to Lessons
          </Button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
              {lesson.description && <p className="text-gray-600 text-lg">{lesson.description}</p>}
            </div>
            <div className="flex items-center gap-2">
              {lesson.completed && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Completed
                </Badge>
              )}
              <Badge variant="outline">Lesson {lesson.id}</Badge>
            </div>
          </div>

          {/* Lesson Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{lesson.vocabulary?.length || 0} vocabulary words</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>{lesson.exercises?.length || 0} exercises</span>
            </div>
          </div>
        </div>

        {/* Vocabulary Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Vocabulary
                </CardTitle>
                <CardDescription>Learn these words before starting the exercises</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (lesson.vocabulary && lesson.vocabulary.length > 0) {
                    const allWords = lesson.vocabulary.map((item) => item.french).join(", ")
                    speakText(allWords)
                  }
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                Play All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {lesson.vocabulary && lesson.vocabulary.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.vocabulary.map((item) => (
                  <VocabularyCard key={item.id} vocabulary={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No vocabulary available for this lesson</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Start Exercises Section */}
        <Card>
          <CardHeader>
            <CardTitle>Ready to Practice?</CardTitle>
            <CardDescription>Test your knowledge with interactive exercises</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">
                  Complete {lesson.exercises?.length || 0} exercises to finish this lesson
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>• Multiple choice questions</span>
                  <span>• Translation exercises</span>
                  <span>• Listening comprehension</span>
                </div>
              </div>
              <Button onClick={handleStartExercises} className="bg-blue-600 hover:bg-blue-700" size="lg">
                <Target className="h-4 w-4 mr-2" />
                Start Exercises
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
