import prisma from "@/lib/db/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  const assignments = await prisma.assignment.findMany();
  return NextResponse.json({ assignments }, { status: 200 });
}
