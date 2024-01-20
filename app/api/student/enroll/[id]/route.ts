import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db/connectDB";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id);

  const user = await currentUser();
  if (!user) return null;
  try {
    await prisma.enrollment.create({
      data: {
        courseId: id,
        studnetEmail: user.emailAddresses[0].emailAddress,
        status: "PENDING",
      },
    });
    return NextResponse.json("Enrollment send successfully", { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
