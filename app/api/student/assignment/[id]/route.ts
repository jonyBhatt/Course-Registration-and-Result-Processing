import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";
import { currentUser } from "@clerk/nextjs";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: {
        teacher: true,
      },
    });
    return NextResponse.json(assignment, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json("Something wrong", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await currentUser();
  if (!user) return null;
  const body = await req.json();
  const { submission } = body;
  try {
    const assignment = await prisma.submission.create({
      data: {
        submission,
        assignmentId: id,
        studentEmail: user?.emailAddresses[0].emailAddress,
      },
    });

    return NextResponse.json("Assigned your assignment", { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json("Something wrong", { status: 500 });
  }
}
