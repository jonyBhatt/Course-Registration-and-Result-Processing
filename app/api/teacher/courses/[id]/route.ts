import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params.id);

  try {
    const course = await prisma.course.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!course) return new Response("Course not found", { status: 404 });

    return new NextResponse(JSON.stringify(course), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const course = await prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) return new NextResponse("Course not found", { status: 404 });

    await prisma.course.delete({
      where: {
        id,
      },
    });
    return new NextResponse("Course delete successfully", { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  const { name, coursecode, description, syllabus, attachment } = body;

  try {
    const updateCourse = await prisma.course.update({
      where: {
        id,
      },
      data: {
        name,
        coursecode,
        description,
        syllabus,
        attachment,
      },
    });
    return new NextResponse("Course update successfully", { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
