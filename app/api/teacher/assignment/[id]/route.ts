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

export async function PUT(
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
    const createAssignment = await prisma.assignment.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        dueDate: date,
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
  try {
    // Fetch the Assignment document
    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: { submissions: true },
    });

    if (!assignment) {
      throw new Error("Assignment not found");
    }

    // Retrieve the IDs of associated Submission documents
    const submissionIds = assignment.submissions.map(
      (submission) => submission.id
    );

    // Delete associated Submission documents
    await prisma.submission.deleteMany({
      where: {
        id: { in: submissionIds },
      },
    });

    // Delete the Assignment document
    await prisma.assignment.delete({
      where: { id },
    });
    return NextResponse.json({ success: true }, { status: 200 });

    console.log("Assignment and associated submissions deleted successfully");
  } catch (error) {
    console.error("Error deleting assignment:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
