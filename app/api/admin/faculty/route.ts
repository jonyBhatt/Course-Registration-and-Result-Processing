import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await prisma.faculty.create({
      data: {
        ...body,
      },
    });
    return new NextResponse("Created", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Error while creating faculty", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const members = await prisma.faculty.findMany();
    return new NextResponse(JSON.stringify(members), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error while creating faculty", { status: 500 });
  }
}
