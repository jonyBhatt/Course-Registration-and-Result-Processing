import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const report = await prisma.report.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
