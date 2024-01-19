import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db/connectDB";

export async function GET(req: NextRequest) {
  const user = await currentUser();
  if (!user) return null;
  try {
    const profile = await prisma.user.findUnique({
      where: {
        email: user?.emailAddresses[0].emailAddress,
      },
    });
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json("Internal server error", { status: 500 });
  }
}
