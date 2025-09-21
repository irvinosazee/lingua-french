"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { ProgressTracker } from "@/components/progress-tracker"
import { fetchProgress, fetchLessons, getNextLessonId, type Progress as ProgressType } from "@/lib/api"

export default function Dashboard() {
  const [progress, setProgress] = useState<ProgressType>({ completedLessons: [], totalXP: 0, streak: 0 })
  const [totalLessons, setTotalLessons] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const [progressData, lessonsData] = await Promise.all([fetchProgress(), fetchLessons()])
      setProgress(progressData)
      setTotalLessons(lessonsData.length)
      setLoading(false)
    }
    loadData()
  }, [])

  const nextLessonId = getNextLessonId(progress.completedLessons)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Continue your French learning journey</p>
        </div>

        {/* Progress Stats */}
        <ProgressTracker progress={progress} totalLessons={totalLessons} className="mb-8" />

        {/* Continue Learning Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">
                  {nextLessonId <= totalLessons ? `Lesson ${nextLessonId}` : "All Lessons Complete!"}
                </h3>
                <p className="text-gray-600">
                  {nextLessonId <= totalLessons
                    ? "Ready for your next challenge"
                    : "Congratulations on completing all lessons!"}
                </p>
                {nextLessonId <= totalLessons && (
                  <>
                    <Progress value={0} className="mt-2 w-64" />
                    <p className="text-xs text-muted-foreground mt-1">Ready to start</p>
                  </>
                )}
              </div>
              {nextLessonId <= totalLessons ? (
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href={`/lessons/${nextLessonId}`}>Continue Learning</Link>
                </Button>
              ) : (
                <Button asChild variant="outline">
                  <Link href="/lessons">Review Lessons</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Browse All Lessons</CardTitle>
              <CardDescription>Explore all available French lessons</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/lessons">View All Lessons</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Practice Mode</CardTitle>
              <CardDescription>Review vocabulary from completed lessons</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
