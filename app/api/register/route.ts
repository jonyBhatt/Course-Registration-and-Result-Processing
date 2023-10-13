import prisma from "@/lib/db/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, image_url } = body;
  const hashedPassword = bcrypt.hashSync(password, 12);

  try {
    //check existing user
    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      return NextResponse.json(
        { success: false, message: "User already exist" },
        { status: 409 }
      );
    }

    //create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
