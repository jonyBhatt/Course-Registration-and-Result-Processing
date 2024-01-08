import prisma from "@/lib/db/connectDB";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await currentUser();
  const body = await request.json();
  const { name, coursecode, description, syllabus, attachment } = body;

  try {
    const newCourse = await prisma.course.create({
      data: {
        name,
        coursecode,
        description,
        syllabus,
        attachment,
        teacher: {
          connect: {
            email: user?.emailAddresses[0].emailAddress,
          },
        },
      },
    });

    return new NextResponse("Course created", { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, message: `${error}` },
      { status: 500 }
    );
  }
}
