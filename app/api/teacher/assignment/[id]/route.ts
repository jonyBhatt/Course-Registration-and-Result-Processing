import prisma from "@/lib/db/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const assignments = await prisma.assignment.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json({ success: true, assignments }, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  let body = await req.json();

  const { courseName, description, title, date } = body;

  try {
    await prisma.assignment.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        courseName,
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
  await prisma.assignment.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
