// Database setup script to initialize the French learning app
import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"

const prisma = new PrismaClient()

async function setupDatabase() {
    try {
        console.log("🚀 Setting up database...")

        // Read lesson data
        const lessonsPath = path.join(process.cwd(), "data", "lessons.json")
        const lessonsData = JSON.parse(fs.readFileSync(lessonsPath, "utf8"))

        console.log(`📚 Found ${lessonsData.length} lessons to seed`)

        // Clear existing data
        await prisma.progress.deleteMany()
        await prisma.lesson.deleteMany()

        // Seed lessons
        for (let i = 0; i < lessonsData.length; i++) {
            const lesson = lessonsData[i]

            // Transform vocabulary data to match expected format
            const vocabulary = lesson.vocab.map((item: any, index: number) => ({
                id: index + 1,
                french: item.fr,
                english: item.en,
                pronunciation: item.pronunciation || null,
            }))

            // Transform exercises data to match expected format
            const exercises = lesson.exercises.map((exercise: any, index: number) => ({
                id: index + 1,
                type: exercise.type,
                question: exercise.question,
                options: exercise.options || null,
                correctAnswer: exercise.answer,
                audioUrl: exercise.audio || null,
                xpReward: exercise.xp || 10,
            }))

            await prisma.lesson.create({
                data: {
                    id: i + 1,
                    slug: lesson.slug,
                    title: lesson.title,
                    description: lesson.description,
                    vocab: vocabulary,
                    exercises: exercises,
                },
            })

            console.log(`✅ Created lesson: ${lesson.title}`)
        }

        console.log("🎉 Database setup complete!")
    } catch (error) {
        console.error("❌ Database setup failed:", error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

// Run the setup
setupDatabase().catch((error) => {
    console.error(error)
    process.exit(1)
})
