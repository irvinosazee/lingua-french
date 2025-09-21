import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Fallback mock data when database is not available
const mockLessons = [
  {
    id: 1,
    title: "French Basics 1",
    description: "Learn essential greetings and polite expressions",
    vocabulary: [
      { id: 1, french: "bonjour", english: "hello", pronunciation: "bon-ZHOOR" },
      { id: 2, french: "merci", english: "thank you", pronunciation: "mer-SEE" },
      { id: 3, french: "au revoir", english: "goodbye", pronunciation: "oh ruh-VWAHR" },
    ],
    exercises: [
      {
        id: 1,
        type: "mcq" as const,
        question: "What is 'thank you' in French?",
        options: ["bonjour", "merci", "s'il vous plaît"],
        correctAnswer: "merci",
        xpReward: 10,
      },
    ],
  },
  {
    id: 2,
    title: "French Basics 2",
    description: "Numbers and basic questions",
    vocabulary: [
      { id: 1, french: "un", english: "one", pronunciation: "uhn" },
      { id: 2, french: "deux", english: "two", pronunciation: "duh" },
      { id: 3, french: "trois", english: "three", pronunciation: "twah" },
    ],
    exercises: [
      {
        id: 1,
        type: "mcq" as const,
        question: "What is 'three' in French?",
        options: ["un", "deux", "trois"],
        correctAnswer: "trois",
        xpReward: 10,
      },
    ],
  },
  {
    id: 3,
    title: "Family Members",
    description: "Learn to talk about your family",
    vocabulary: [
      { id: 1, french: "famille", english: "family", pronunciation: "fah-MEEL" },
      { id: 2, french: "mère", english: "mother", pronunciation: "mehr" },
      { id: 3, french: "père", english: "father", pronunciation: "pehr" },
    ],
    exercises: [
      {
        id: 1,
        type: "mcq" as const,
        question: "What is 'mother' in French?",
        options: ["père", "mère", "frère"],
        correctAnswer: "mère",
        xpReward: 10,
      },
    ],
  },
]

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { id: "asc" },
    })

    if (!lessons || lessons.length === 0) {
      console.log("No lessons found in database, using mock data")
      return NextResponse.json(mockLessons)
    }

    const transformedLessons = lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      vocabulary: Array.isArray(lesson.vocab) ? lesson.vocab : [],
      exercises: Array.isArray(lesson.exercises) ? lesson.exercises : [],
    }))

    return NextResponse.json(transformedLessons)
  } catch (error) {
    console.error("Database error, falling back to mock data:", error)

    return NextResponse.json(mockLessons)
  }
}
