import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function GET(req: NextRequest) {
  try {
    const reports = await prisma.report.findMany();
    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
