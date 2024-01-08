import prisma from "@/lib/db/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  console.log(url);

  const assignments = await prisma.assignment.findMany();
  return NextResponse.json({ assignments }, { status: 200 });
}
