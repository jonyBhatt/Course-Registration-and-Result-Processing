import prisma from "@/lib/db/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  //   console.log(id);
  const details = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json({ success: true, details }, { status: 200 });
}
