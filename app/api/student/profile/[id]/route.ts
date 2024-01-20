import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { name, email, image_url } = body;
  const { id } = params;

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        image_url,
      },
    });
    return NextResponse.json("Update Successful", { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json("Something wrong", { status: 500 });
  }
}
