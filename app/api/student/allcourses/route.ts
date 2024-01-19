import prisma from "@/lib/db/connectDB";
import { currentUser } from "@clerk/nextjs";

export async function GET() {
  const courses = await prisma.course.findMany();

  if (!courses) {
    return Response.json("No courses yet");
  }

  return Response.json({ success: true, courses }, { status: 200 });
}
