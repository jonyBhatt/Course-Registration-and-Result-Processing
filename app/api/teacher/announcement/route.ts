import { NextResponse } from "next/server";
import prisma from "@/lib/db/connectDB";

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany();
    return NextResponse.json(announcements, { status: 200 });
  } catch (error) {
    //return error
    console.log("Error in getAnnouncements", error);
    return new Response("Server Error", { status: 500 });
  }
}
