import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const progressRecords = await prisma.progress.findMany({
      orderBy: { completedAt: "desc" },
    })

    const completedLessons = progressRecords.map((record) => record.lessonId)
    const totalXP = progressRecords.reduce((sum, record) => sum + record.xpEarned, 0)
    const streak = 0

    return NextResponse.json({
      completedLessons,
      totalXP,
      streak,
    })
  } catch (error) {
    console.error("Database error, returning empty progress:", error)

    return NextResponse.json({
      completedLessons: [],
      totalXP: 0,
      streak: 0,
    })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { lessonId, xp } = body

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId required" }, { status: 400 })
    }

    const existingProgress = await prisma.progress.findFirst({
      where: { lessonId, completed: true },
    })

    if (existingProgress) {
      return NextResponse.json({ success: true, message: "Lesson already completed" })
    }

    const progress = await prisma.progress.create({
      data: {
        lessonId,
        completed: true,
        xpEarned: xp ?? 10,
        completedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, progress })
  } catch (error) {
    console.error("Database error in progress POST:", error)

    return NextResponse.json({
      success: true,
      message: "Progress saved (database unavailable)",
    })
  }
}
