import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      where: {
        onboarded: true,
      },
    });
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.log("Error in getUsersHandler", error);
    return new Response("Server Error", { status: 500 });
  }
}
