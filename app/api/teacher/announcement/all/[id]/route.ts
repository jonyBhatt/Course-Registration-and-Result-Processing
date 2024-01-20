import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";
import { currentUser } from "@clerk/nextjs";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = await currentUser();
  if (!user) return null;
  try {
    const announcements = await prisma.announcement.findMany({
      where: {
        teacherEmail: user.emailAddresses[0].emailAddress,
      },
    });
    return NextResponse.json(announcements, { status: 200 });
  } catch (error) {
    //return error
    console.log("Error in getAnnouncements", error);
    return new Response("Server Error", { status: 500 });
  }
}
