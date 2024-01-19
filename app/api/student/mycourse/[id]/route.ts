import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const course = await prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        teacher: true,
        assignments: true,
        announcements: true,
      },
    });
    return NextResponse.json(course, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 200 });
  }
}
