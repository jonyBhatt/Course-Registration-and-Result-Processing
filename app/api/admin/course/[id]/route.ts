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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        courseId: id,
      },
    });

    // Delete related enrollments
    await Promise.all(
      enrollments.map(async (enrollment) => {
        await prisma.enrollment.delete({
          where: {
            id: enrollment.id,
          },
        });
      })
    );
    await prisma.course.delete({
      where: {
        id,
      },
      include: {
        assignments: true,
        announcements: true,
      },
    });
    return NextResponse.json("Delete successful", { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 200 });
  }
}
