import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { id } = params;

  try {
    await prisma.student.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });
    return NextResponse.json("Update Successful", { status: 200 });
  } catch (error) {
    return NextResponse.json("Something wrong", { status: 500 });
  }
}
