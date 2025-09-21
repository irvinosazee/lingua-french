import { PrismaClient } from "@prisma/client";
import lessons from "../data/lessons.json" with { type: "json" };
const prisma = new PrismaClient();

async function main() {
    for (const l of lessons) {
        await prisma.lesson.upsert({
            where: { slug: l.slug },
            update: {},
            create: {
                slug: l.slug,
                title: l.title,
                description: l.description,
                vocab: l.vocab,
                exercises: l.exercises
            }
        });
    }
    console.log('Seed complete');
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());