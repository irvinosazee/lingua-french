"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { LessonCard } from "@/components/lesson-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { fetchLessons, fetchProgress, type Lesson, type Progress } from "@/lib/api"

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [progress, setProgress] = useState<Progress>({ completedLessons: [], totalXP: 0, streak: 0 })
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "completed" | "available" | "locked">("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const [lessonsData, progressData] = await Promise.all([fetchLessons(), fetchProgress()])

      // Mark lessons as completed based on progress
      const lessonsWithProgress = lessonsData.map((lesson) => ({
        ...lesson,
        completed: progressData.completedLessons.includes(lesson.id),
      }))

      setLessons(lessonsWithProgress)
      setProgress(progressData)
      setLoading(false)
    }

    loadData()
  }, [])

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase())

    switch (filter) {
      case "completed":
        return matchesSearch && lesson.completed
      case "available":
        return matchesSearch && !lesson.completed && lesson.id <= progress.completedLessons.length + 1
      case "locked":
        return matchesSearch && !lesson.completed && lesson.id > progress.completedLessons.length + 1
      default:
        return matchesSearch
    }
  })

  const stats = {
    total: lessons.length,
    completed: lessons.filter((l) => l.completed).length,
    available: lessons.filter((l) => !l.completed && l.id <= progress.completedLessons.length + 1).length,
    locked: lessons.filter((l) => !l.completed && l.id > progress.completedLessons.length + 1).length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading lessons...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">French Lessons</h1>
          <p className="text-gray-600">Master French step by step with our structured lessons</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Lessons</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.available}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-400">{stats.locked}</div>
            <div className="text-sm text-gray-600">Locked</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                All
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                onClick={() => setFilter("completed")}
                className={filter === "completed" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                Completed
              </Button>
              <Button
                variant={filter === "available" ? "default" : "outline"}
                onClick={() => setFilter("available")}
                className={filter === "available" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                Available
              </Button>
              <Button
                variant={filter === "locked" ? "default" : "outline"}
                onClick={() => setFilter("locked")}
                className={filter === "locked" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                Locked
              </Button>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        {filteredLessons.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => {
              const isLocked = !lesson.completed && lesson.id > progress.completedLessons.length + 1
              const lessonProgress = lesson.completed
                ? 100
                : lesson.id === progress.completedLessons.length + 1
                  ? 30
                  : 0

              return <LessonCard key={lesson.id} lesson={lesson} isLocked={isLocked} progress={lessonProgress} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}
