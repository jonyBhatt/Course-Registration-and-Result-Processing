import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db/connectDB";

export async function GET(request: NextRequest) {
  const user = await currentUser();
  if (!user) return new Response("Not authenticated", { status: 401 });
  try {
    const course = await prisma.course.findMany({
      where: {
        enrollment: {
          some: {
            status: "APPROVED",
          },
        },
      },
    });
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log("Error in my course", error);
    return new Response("Server Error", { status: 500 });
  }
}
