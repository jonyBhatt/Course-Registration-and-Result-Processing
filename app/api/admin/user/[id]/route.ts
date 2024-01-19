import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return new NextResponse("User banned", { status: 200 });
  } catch (error) {
    console.log(`Error in delete user : ${error}`);
    return new NextResponse("Server error", { status: 500 });
  }
}
