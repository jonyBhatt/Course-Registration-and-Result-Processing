import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db/connectDB";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const assignments = await prisma.assignment.findMany({
    where: {
      courseId: id,
    },
  });

  return NextResponse.json({ success: true, assignments }, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const teacher = await currentUser();
  let body = await req.json();

  const { courseName, description, title, date } = body;

  //teacher is not then return unauthorized
  if (!teacher || !teacher.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const createAssignment = await prisma.assignment.create({
      data: {
        title,
        description,
        dueDate: date,
        teacher: {
          connect: {
            email: teacher.emailAddresses[0].emailAddress,
          },
        },
        course: {
          connect: {
            id,
          },
        },
      },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.assignment.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
