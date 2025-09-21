import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
    const lesson = await prisma.lesson.findUnique({ where: { slug: params.slug } });
    if (!lesson) return new NextResponse('Not found', { status: 404 });
    return NextResponse.json(lesson);
}
