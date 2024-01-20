import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const submission = await prisma.submission.findMany({
      where: {
        assignmentId: id,
      },
      include: {
        student: true,
        assignment: true,
      },
    });
    return Response.json(submission, { status: 200 });
  } catch (error) {
    console.log(error);

    return Response.json("Internal error", { status: 500 });
  }
}
