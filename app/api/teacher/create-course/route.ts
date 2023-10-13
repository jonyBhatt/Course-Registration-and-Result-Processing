import prisma from "@/lib/db/connectDB";
import { currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const user = await currentUser();
  const body = await request.json();
  const { name, coursecode, description, syllabus, attachment } = body;

  try {
    const newCourse = await prisma.teacher.update({
      where: {
        email:user?.emailAddresses[0].emailAddress
      },
      data: {
        courses: {
          create: {
            name,
            coursecode,
            description,
            syllabus,
            attachment,
          },
        },
      },
    });

    return Response.json({ success: true, newCourse}, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, message: `${error}` },
      { status: 500 }
    );
  }
}

