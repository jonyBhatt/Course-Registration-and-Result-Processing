import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db/connectDB";

export async function GET(req: NextRequest) {
  const existUser = await currentUser();
  console.log(existUser);

  //
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: existUser?.emailAddresses[0].emailAddress,
      },
    });

    // const teacher = await prisma.teacher.findUnique({
    //   where: {
    //     email: user?.email,
    //   },
    // });

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.log(error);

    return Response.json("Internal error", { status: 500 });
  }
}
