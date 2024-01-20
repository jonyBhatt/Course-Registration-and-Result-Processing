import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await prisma.enrollment.update({
      where: {
        id,
      },
      data: {
        status: "APPROVED",
      },
    });
    //make a return api response that course update
    return new NextResponse("Course Update", { status: 200 });
  } catch (error) {
    console.log(`Error in API ${error}`);
    return new Response("Internal Error", { status: 500 });
  }
}
