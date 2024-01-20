import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";
import { string } from "zod";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  try {
    await prisma.faculty.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });
    return new NextResponse("Created", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error while creating faculty", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const members = await prisma.faculty.findUnique({
      where: {
        id,
      },
    });
    return new NextResponse(JSON.stringify(members), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error while creating faculty", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await prisma.faculty.delete({
      where: {
        id,
      },
    });
    return new NextResponse("Delete", { status: 200 });
  } catch (error) {
    return new Response("Error while creating faculty", { status: 500 });
  }
}
