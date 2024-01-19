import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function GET(req: NextRequest) {
  try {
    const enroll = await prisma.enrollment.findMany({
      include: {
        course: true,
        stundets: true,
      },
    });
    return new NextResponse(JSON.stringify(enroll), { status: 200 });
  } catch (error) {
    console.log("Error in get /api/admin/enrollments", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
