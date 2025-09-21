import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const progress = await prisma.progress.findMany({ orderBy: { completedAt: 'desc' } });
  return NextResponse.json(progress);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { lessonId, xp } = body;
  if (!lessonId) return NextResponse.json({ error: "lessonId required" }, { status: 400 });

  const p = await prisma.progress.create({
    data: {
      lessonId,
      completed: true,
      xpEarned: xp ?? 0,
      completedAt: new Date()
    }
  });
  return NextResponse.json(p);
}
