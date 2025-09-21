// Initialize database with sample data for the French learning app
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const sampleLessons = [
    {
        slug: "basics-1",
        title: "French Basics 1",
        description: "Learn essential greetings and polite expressions",
        vocab: [
            { id: 1, french: "bonjour", english: "hello", pronunciation: "bon-ZHOOR" },
            { id: 2, french: "bonsoir", english: "good evening", pronunciation: "bon-SWAHR" },
            { id: 3, french: "merci", english: "thank you", pronunciation: "mer-SEE" },
            { id: 4, french: "s'il vous plaît", english: "please", pronunciation: "seel voo PLAY" },
            { id: 5, french: "au revoir", english: "goodbye", pronunciation: "oh ruh-VWAHR" },
        ],
        exercises: [
            {
                id: 1,
                type: "mcq",
                question: "What is 'thank you' in French?",
                options: ["bonjour", "merci", "s'il vous plaît", "au revoir"],
                correctAnswer: "merci",
                xpReward: 10,
            },
            {
                id: 2,
                type: "translate",
                question: "Translate to French: 'goodbye'",
                correctAnswer: "au revoir",
                xpReward: 10,
            },
        ],
    },
    {
        slug: "basics-2",
        title: "French Basics 2",
        description: "Numbers and basic questions",
        vocab: [
            { id: 1, french: "un", english: "one", pronunciation: "uhn" },
            { id: 2, french: "deux", english: "two", pronunciation: "duh" },
            { id: 3, french: "trois", english: "three", pronunciation: "twah" },
            { id: 4, french: "comment", english: "how", pronunciation: "koh-mahn" },
            { id: 5, french: "où", english: "where", pronunciation: "oo" },
        ],
        exercises: [
            {
                id: 1,
                type: "mcq",
                question: "What is 'three' in French?",
                options: ["un", "deux", "trois", "quatre"],
                correctAnswer: "trois",
                xpReward: 10,
            },
        ],
    },
    {
        slug: "family",
        title: "Family Members",
        description: "Learn to talk about your family",
        vocab: [
            { id: 1, french: "famille", english: "family", pronunciation: "fah-MEEL" },
            { id: 2, french: "mère", english: "mother", pronunciation: "mehr" },
            { id: 3, french: "père", english: "father", pronunciation: "pehr" },
            { id: 4, french: "frère", english: "brother", pronunciation: "frehr" },
            { id: 5, french: "sœur", english: "sister", pronunciation: "suhr" },
        ],
        exercises: [
            {
                id: 1,
                type: "mcq",
                question: "What is 'mother' in French?",
                options: ["père", "mère", "frère", "sœur"],
                correctAnswer: "mère",
                xpReward: 10,
            },
        ],
    },
]

async function initDatabase() {
    try {
        console.log("🚀 Initializing database...")

        // Clear existing data
        await prisma.progress.deleteMany()
        await prisma.lesson.deleteMany()
        console.log("✅ Cleared existing data")

        // Create lessons
        for (let i = 0; i < sampleLessons.length; i++) {
            const lesson = sampleLessons[i]

            await prisma.lesson.create({
                data: {
                    id: i + 1,
                    slug: lesson.slug,
                    title: lesson.title,
                    description: lesson.description,
                    vocab: lesson.vocab,
                    exercises: lesson.exercises,
                },
            })

            console.log(`✅ Created lesson: ${lesson.title}`)
        }

        console.log("🎉 Database initialization complete!")
        console.log(`📚 Created ${sampleLessons.length} lessons`)
    } catch (error) {
        console.error("❌ Database initialization failed:", error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

// Run the initialization
initDatabase().catch((error) => {
    console.error(error)
    process.exit(1)
})
