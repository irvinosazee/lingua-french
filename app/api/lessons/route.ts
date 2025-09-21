import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const lessons = await prisma.lesson.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(lessons);
}
