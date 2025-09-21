import { type NextRequest, NextResponse } from "next/server"

// Mock progress data - in a real app, this would be stored in a database per user
const mockProgress = {
  completedLessons: [1],
  totalXP: 1250,
  streak: 7,
}

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json(mockProgress)
  } catch (error) {
    console.error("Error fetching progress:", error)
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { lessonId } = await request.json()

    if (!lessonId || typeof lessonId !== "number") {
      return NextResponse.json({ error: "Invalid lesson ID" }, { status: 400 })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Add lesson to completed list if not already completed
    if (!mockProgress.completedLessons.includes(lessonId)) {
      mockProgress.completedLessons.push(lessonId)
      mockProgress.totalXP += 50 // Base XP for completing a lesson

      // Update streak (simplified logic)
      mockProgress.streak += 1
    }

    return NextResponse.json({ success: true, progress: mockProgress })
  } catch (error) {
    console.error("Error updating progress:", error)
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
  }
}
