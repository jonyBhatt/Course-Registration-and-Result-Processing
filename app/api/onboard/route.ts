import prisma from "@/lib/db/connectDB";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstname, lastname, imageurl, department, position, email } = body;

  try {
    const teacher = await prisma.teacher.create({
      data: {
        email,
        firstname,
        lastname,
        position,
        department,
        imageurl,
      },
    });
    console.log(teacher);
    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in teacher onboard ${error.message}`);
    }
  }
}
