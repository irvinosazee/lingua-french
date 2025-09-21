// API utility functions for the Lingua app

export interface Lesson {
  id: number
  title: string
  description?: string
  vocabulary: VocabularyItem[]
  exercises: Exercise[]
  completed?: boolean
}

export interface VocabularyItem {
  id: number
  french: string
  english: string
  pronunciation?: string
}

export interface Exercise {
  id: number
  type: "mcq" | "translate" | "listening"
  question: string
  options?: string[]
  correctAnswer: string
  audioUrl?: string
  xpReward?: number
}

export interface Progress {
  completedLessons: number[]
  totalXP: number
  streak: number
}

// Fetch all lessons
export async function fetchLessons(): Promise<Lesson[]> {
  try {
    const response = await fetch("/api/lessons", {
      cache: "no-store", // Ensure fresh data
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Lessons API error (${response.status}):`, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Validate the response data structure
    if (!Array.isArray(data)) {
      console.error("Invalid lessons data format:", data)
      return []
    }

    return data
  } catch (error) {
    console.error("Error fetching lessons:", error)
    // Return empty array as fallback to prevent app crashes
    return []
  }
}

// Fetch user progress
export async function fetchProgress(): Promise<Progress> {
  try {
    const response = await fetch("/api/progress", {
      cache: "no-store", // Ensure fresh data
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Progress API error (${response.status}):`, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Validate and provide defaults for progress data
    return {
      completedLessons: Array.isArray(data.completedLessons) ? data.completedLessons : [],
      totalXP: typeof data.totalXP === "number" ? data.totalXP : 0,
      streak: typeof data.streak === "number" ? data.streak : 0,
    }
  } catch (error) {
    console.error("Error fetching progress:", error)
    // Return default progress to prevent app crashes
    return { completedLessons: [], totalXP: 0, streak: 0 }
  }
}

// Mark lesson as completed
export async function markLessonCompleted(lessonId: number, xpEarned = 10): Promise<boolean> {
  try {
    const response = await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lessonId, xp: xpEarned }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Progress POST error (${response.status}):`, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result.success === true
  } catch (error) {
    console.error("Error marking lesson as completed:", error)
    return false
  }
}

// Text-to-speech for pronunciation
export function speakText(text: string, lang = "fr-FR") {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }
}

// Get lesson by ID
export async function fetchLessonById(id: number): Promise<Lesson | null> {
  const lessons = await fetchLessons()
  return lessons.find((lesson) => lesson.id === id) || null
}

// Calculate overall progress percentage
export function calculateProgressPercentage(completedLessons: number[], totalLessons: number): number {
  if (totalLessons === 0) return 0
  return Math.round((completedLessons.length / totalLessons) * 100)
}

// Get next available lesson ID
export function getNextLessonId(completedLessons: number[]): number {
  return Math.max(...completedLessons, 0) + 1
}
